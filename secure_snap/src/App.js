import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import SignUp from './pages/SignUp';

import Home from "./pages/Home";
import Uploads from "./pages/Uploads";
import Warnings from "./pages/Warnings";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* App Pages */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/uploads"
          element={
            <>
              <Navbar />
              <Uploads />
            </>
          }
        />

        <Route
          path="/warnings"
          element={
            <>
              <Navbar />
              <Warnings />
            </>
          }
        />


        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
