import React from 'react';

const faqs = [
  {
    question: 'Who can participate in the competition?',
    answer:
      'The competition is open to Senior Secondary School Students (SS1 - 3) in Lagos, Ogun, Rivers, Cross River and Abuja.',
  },
  {
    question: 'How do I register?',
    answer: (
      <span>
        To register, visit:{' '}
        <a
          href="https://portal.verboheit.org/register"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-blue underline hover:opacity-80 transition-opacity"
        >
          https://portal.verboheit.org/register
        </a>
        . A copy of NIN or your last school result will be required to be uploaded to complete your
        registration.
      </span>
    ),
  },
  {
    question: 'What happens after registration?',
    answer:
      'You will be notified that your registration is successful. After registration fully closes, you will be invited to a virtual information session on the competition.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No',
  },
  {
    question: 'What is the format of the competition?',
    answer: (
      <div className="space-y-4">
        <p>The competition is in three stages:</p>
        <ul className="list-none space-y-4">
          <li>
            <span className="font-bold text-gray-900">I. Screening stage:</span> Online multiple
            choice Maths questions to screen applicants. Students that meet the cut off will proceed
            to league stage.
          </li>
          <li>
            <span className="font-bold text-gray-900">II. League Stage:</span> Weekly math quizzes
            online. There will be a weekly league table showing cumulative score and performance of
            the students. Top 10 students on the league table at the end of the 6 weeks will proceed
            to final exam.
          </li>
          <li>
            <span className="font-bold text-gray-900">III. Final Exam:</span> Top 10 will take final
            exam electronic or paper based in person.
          </li>
        </ul>
        <p>
          All maths questions will be based on senior secondary school mathematics curriculum.
          Questions will be selected from WAEC, JAMB and SAT past questions.
        </p>
      </div>
    ),
  },
  {
    question: 'Will there be prizes or certificates?',
    answer: (
      <div className="space-y-4">
        <p className="font-bold text-gray-900 underline">On prizes:</p>
        <p>Yes, there will be 4 major prizes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Top 3 in the final will receive ₦250k, ₦150k and ₦100k each for first, second and third.
          </li>
          <li>
            <span className="font-bold text-gray-900">Dipo Olomofe Prize:</span> The best performing
            public school student (outside of the top 3) will receive a money prize of 100k as well.
          </li>
        </ul>
        <p>
          Certificates and token prizes will be given to all students who made it to the end of the
          league stage.
        </p>
      </div>
    ),
  },
  {
    question: 'Who can I contact if I have more questions?',
    answer: 'For additional questions, you can send us a message on Facebook and Instagram.',
  },
];

const FAQs: React.FC = () => {
  return (
    <div className="py-20 bg-white min-h-[60vh] animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-brand-accent rounded-full text-brand-blue text-sm font-bold tracking-wide uppercase mb-4">
            <span style={{ fontFamily: 'Helvetica, sans-serif' }}>Curious?</span>
          </div>
          <h1
            className="font-black text-4xl md:text-5xl text-gray-900 mb-6"
            style={{ fontFamily: 'Segoe UI, sans-serif' }}
          >
            Frequently Asked <span className="text-brand-blue">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about the Verboheit Mathematics League Competition.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
