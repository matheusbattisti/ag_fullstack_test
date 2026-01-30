import React from 'react';
import TripForm from '../components/TripForm';
import { Gem, Clock, Camera } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen pt-16 pb-20">

            {/* Hero Section */}
            <section className="container mx-auto px-4 flex flex-col items-center mb-24">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight">
                        Planeje sua próxima aventura com <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Inteligência Artificial</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary">
                        Roteiros personalizados em segundos, baseados nos seus desejos e orçamento.
                    </p>
                </div>

                {/* Form Card */}
                <div className="w-full flex justify-center transform hover:scale-[1.01] transition-transform duration-500">
                    <TripForm />
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">

                    <FeatureCard
                        icon={<Gem className="w-6 h-6 text-white" />}
                        title="IA Inteligente"
                        description="Curadoria baseada em dados reais e avaliações."
                    />

                    <FeatureCard
                        icon={<Clock className="w-6 h-6 text-white" />}
                        title="Rápido"
                        description="Receba seu itinerário completo em menos de 10 segundos."
                    />

                    <FeatureCard
                        icon={<Camera className="w-6 h-6 text-white" />}
                        title="Econômico"
                        description="Otimizamos sua rota para o seu bolso."
                    />

                </div>
            </section>

        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mb-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                {icon}
            </div>
        </div>
        <h3 className="font-bold text-primary text-xl">{title}</h3>
        <p className="text-text-secondary">{description}</p>
    </div>
);

export default Home;
