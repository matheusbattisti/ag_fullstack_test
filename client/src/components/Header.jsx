import React from 'react';
import { Compass, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-90 transition-opacity">
                    <Compass className="w-8 h-8 text-primary" strokeWidth={2.5} />
                    <span>TripAI</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary border-b-2 border-primary py-5' : 'text-text-secondary'}`}
                    >
                        Início
                    </Link>
                    <Link
                        to="/my-trips"
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/my-trips') ? 'text-primary border-b-2 border-primary py-5' : 'text-text-secondary'}`}
                    >
                        Minhas Viagens
                    </Link>
                    <Link
                        to="/profile"
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/profile') ? 'text-primary border-b-2 border-primary py-5' : 'text-text-secondary'}`}
                    >
                        Perfil
                    </Link>
                </nav>

                {/* User Profile */}
                <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
