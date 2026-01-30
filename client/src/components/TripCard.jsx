import React from 'react';
import { Trash2, Calendar, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TripCard = ({ trip, onDelete }) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        // Prevent navigation if delete button is clicked
        if (e.target.closest('button')) return;
        navigate(`/itinerary`, { state: { itinerary: trip.itinerary, isSaved: true, savedId: trip.id } });
    };

    const formattedDate = new Date(trip.created_at).toLocaleDateString('pt-BR', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
        <div
            onClick={handleCardClick}
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
        >
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <img
                    src={trip.image_url || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop`}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                {/* Delete Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(trip.id);
                    }}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                >
                    <Trash2 size={16} />
                </button>

                {/* Region Badge */}
                {trip.region && (
                    <span className="absolute bottom-3 left-3 bg-secondary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
                        {trip.region}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-text mb-1">{trip.destination}</h3>
                <p className="text-xs text-text-secondary font-medium mb-4 flex items-center gap-1">
                    <Calendar size={12} /> Salvo em {formattedDate}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Duração</span>
                        <span className="text-sm font-semibold text-text">{trip.days} dias</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Orçamento</span>
                        <span className="text-sm font-bold text-secondary">R$ {trip.budget.toLocaleString('pt-BR')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
