import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import TripCard from '../components/TripCard';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await fetch('/api/trips');
            if (response.ok) {
                const data = await response.json();
                setTrips(data);
            }
        } catch (error) {
            console.error("Erro ao buscar viagens:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja apagar esta viagem?')) return;

        try {
            const response = await fetch(`/api/trips/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setTrips(trips.filter(t => t.id !== id));
            }
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    };

    const filteredTrips = trips; // Implement filter logic if 'Recentes' or 'Favoritos' backend logic existed

    return (
        <div className="container mx-auto px-4 py-12 min-h-[80vh]">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Minhas Viagens</h1>
                    <p className="text-text-secondary">Explore e gerencie seus roteiros planejados pela nossa IA</p>
                </div>
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-[#152E4D] transition-colors shadow-lg hover:shadow-xl active:scale-95"
                >
                    <Plus size={20} />
                    Novo Planejamento
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-100 mb-8">
                <button
                    className={`pb-4 text-sm font-bold transition-colors ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-primary'}`}
                    onClick={() => setActiveTab('all')}
                >
                    Todas as Viagens ({trips.length})
                </button>
                <button
                    className={`pb-4 text-sm font-bold transition-colors ${activeTab === 'recent' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-primary'}`}
                    onClick={() => setActiveTab('recent')}
                >
                    Recentes
                </button>
                <button
                    className={`pb-4 text-sm font-bold transition-colors ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-primary'}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favoritos
                </button>
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="text-center py-12">Carregando viagens...</div>
            ) : trips.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <h3 className="text-xl font-bold text-text mb-2">Você ainda não tem viagens salvas</h3>
                    <p className="text-text-secondary mb-6">Crie seu primeiro roteiro agora mesmo!</p>
                    <Link to="/" className="text-primary font-bold hover:underline">Planejar Viagem</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTrips.map(trip => (
                        <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
                    ))}
                </div>
            )}

        </div>
    );
};

export default MyTrips;
