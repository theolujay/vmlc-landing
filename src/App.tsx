import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Stages from './components/Stages';
import Partners from './components/Partners';
import TeacherAward from './components/TeacherAward';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />
      <main>
        <Hero />
        <About />
        <Stages />
        <Partners />
        <TeacherAward />
      </main>
      <Footer />
    </div>
  );
}

export default App;