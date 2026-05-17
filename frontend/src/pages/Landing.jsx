import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Coverage from '../components/Coverage';
import AboutUs from '../components/AboutUs';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';

const Landing = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Coverage />
      <AboutUs />
      <FAQ />
      <ContactForm />
    </>
  );
};
export default Landing;