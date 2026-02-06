import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FAQs from './pages/FAQs';
import PreRegister from './pages/PreRegister';
import Register from './pages/Register';
import SupportUs from './pages/SupportUs';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop';

// App.tsx acts as the root component and typically handles Routing.
// Think of this as the central router definition in a backend framework (like defining routes in Flask or Gin).

const JoinGroupChat = () => {
  useEffect(() => {
    const url = import.meta.env.VITE_WA_GC;
    if (url) {
      window.location.replace(url);
    } else {
      window.location.replace('/');
    }
  }, []);
  return null;
};

function App() {
  return (
    // <Router> enables client-side routing, allowing URL changes without full page reloads.
    <Router>
      <ScrollToTop />
      {/* 
        This div is the main layout container.
        Classes like 'min-h-screen' (Tailwind CSS) ensure it takes up at least the full viewport height.
      */}
      <div className="min-h-screen bg-white font-sans text-slate-800">
        {/* Header stays persistent across all pages because it's outside <Routes> */}
        <Header />
        
        <main>
          {/* <Routes> works like a switch statement for URLs. It renders the first <Route> that matches the current path. */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/pre-register" element={<PreRegister />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support-us" element={<SupportUs />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/join-group-chat" element={<JoinGroupChat />} />
          </Routes>
        </main>
        
        {/* Footer also stays persistent */}
        <Footer />
      </div>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
