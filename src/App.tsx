import { AppProvider } from '@/context';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { OfferBanner } from '@/components/OfferBanner';
import { About } from '@/components/About';
import { Process } from '@/components/Process';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <OfferBanner />
          <About />
          <Process />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
