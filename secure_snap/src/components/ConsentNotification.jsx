export default function ConsentNotification({ visible, onApprove, onDeny, detectionData }) {
  if (!visible) return null;

  return (
    <div className="fixed top-20 right-8 w-96 bg-slate-800 border-2 border-red-500 rounded-xl shadow-2xl z-50 animate-slideIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 rounded-t-xl font-bold text-sm flex items-center justify-between">
        <span>SECURE SNAP ALERT</span>
        <span className="animate-pulse">🔴</span>
      </div>

      {/* Body */}
      <div className="p-5 text-sm">
        <p className="text-gray-400 mb-2">
          Unauthorized likeness detected on
        </p>
        <p className="font-semibold text-cyan-400 mb-4 break-words">
          {detectionData?.website || "example-social-site.com"}
        </p>

        {detectionData?.imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden border border-gray-700">
            <img 
              src={detectionData.imageUrl} 
              alt="Detected" 
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <p className="mb-4 text-gray-300">
          Action required to approve or block usage.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onDeny}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-600 transition transform hover:scale-105"
          >
            DENY & TAKEDOWN
          </button>

          <button
            onClick={onApprove}
            className="flex-1 border-2 border-cyan-400 text-cyan-400 py-3 rounded-lg hover:bg-cyan-400 hover:text-black transition font-semibold transform hover:scale-105"
          >
            APPROVE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}