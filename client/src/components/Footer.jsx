import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-text-secondary text-sm">
                    © 2024 TripAI - Transformando viagens com inteligência.
                </p>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Termos</a>
                    <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Privacidade</a>
                    <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Ajuda</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
