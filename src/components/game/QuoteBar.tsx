import { motion } from "framer-motion";

const quotes = [
  "Có công mài sắt, có ngày nên kim ✨",
  "Chậm chân là héo măng đấy nha! 🌱",
  "Uống nước nhớ nguồn 💧",
  "Đi một ngày đàng, học một sàng khôn 📚",
];

export const QuoteBar = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      className="bg-game-scroll-cream border border-game-seal-gold/30 rounded-xl px-4 py-2.5 shadow-float"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <p className="text-xs font-body font-semibold text-foreground/80 text-center italic">
        "{quote}"
      </p>
    </motion.div>
  );
};
