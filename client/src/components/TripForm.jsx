import React, { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TripForm = () => {
    const [destination, setDestination] = useState('');
    const [days, setDays] = useState('4-7');
    const [budget, setBudget] = useState(5000);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!destination) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/generate-itinerary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination, days, budget })
            });

            if (!response.ok) throw new Error('Falha ao gerar roteiro');

            const data = await response.json();

            // Navigate to Itinerary page with state
            navigate('/itinerary', { state: { itinerary: data, inputs: { destination, days, budget } } });

        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao gerar seu roteiro. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const dayOptions = ['1-3 dias', '4-7 dias', '8-11 dias', '12-14 dias'];

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
            <div className="space-y-8">

                {/* Destination */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary">Para onde você quer ir?</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Ex: Paris, França ou Rio de Janeiro"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all placeholder:text-gray-400 text-text font-medium"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                </div>

                {/* Days Segmented Control */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary">Quantos dias de viagem?</label>
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                        {dayOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setDays(opt)}
                                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${days === opt
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-text-secondary hover:text-primary'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-text-secondary">Qual o seu orçamento?</label>
                        <span className="text-lg font-bold text-secondary">R$ {budget.toLocaleString('pt-BR')}</span>
                    </div>
                    <input
                        type="range"
                        min="500"
                        max="20000"
                        step="500"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-text-secondary font-medium">
                        <span>R$ 500</span>
                        <span>R$ 20.000+</span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !destination}
                    className="w-full py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#152e4d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="animate-pulse">Gerando seu roteiro personalizado...</span>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 fill-current" />
                            Gerar Meu Roteiro
                        </>
                    )}
                </button>

            </div>
        </div>
    );
};

export default TripForm;
