import React from 'react';
import Pill from './ui/Pill';

const Stages: React.FC = () => {
  return (
    <section id="stages" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            3 Stages. 1 Final
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Prepare to embark on a journey of intellectual thrill and problem-solving mastery as you
            go through the three stages of this prestigious contest.
          </p>
        </div>

        <div className="space-y-24">
          {/* Stage 1: Initial screening test (Pills Left, Text Right) */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 flex flex-col gap-3 tracking-wide">
              <div className="flex justify-end">
                <Pill text="Solve fundamental math problems" />
              </div>
              <div className="flex justify-start pl-[25%]">
                <Pill text="Gauge your overall math proficiency" />
              </div>
              <div className="flex justify-end">
                <Pill text="Move on to the preliminary stage" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
                Initial screening test
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Think you&apos;ve got what it takes to ace the first hurdle? Take the test and lock in
                your spot in the league. Show us your math mojo and get ready for an epic ride!
              </p>
            </div>
          </div>

          {/* Stage 2: The Preliminary Stage (Text Left, Pills Right) */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
                The Preliminary
                <br />
                Stage
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Solve math problems every week for six weeks to gain a spot on the league table to
                qualify for the Knock-Out stage.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-3 tracking-wide">
              <div className="flex justify-start">
                <Pill text="Time for some critical thinking" />
              </div>
              <div className="flex justify-start pl-[25%]">
                <Pill text="Weekly maths challenges" />
              </div>
              <div className="flex justify-start">
                <Pill text="Advance to the knock-out stage" />
              </div>
            </div>
          </div>

          {/* Stage 3: The Knockout stage (Pills Left, Text Right) */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 flex flex-col gap-3 tracking-wide">
              <div className="flex justify-end">
                <Pill text="Intense one-on-one battles" />
              </div>
              <div className="flex justify-start pl-[25%]">
                <Pill text="Battle for supremacy and bragging rights" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
                The Knockout stage
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Knock &apos;Em Out in the Final Showdown – It&apos;s game on! Brace yourself for the ultimate
                face-off. Show off your math skills in the grand showdown and claim the crown. Ready
                to become the ultimate math champ?
              </p>
            </div>
          </div>

          {/* Awards (Text Left, Pills Right) */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Awards & Prizes</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Recognizing exceptional talent and achievement, the pinnacle of the Senior Secondary
                School Mathematics League awaits, where we will honor the top 3 students with
                financial awards and prizes. Will you be standing on the winners podium at the
                thrilling finale that promises to celebrate brilliance and dedication in the world
                of mathematics?
              </p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-3 tracking-wide">
              <div className="flex justify-start">
                <Pill text="First Place – ₦250,000" />
              </div>
              <div className="flex justify-start pl-[25%]">
                <Pill text="Second Place – ₦150,000" />
              </div>
              <div className="flex justify-start">
                <Pill text="Third Place – ₦100,000" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stages;
