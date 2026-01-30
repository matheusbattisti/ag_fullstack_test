require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');
const { generateItinerary } = require('./gemini');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Endpoints

// Generate Itinerary
app.post('/api/generate-itinerary', async (req, res) => {
    const { destination, days, budget } = req.body;

    if (!destination || !days || !budget) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const itinerary = await generateItinerary(destination, days, budget);
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar roteiro com IA' });
    }
});

// Get all saved trips
app.get('/api/trips', (req, res) => {
    const sql = 'SELECT * FROM trips ORDER BY created_at DESC';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar viagens' });
        }

        // Parse itinerary JSON
        try {
            const parsedTrips = rows.map(trip => ({
                ...trip,
                itinerary: JSON.parse(trip.itinerary)
            }));
            res.json(parsedTrips);
        } catch (parseError) {
            console.error("Erro ao processar JSON:", parseError);
            res.status(500).json({ error: 'Erro ao processar dados das viagens' });
        }
    });
});

// Save a trip
app.post('/api/trips', (req, res) => {
    const { destination, region, days, budget, total_cost, activities_count, itinerary, image_url } = req.body;

    const sql = `
    INSERT INTO trips (destination, region, days, budget, total_cost, activities_count, itinerary, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
        destination,
        region,
        days,
        budget,
        total_cost,
        activities_count,
        JSON.stringify(itinerary),
        image_url
    ];

    db.run(sql, params, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao salvar viagem' });
        }

        res.status(201).json({ id: this.lastID, ...req.body });
    });
});

// Get trip by ID
app.get('/api/trips/:id', (req, res) => {
    const sql = 'SELECT * FROM trips WHERE id = ?';

    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar detalhes da viagem' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Viagem não encontrada' });
        }

        try {
            res.json({ ...row, itinerary: JSON.parse(row.itinerary) });
        } catch (e) {
            res.status(500).json({ error: 'Erro ao processar roteiro salvo' });
        }
    });
});

// Delete a trip
app.delete('/api/trips/:id', (req, res) => {
    const sql = 'DELETE FROM trips WHERE id = ?';

    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar viagem' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Viagem não encontrada' });
        }

        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
