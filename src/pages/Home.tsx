import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Stages from '../components/Stages';
import Partners from '../components/Partners';
import TeacherAward from '../components/TeacherAward';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <About />
      <Stages />
      <Partners />
      <TeacherAward />
    </div>
  );
};

export default Home;
