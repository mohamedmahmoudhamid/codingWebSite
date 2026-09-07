import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./compounats/Footer";
import Navbar from "./compounats/Navbar";
import Users from "./compounats/Users";
import CounactUs from "./compounats/CounactUs";
import AboutUs from "./compounats/AboutUs";
import Services from "./compounats/Services";
import NotFound from "./compounats/NotFound";
import Prodact from "./compounats/prodact";
import ProdactDetails from "./compounats/ProdactDetails";
import Login from "./compounats/Login";
import SignIn from "./compounats/singin";
import UserProfile from "./compounats/UserProfile";
import { AuthProvider } from "./context/context";
import { ThemeProvider } from "./context/themeContext";
import ScrollToTop from "./compounats/ScrollToTop";

const defaultUser = {
  name: "Alex Johnson",
  email: "alex.johnson@nexuscraft.dev",
  role: "Senior Full-Stack Engineer",
  bio: "Passionate developer building high-performance web applications, 3D interactive UIs, and cloud products.",
  phone: "+1 (555) 234-5678",
  location: "Cairo, Egypt",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  joinedDate: "January 2025",
  techStack: ["React 19", "Node.js", "TypeScript", "Three.js", "CSS Grid"],
  savedProducts: [1, 3, 5],
};

function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("nexuscraft_theme") || "dark";
  });

  // Auth state
  const [isLoggin, setIsLoggin] = useState(() => {
    return localStorage.getItem("nexuscraft_is_logged_in") === "true";
  });

  // User details state
  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem("nexuscraft_user");
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  // Theme attribute synchronization
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nexuscraft_theme", theme);
  }, [theme]);

  // Auth actions
  const login = (userData) => {
    setIsLoggin(true);
    localStorage.setItem("nexuscraft_is_logged_in", "true");
    if (userData) {
      setUserState(userData);
      localStorage.setItem("nexuscraft_user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setIsLoggin(false);
    localStorage.setItem("nexuscraft_is_logged_in", "false");
  };

  const setUser = (newUserData) => {
    setUserState(newUserData);
    localStorage.setItem("nexuscraft_user", JSON.stringify(newUserData));
  };

  const toggleSaveProduct = (productId) => {
    if (!user) return;
    const currentSaved = user.savedProducts || [];
    const isSaved = currentSaved.includes(productId);

    const updatedSaved = isSaved
      ? currentSaved.filter((id) => id !== productId)
      : [...currentSaved, productId];

    const updatedUser = { ...user, savedProducts: updatedSaved };
    setUser(updatedUser);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider value={{ theme, setTheme }}>
        <AuthProvider
          value={{
            isLoggin,
            setIsLoggin,
            user,
            setUser,
            login,
            logout,
            toggleSaveProduct,
          }}
        >
          <Navbar />
          <Routes location={location}>
            <Route path="/" element={<Users />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<CounactUs />} />
            <Route path="/products" element={<Prodact />} />
            <Route path="/details/:id" element={<ProdactDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
