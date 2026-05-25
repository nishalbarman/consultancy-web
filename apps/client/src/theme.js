const primary = "blue";

const palettes = {
  blue: {
    text: "text-sky-700",
    textHover: "hover:text-sky-900",
    textSoft: "text-sky-300",
    textPale: "text-sky-100",
    bg: "bg-sky-600",
    bgHover: "hover:bg-sky-700",
    bgSoft: "bg-sky-100",
    bgPale: "bg-sky-50",
    border: "border-sky-300",
    borderHover: "hover:border-sky-300",
    borderSoft: "border-sky-200",
    focus: "focus:border-sky-400 focus:ring-sky-100",
    shadow: "shadow-sky-600/20",
    heroWash:
      "bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_36%),linear-gradient(135deg,_#ffffff_0%,_#eef6ff_52%,_#f8fafc_100%)]",
    contactWash:
      "bg-[linear-gradient(120deg,_rgba(14,165,233,0.35),_rgba(15,23,42,0.92)),url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80')]",
    portalWash:
      "bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_34%),#f8fafc]",
  },
  orange: {
    text: "text-orange-700",
    textHover: "hover:text-orange-900",
    textSoft: "text-orange-300",
    textPale: "text-orange-100",
    bg: "bg-orange-600",
    bgHover: "hover:bg-orange-700",
    bgSoft: "bg-orange-100",
    bgPale: "bg-orange-50",
    border: "border-orange-300",
    borderHover: "hover:border-orange-300",
    borderSoft: "border-orange-200",
    focus: "focus:border-orange-400 focus:ring-orange-100",
    shadow: "shadow-orange-600/20",
    heroWash:
      "bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_36%),linear-gradient(135deg,_#ffffff_0%,_#fff7ed_52%,_#f8fafc_100%)]",
    contactWash:
      "bg-[linear-gradient(120deg,_rgba(249,115,22,0.34),_rgba(15,23,42,0.92)),url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80')]",
    portalWash:
      "bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_34%),#f8fafc]",
  },
};

export const theme = palettes[primary];
