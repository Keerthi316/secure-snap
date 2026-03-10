import { useState, useEffect, useRef } from "react";
import ConsentNotification from "../components/ConsentNotification";

// Alert History Item
function AlertHistoryItem({ alert }) {
  const statusConfig = {
    pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500', icon: '⏳' },
    approved: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500', icon: '✓' },
    denied: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500', icon: '🚫' }
  };

  const config = statusConfig[alert.status];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-5 hover:border-cyan-400 transition-all animate-fadeIn">
      <div className="flex items-start gap-4">
        {alert.imageUrl && (
          <img 
            src={alert.imageUrl} 
            alt="Alert" 
            className="w-24 h-24 object-cover rounded-lg"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold">Detection Alert</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
              {config.icon} {alert.status.toUpperCase()}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-2">
            Detected on: <span className="text-cyan-400">{alert.website}</span>
          </p>
          
          <p className="text-gray-500 text-xs">
            {alert.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Warnings() {
  const [showConsent, setShowConsent] = useState(false);
  const [currentDetection, setCurrentDetection] = useState(null);
  const [alertHistory, setAlertHistory] = useState([]);
  const alertSoundRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    alertSoundRef.current = new Audio("/alert.mp3");
  }, []);

  const triggerAlert = () => {
    const detectionData = {
      id: Date.now(),
      website: "example-social-site.com",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    };
    
    setCurrentDetection(detectionData);
    setShowConsent(true);
    
    // Play alert sound
    if (alertSoundRef.current) {
      alertSoundRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  };

  const handleApprove = () => {
    const approvedAlert = { ...currentDetection, status: 'approved' };
    setAlertHistory(prev => [approvedAlert, ...prev]);
    setShowConsent(false);
    setCurrentDetection(null);
  };

  const handleDeny = () => {
    const deniedAlert = { ...currentDetection, status: 'denied' };
    setAlertHistory(prev => [deniedAlert, ...prev]);
    setShowConsent(false);
    setCurrentDetection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Click to trigger alert */}
        <div 
          className="mb-8 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={triggerAlert}
          title="Click to check for detections"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <span className="text-5xl mr-4">⚠️</span>
            Detection Alerts
          </h1>
          <p className="text-gray-400">Real-time monitoring for unauthorized image usage</p>
        </div>

        {/* Alert History */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="text-2xl mr-3">📜</span>
            Alert History
            {alertHistory.length > 0 && (
              <span className="ml-auto text-sm bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500">
                {alertHistory.length} {alertHistory.length === 1 ? 'alert' : 'alerts'}
              </span>
            )}
          </h3>

          {alertHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🛡️</div>
              <p className="text-lg mb-2">No detections found</p>
              <p className="text-sm">Your images are currently protected</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alertHistory.map((alert) => (
                <AlertHistoryItem key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </div>

        {/* Notification Popup */}
        <ConsentNotification
          visible={showConsent}
          onApprove={handleApprove}
          onDeny={handleDeny}
          detectionData={currentDetection}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}