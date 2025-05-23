import About from '@/Layouts/LandingPage/About';
import Categories from '@/Layouts/LandingPage/Categories';
import Footer from '@/Layouts/LandingPage/Footer';
import Hero from '@/Layouts/LandingPage/Hero';
import Navbar from '@/Layouts/LandingPage/Navbar';
import Testimoni from '@/Layouts/LandingPage/Testimoni';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <Categories />
            <Testimoni />
            <Footer />
        </div>
    );
}
