import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import MyTrips from './pages/MyTrips';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-background font-sans">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/itinerary" element={<Itinerary />} />
                        <Route path="/my-trips" element={<MyTrips />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
