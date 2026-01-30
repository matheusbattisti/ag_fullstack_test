import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Calendar, Wallet, MapPin, Save, Map as MapIcon } from 'lucide-react';
import DayAccordion from '../components/DayAccordion';

const Itinerary = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [openDay, setOpenDay] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(state?.isSaved || false);

    if (!state || !state.itinerary) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                <h2 className="text-2xl font-bold text-primary mb-4">Nenhum roteiro encontrado</h2>
                <Link to="/" className="text-secondary font-medium hover:underline">Voltar para Início</Link>
            </div>
        );
    }

    const { itinerary } = state;

    const handleSave = async () => {
        if (isSaved) return;

        setIsSaving(true);
        try {
            const imageUrl = `https://source.unsplash.com/800x600/?${itinerary.destination},travel`;

            const response = await fetch('/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    destination: itinerary.destination,
                    region: itinerary.region,
                    days: itinerary.days.length,
                    budget: itinerary.total_cost,
                    total_cost: itinerary.total_cost,
                    activities_count: itinerary.activities_count,
                    itinerary: itinerary,
                    image_url: imageUrl
                })
            });

            if (response.ok) {
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Erro ao salvar", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="pb-32 bg-gray-50 min-h-screen">
            {/* Banner */}
            <div className="relative h-[400px] w-full bg-gradient-to-br from-primary to-secondary">
                <img
                    src={`https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop`}
                    alt={itinerary.destination}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12">
                    <Link to="/" className="absolute top-8 left-4 md:left-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/20 transition-colors">
                        <ArrowLeft size={18} /> Voltar
                    </Link>

                    <div className="space-y-2 animate-fade-in-up">
                        <p className="text-white/80 font-medium text-sm flex items-center gap-2">
                            {itinerary.region || 'Destino Internacional'} &gt; {itinerary.destination.split(',')[1] || ''}
                        </p>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">{itinerary.destination}</h1>
                        <p className="text-xl text-gray-200 font-light max-w-2xl">{itinerary.summary}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 animate-fade-in-up delay-100">
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-primary rounded-xl"><Calendar /></div>
                        <div>
                            <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">Duração</p>
                            <p className="text-xl font-bold text-text">{itinerary.days.length} Dias</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-secondary">
                        <div className="p-3 bg-teal-50 text-secondary rounded-xl"><Wallet /></div>
                        <div>
                            <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">Orçamento Total</p>
                            <p className="text-xl font-bold text-text">R$ {itinerary.total_cost}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><MapPin /></div>
                        <div>
                            <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">Atividades</p>
                            <p className="text-xl font-bold text-text">{itinerary.activities_count} Locais</p>
                        </div>
                    </div>
                </div>

                {/* Content Split */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Itinerary */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-primary">Seu Itinerário Personalizado</h2>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-white rounded-full"><Share2 size={20} /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {itinerary.days.map((day) => (
                                <DayAccordion
                                    key={day.day}
                                    dayData={day}
                                    isOpen={openDay === day.day}
                                    onToggle={() => setOpenDay(openDay === day.day ? null : day.day)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar removed - Google Maps requires API key */}
                    <div className="lg:w-1/3 lg:sticky lg:top-24 h-fit space-y-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-primary">
                                <MapPin size={20} className="text-secondary" /> Dicas de Viagem
                            </h3>
                            <ul className="space-y-3 text-sm text-text-secondary">
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    Pesquise sobre a cultura local antes de viajar
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    Leve documentos e cópias importantes
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    Reserve hospedagem com antecedência
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    Verifique as condições climáticas
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

            {/* Fixed Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40">
                <div className="container mx-auto px-4 flex items-center justify-between max-w-5xl">
                    <div className="flex flex-col">
                        <span className="text-xs text-text-secondary uppercase font-bold">Total da Viagem</span>
                        <span className="text-xl font-bold text-primary">R$ {Number(itinerary.total_cost).toLocaleString('pt-BR')},00</span>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaved || isSaving}
                        className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center gap-2 ${isSaved
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-primary hover:bg-[#152e4d] hover:shadow-xl active:scale-95'
                            }`}
                    >
                        {isSaved ? '✓ Viagem Salva' : (
                            <>
                                <Save size={18} />
                                Salvar Viagem
                            </>
                        )}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Itinerary;
