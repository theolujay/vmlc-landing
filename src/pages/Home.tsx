import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Stages from '../components/Stages';
import Partners from '../components/Partners';
import TeacherAward from '../components/TeacherAward';

// The Home page is a perfect example of "Composition".
// Instead of writing all the HTML in one huge file, we build the page by stacking smaller, reusable components.
// It's like building with Lego blocks.

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
