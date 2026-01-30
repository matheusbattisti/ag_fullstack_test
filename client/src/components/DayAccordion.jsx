import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sun, Moon, CloudSun } from 'lucide-react';

const DayAccordion = ({ dayData, isOpen, onToggle }) => {
    return (
        <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                        {dayData.day}
                    </div>
                    <div>
                        <h3 className="font-bold text-text text-lg">Dia {dayData.day}: {dayData.title}</h3>
                        {dayData.location && (
                            <p className="text-xs font-bold text-text-secondary tracking-wider uppercase mt-1">
                                {dayData.location}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-text-secondary">Gasto do dia</p>
                        <p className="text-accent font-bold">R$ {dayData.daily_cost}</p>
                    </div>
                    {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>
            </button>

            {isOpen && (
                <div className="px-6 pb-6 pt-2 bg-gray-50/50 space-y-4 border-t border-gray-100">

                    {/* Morning */}
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors">
                        <div className="mt-1"><Sun className="w-6 h-6 text-orange-400" /></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-primary">Manhã: {dayData.activities.morning.title}</h4>
                                <span className="text-xs px-2 py-1 bg-gray-200 rounded text-text-secondary font-medium">R$ {dayData.activities.morning.cost}</span>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed">{dayData.activities.morning.description}</p>
                        </div>
                    </div>

                    {/* Afternoon */}
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors">
                        <div className="mt-1"><CloudSun className="w-6 h-6 text-yellow-500" /></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-primary">Tarde: {dayData.activities.afternoon.title}</h4>
                                <span className="text-xs px-2 py-1 bg-gray-200 rounded text-text-secondary font-medium">R$ {dayData.activities.afternoon.cost}</span>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed">{dayData.activities.afternoon.description}</p>
                        </div>
                    </div>

                    {/* Evening */}
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors">
                        <div className="mt-1"><Moon className="w-6 h-6 text-indigo-400" /></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-primary">Noite: {dayData.activities.evening.title}</h4>
                                <span className="text-xs px-2 py-1 bg-gray-200 rounded text-text-secondary font-medium">R$ {dayData.activities.evening.cost}</span>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed">{dayData.activities.evening.description}</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default DayAccordion;
