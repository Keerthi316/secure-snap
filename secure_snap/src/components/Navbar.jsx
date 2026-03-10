import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-card border-b border-gray-800 relative">

      {/* Logo */}
      <h1 className="text-xl font-bold text-primary">Secure Snap</h1>

      {/* Navigation */}
      <div className="flex gap-8 text-textMuted">
        <Link to="/home" className="hover:text-primary">Home</Link>
        <Link to="/uploads" className="hover:text-primary">My Uploads</Link>
        <Link to="/warnings" className="hover:text-primary">Detection Alerts</Link>
      </div>

      {/* Status + Profile */}
      <div className="flex items-center gap-4 relative">
        <span className="text-success text-sm flex items-center gap-1">
          ● ARMED
        </span>

        {/* Profile Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="text-xl"
        >
          👤
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-80 bg-background border border-gray-700 rounded-xl shadow-xl p-4 z-50">

            <p className="text-sm text-textMuted mb-2">
              Identity & Security
            </p>

            <Link
              to="/profile"
              className="block px-4 py-2 rounded hover:bg-card"
            >
              Dashboard
            </Link>

            <div className="border-t border-gray-700 my-3"></div>

            <button className="w-full text-left px-4 py-2 hover:bg-card rounded">
              🔐 Identity & Biometrics
            </button>

            <button className="w-full text-left px-4 py-2 hover:bg-card rounded">
              ⚙️ Security Controls
            </button>

            <button className="w-full text-left px-4 py-2 hover:bg-card rounded">
              👥 Connected Accounts
            </button>

            <div className="border-t border-gray-700 my-3"></div>

            <button className="w-full text-left px-4 py-2 hover:bg-card rounded">
              🧾 Subscription & Alerts
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
