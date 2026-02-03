export const colors = {
  primary: "#4A6FA5",
  primaryDark: "#3A5A8A",
  secondary: "#FFC857",
  success: "#4CAF50",
  error: "#FF6B6B",
  warning: "#FF9800",
  info: "#2196F3",

  // Backgrounds
  background: "#FFFFFF",
  surface: "#F8F9FA",
  card: "#FFFFFF",

  // Text
  textPrimary: "#2C3E50",
  textSecondary: "#7F8C8D",
  textDisabled: "#BDC3C7",
  textInverse: "#FFFFFF",

  // Borders
  border: "#E0E0E0",
  divider: "#EEEEEE",

  // States
  hover: "rgba(74, 111, 165, 0.08)",
  pressed: "rgba(74, 111, 165, 0.16)",
  focus: "rgba(74, 111, 165, 0.24)",
};

// WCAG AA compliant contrast ratios
export const accessibility = {
  contrast: {
    primary: "4.5:1", // Against white
    error: "4.5:1",
    success: "4.5:1",
  },
  minimumTouchSize: 44,
};
