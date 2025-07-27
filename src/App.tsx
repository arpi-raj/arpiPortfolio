import Home from "./pages/Home";
import "./index.css";
import Certificates from "./pages/Certificates";
import Projects from "./pages/Projects";
import ContactPage from "./pages/Contact";
import TechStack from "./pages/TechStack";
import Navbar from "./components/Navbar"; // 1. Import the Navbar

function App() {
  return (
    <div className="bg-black text-white">
      {/* 2. Place the Navbar at the top level of the layout */}
      <Navbar />

      {/* 3. Add the corresponding 'id' to each section */}
      <section id="home" className="pg-1 h-screen w-full flex justify-center">
        <Home />
      </section>

      <section id="certificates" className="pg-2 min-h-screen w-full text-white">
        <Certificates />
      </section>

      <section id="projects" className="pg-3 min-h-screen w-full flex justify-center">
        <Projects />
      </section>

      <section id="techstack" className="pg-4 min-h-screen w-full">
        <TechStack />
      </section>

      <section id="contact" className="pg-5 min-h-screen w-full">
        <ContactPage />
      </section>
    </div>
  );
}

export default App;
