module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0F1A",
        card: "#111827",
        primary: "#3B82F6",
        success: "#22C55E",
        warning: "#2DD4BF",
        danger: "#EF4444",
        textMain: "#E5E7EB",
        textMuted: "#9CA3AF",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px #14e6f5" },
          "100%": { boxShadow: "0 0 40px #14e6f5" },
        },
      },
    },
  },
  plugins: [],
};
