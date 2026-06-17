import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Batches from "./components/Batches";
import Membership from "./components/Membership";
import Transformations from "./components/Transformations";
import Experts from "./components/Experts";
import Events from "./components/Events";
import Feedback from "./components/Feedback";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import JoinForm from "./components/JoinForm";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState("");

  const openJoinForm = (membershipName = "") => {
    setSelectedMembership(membershipName);
    setShowJoinForm(true);
  };

  const closeJoinForm = () => {
    setShowJoinForm(false);
    setSelectedMembership("");
  };

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Navbar onJoin={() => openJoinForm()} />

      <div data-aos="fade-up">
        <Home onJoin={() => openJoinForm()} />
      </div>

      <div data-aos="fade-right">
      <About onJoin={() => openJoinForm()} />
      </div>

      <div data-aos="fade-left">
        <WhyChooseUs />
      </div>

      <div data-aos="zoom-in">
        <Batches />
      </div>

      <div data-aos="flip-up">
        <Membership openJoinForm={openJoinForm} />
      </div>

      <div data-aos="fade-up">
        <Transformations />
      </div>

      <div data-aos="zoom-in-up">
        <Experts />
      </div>

      <div data-aos="fade-up">
        <Events />
      </div>

      <div data-aos="flip-left">
        <Feedback />
      </div>

      <div data-aos="fade-up">
        <Contact />
      </div>

      {showJoinForm && (
        <JoinForm
          closeForm={closeJoinForm}
          selectedMembership={selectedMembership}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;