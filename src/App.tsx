import { useState } from 'react';
import { AppProvider } from '@/context';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { OfferBanner } from '@/components/OfferBanner';
import { GoogleFollow } from '@/components/GoogleFollow';
import { About } from '@/components/About';
import { Process } from '@/components/Process';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { OrderMethodModal } from '@/components/OrderMethodModal';
import { OrderPage } from '@/components/OrderPage';
import { TrackPage } from '@/components/TrackPage';

type Route = 'home' | 'order' | 'track';

function AppContent() {
  const [route, setRoute] = useState<Route>('home');
  const [methodOpen, setMethodOpen] = useState(false);
  const [trackCode, setTrackCode] = useState<string | undefined>();

  const openOrder = () => setMethodOpen(true);
  const goOrder = () => { setMethodOpen(false); setRoute('order'); };
  const goTrack = (code?: string) => { setTrackCode(code); setRoute('track'); };
  const goHome = () => setRoute('home');

  const handleNewOrder = () => {
    setRoute('order');
    setMethodOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar onOrder={openOrder} onTrack={() => goTrack()} onHome={goHome} route={route} />

      <main>
        {route === 'home' && (
          <>
            <Hero onOrder={openOrder} />
            <Services onOrder={openOrder} />
            <OfferBanner onOrder={openOrder} />
            <GoogleFollow />
            <About />
            <Process />
            <FAQ />
            <CTA onOrder={openOrder} />
          </>
        )}
        {route === 'order' && (
          <OrderPage onTrack={goTrack} onNewOrder={handleNewOrder} />
        )}
        {route === 'track' && (
          <TrackPage
            initialCode={trackCode}
            onHome={goHome}
            onNewOrder={() => setRoute('order')}
          />
        )}
      </main>

      <Footer onHome={goHome} />

      <OrderMethodModal
        open={methodOpen}
        onClose={() => setMethodOpen(false)}
        onSiteOrder={goOrder}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
