import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import beMangComplete from "@/assets/be-mang-complete.png";

const villageGates = [
  { name: "Content", icon: "📝" },
  { name: "Media", icon: "🎬" },
  { name: "Tech", icon: "💻" },
  { name: "Design", icon: "🎨" },
  { name: "Marketing", icon: "📊" },
  { name: "HR", icon: "🏛️" },
  { name: "Finance", icon: "💰" },
  { name: "Strategy", icon: "🏯" },
];

const Chapter4 = () => {
  const navigate = useNavigate();
  const [chosenVillage, setChosenVillage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-3 py-2"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-sm font-bold text-foreground">
            💫 Chọn team yêu thích
          </h1>
          <span className="text-[10px] font-display font-bold text-game-seal-gold bg-game-seal-gold/10 px-2 py-0.5 rounded-full">
            Bước tiếp theo
          </span>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col overflow-y-auto px-4 py-4">
        {/* Character */}
        <div className="flex justify-center mb-3">
          <motion.img
            src={beMangComplete}
            alt="Bé Măng"
            className="w-20 h-20 object-contain drop-shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="text-center mb-4">
          <h2 className="font-display text-base font-bold text-foreground">
            Team nào bạn thích nhất?
          </h2>
          <p className="text-xs text-muted-foreground font-body mt-1">
            Chọn team mà bạn muốn gia nhập
          </p>
        </div>

        {/* Village gates grid */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {villageGates.map((gate, i) => (
            <motion.button
              key={gate.name}
              className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border-2 transition-all
                ${chosenVillage === gate.name
                  ? "bg-primary/15 border-primary shadow-float ring-2 ring-primary/20"
                  : "bg-game-seal-gold/5 border-game-seal-gold/20 hover:border-primary/30"
                }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: "spring" }}
              onClick={() => setChosenVillage(gate.name)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{gate.icon}</span>
              <span className="font-display text-xs font-bold text-foreground">
                Làng {gate.name}
              </span>
              {chosenVillage === gate.name && (
                <motion.span
                  className="text-xs text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >✓ Đã chọn</motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {chosenVillage && (
          <motion.button
            className="mt-4 w-full bg-primary text-primary-foreground font-display font-bold text-sm py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/chapter5?team=${chosenVillage}`)}
          >
            Xác nhận: Làng {chosenVillage} ✨
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Chapter4;
