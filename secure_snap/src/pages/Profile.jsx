import { useState } from "react";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [sensitivity, setSensitivity] = useState(80);
  const [plan, setPlan] = useState("Free Trial (1 Month)");

  const [accounts, setAccounts] = useState({
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ================= LEFT CONTENT ================= */}
        <div className="md:col-span-2">

          {/* ================= DASHBOARD ================= */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-blue-400">
                Identity Dashboard
              </h1>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-xl font-semibold mb-2">
                  Identity & Biometrics
                </h2>
                <p>
                  Aadhaar Verification:
                  <span className={`ml-2 font-semibold ${aadhaarVerified ? "text-green-400" : "text-yellow-400"}`}>
                    {aadhaarVerified ? "Verified ✔" : "Not Verified"}
                  </span>
                </p>
                <p className="mt-1">
                  Face Signature Status:
                  <span className="text-green-400 ml-2 font-semibold">Active</span>
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-xl font-semibold mb-2">
                  Security Controls
                </h2>
                <p className="text-slate-300">Monitoring Sensitivity</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sensitivity}
                  readOnly
                  className="w-full mt-2 accent-blue-500"
                />
                <p className="mt-2">
                  Current Mode:
                  <span className="text-blue-400 ml-2 font-semibold">
                    {sensitivity > 70 ? "High Sensitivity" : "Standard"}
                  </span>
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-xl font-semibold mb-2">
                  Connected Accounts
                </h2>
                <p className="mb-1">Instagram: <span className="text-green-400 font-semibold">Connected</span></p>
                <p className="mb-1">X (Twitter): <span className="text-green-400 font-semibold">Connected</span></p>
                <p>Facebook: <span className="text-slate-500">Not Linked</span></p>
              </div>
            </div>
          )}

          {/* ================= IDENTITY ================= */}
          {activeSection === "identity" && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">
                Identity & Biometrics
              </h2>

              <p className="mb-4">
                Aadhaar Verification:
                <span className={`ml-2 font-semibold ${aadhaarVerified ? "text-green-400" : "text-yellow-400"}`}>
                  {aadhaarVerified ? "Verified ✔" : "Not Verified"}
                </span>
              </p>

              <input
                type="file"
                className="w-full p-3 mt-4 bg-slate-950 border border-slate-700 rounded text-white"
              />

              <button
                type="button"
                onClick={() => setAadhaarVerified(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition-colors"
              >
                Upload & Verify
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("dashboard")}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm block transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}

          {/* ================= SECURITY ================= */}
          {activeSection === "security" && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">
                Security Controls
              </h2>

              <p className="text-slate-300 mb-2">Monitoring Sensitivity</p>

              <input
                type="range"
                min="0"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(e.target.value)}
                className="w-full mt-2 accent-blue-500"
              />

              <p className="mt-4 text-lg">
                Current Mode:
                <span className="text-blue-400 ml-2 font-semibold">
                  {sensitivity > 70 ? "High Sensitivity" : "Standard"}
                </span>
              </p>

              <button
                type="button"
                onClick={() => setActiveSection("dashboard")}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}

          {/* ================= ACCOUNTS ================= */}
          {activeSection === "accounts" && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">
                Connected Accounts
              </h2>

              <input
                placeholder="Instagram Profile URL"
                className="w-full mb-3 p-3 bg-slate-950 border border-slate-700 rounded text-white placeholder:text-slate-500"
                onChange={(e) => setAccounts({ ...accounts, instagram: e.target.value })}
              />

              <input
                placeholder="LinkedIn Profile URL"
                className="w-full mb-3 p-3 bg-slate-950 border border-slate-700 rounded text-white placeholder:text-slate-500"
                onChange={(e) => setAccounts({ ...accounts, linkedin: e.target.value })}
              />

              <input
                placeholder="X (Twitter) Profile URL"
                className="w-full mb-3 p-3 bg-slate-950 border border-slate-700 rounded text-white placeholder:text-slate-500"
                onChange={(e) => setAccounts({ ...accounts, twitter: e.target.value })}
              />

              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition-colors"
              >
                Save Accounts
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("dashboard")}
                className="mt-6 block text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}

          {/* ================= SUBSCRIPTION ================= */}
          {activeSection === "subscription" && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">
                Subscription & Alerts
              </h2>

              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded text-white"
              >
                <option>Free Trial (1 Month)</option>
                <option>Monthly – ₹199</option>
                <option>Yearly – ₹1999</option>
              </select>

              <p className="mt-4 text-lg">
                Active Plan:
                <span className="text-green-400 ml-2 font-semibold">{plan}</span>
              </p>

              <button
                type="button"
                onClick={() => setActiveSection("dashboard")}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* ================= RIGHT MENU ================= */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl h-fit space-y-2">

          <p className="text-slate-500 text-xs uppercase tracking-wider mb-4 font-semibold">
            Profile
          </p>

          <button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              activeSection === "dashboard" 
                ? "bg-blue-600 text-white font-semibold" 
                : "bg-slate-800 hover:bg-slate-750 text-slate-300"
            }`}
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => setActiveSection("identity")}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              activeSection === "identity" 
                ? "bg-blue-600 text-white font-semibold" 
                : "bg-slate-800 hover:bg-slate-750 text-slate-300"
            }`}
          >
            🔐 Identity & Biometrics
          </button>

          <button
            onClick={() => setActiveSection("security")}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              activeSection === "security" 
                ? "bg-blue-600 text-white font-semibold" 
                : "bg-slate-800 hover:bg-slate-750 text-slate-300"
            }`}
          >
            ⚙️ Security Controls
          </button>

          <button
            onClick={() => setActiveSection("accounts")}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              activeSection === "accounts" 
                ? "bg-blue-600 text-white font-semibold" 
                : "bg-slate-800 hover:bg-slate-750 text-slate-300"
            }`}
          >
            👥 Connected Accounts
          </button>

          <button
            onClick={() => setActiveSection("subscription")}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              activeSection === "subscription" 
                ? "bg-blue-600 text-white font-semibold" 
                : "bg-slate-800 hover:bg-slate-750 text-slate-300"
            }`}
          >
            🧾 Subscription & Alerts
          </button>
        </div>
      </div>
    </div>
  );
}