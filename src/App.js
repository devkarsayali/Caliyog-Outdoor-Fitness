import { useEffect, useState } from "react";

import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Batches from "./components/Batches";
import Membership from "./components/Membership";
import Experts from "./components/Experts";
import Feedback from "./components/Feedback";
import Transformations from "./components/Transformations";
import Events from "./components/Events";
import Contact from "./components/Contact";


function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showWebsite, setShowWebsite] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!showWebsite) {
    return <Home onJoin={() => setShowWebsite(true)} />;
  }

  return (
    <div>
      <Navbar />

      <Home />
       <About />
      <WhyChooseUs />
      <Batches />
      <Membership />
<Transformations />

<Experts />
<Events />
<Feedback />
<Contact />
    </div>
  );
}

export default App;