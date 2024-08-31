import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FreelancerHomePage from "./pages/FreelancerHomePage";
import ClientHomePage from "./pages/ClientHomePage";
import ClientSignIn from "./pages/authPages/ClientSignIn";
import ClientSignUp from "./pages/authPages/ClientSignUp";
import FreelancerSignIn from "./pages/authPages/FreelancerSignIn";
import FreelancerSIgnUp from "./pages/authPages/FreelancerSignUp";

function App() {
  // state to use whenever the app need a re-render
  const [forceRender, setForceRender] = useState(false);

  return (
    <BrowserRouter>
      {/* routes to the app pages */}
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/freelancer/*" Component={FreelancerHomePage} />
        <Route path="/client/*" Component={ClientHomePage} />
        <Route path="/freelancer_signup" Component={FreelancerSIgnUp} />
        <Route path="/freelancer_signin" Component={FreelancerSignIn} />
        <Route path="/client_signup" Component={ClientSignUp} />
        <Route path="/client_signin" Component={ClientSignIn} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
