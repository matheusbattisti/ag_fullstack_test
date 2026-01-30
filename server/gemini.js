require('dotenv').config();
const OpenAI = require('openai');

if (!process.env.OPENAI_API_KEY) {
  console.error("ERRO: OPENAI_API_KEY não encontrada no arquivo .env");
} else {
  console.log("OPENAI_API_KEY carregada corretamente (prefixo: " + process.env.OPENAI_API_KEY.substring(0, 7) + "...)");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateItinerary = async (destination, days, budget) => {
  const prompt = `Você é um planejador de viagens expert. Crie um roteiro detalhado para:
- Destino: ${destination}
- Duração: ${days} dias
- Orçamento: R$ ${budget}

Retorne APENAS um JSON válido no formato abaixo, sem blocos de código markdown, sem explicações adicionais:
{
  "destination": "Cidade, País",
  "region": "Europa/Ásia/América do Sul/América do Norte/África/Oceania",
  "summary": "Breve descrição do roteiro",
  "total_cost": 5400,
  "activities_count": 21,
  "days": [
    {
      "day": 1,
      "title": "Chegada e Exploração Inicial",
      "location": "Área principal",
      "daily_cost": 450,
      "activities": {
        "morning": { "title": "Atividade da manhã", "description": "Descrição detalhada...", "cost": 0 },
        "afternoon": { "title": "Atividade da tarde", "description": "Descrição detalhada...", "cost": 180 },
        "evening": { "title": "Atividade da noite", "description": "Descrição detalhada...", "cost": 270 }
      }
    }
  ]
}`;

  try {
    console.log("Gerando roteiro com OpenAI GPT-4o-mini...");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um assistente de planejamento de viagens. Responda APENAS com JSON válido, sem markdown."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const text = completion.choices[0].message.content;
    console.log("Resposta recebida da OpenAI!");

    // Limpeza de markdown caso a IA adicione
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("ERRO NA API OPENAI:");
    console.error("- Mensagem:", error.message);
    if (error.status) console.error("- Status:", error.status);
    throw error;
  }
};

module.exports = { generateItinerary };
