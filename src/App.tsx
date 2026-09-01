import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TimerPage from './pages/TimerPage';
import GuidePage from './pages/GuidePage';
import RetentionTimesPage from './pages/RetentionTimesPage';
import ScienceSafetyPage from './pages/ScienceSafetyPage';
import AppleWatchPage from './pages/AppleWatchPage';
import FAQPage from './pages/FAQPage';
import MedicalDisclaimerPage from './pages/MedicalDisclaimerPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps = {}) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) {
      return initialPath.replace(/\/$/, '') || '/';
    }
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      return path;
    }
    return '/';
  });

  const [isEmbed, setIsEmbed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(path);
      const urlParams = new URLSearchParams(window.location.search);
      setIsEmbed(urlParams.get('embed') === 'true');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const urlParams = new URLSearchParams(window.location.search);
    setIsEmbed(urlParams.get('embed') === 'true');

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const normalized = path.replace(/\/$/, '') || '/';
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', normalized);
      const urlParams = new URLSearchParams(window.location.search);
      setIsEmbed(urlParams.get('embed') === 'true');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    setCurrentPath(normalized);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/timer':
        return <TimerPage onNavigate={navigate} />;
      case '/guide/wim-hof-method':
      case '/guide':
        return <GuidePage onNavigate={navigate} />;
      case '/retention-times':
        return <RetentionTimesPage onNavigate={navigate} />;
      case '/science-and-safety':
      case '/science':
        return <ScienceSafetyPage onNavigate={navigate} />;
      case '/apple-watch':
        return <AppleWatchPage onNavigate={navigate} />;
      case '/faq':
        return <FAQPage onNavigate={navigate} />;
      case '/medical-disclaimer':
        return <MedicalDisclaimerPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case '/terms':
        return <TermsPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  if (isEmbed && currentPath === '/timer') {
    return <TimerPage onNavigate={navigate} />;
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col selection:bg-[#d8d628] selection:text-black font-sans">
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <main id="main-content" className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
