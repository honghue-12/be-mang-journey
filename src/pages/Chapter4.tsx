import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import beMang from "@/assets/be-mang.png";
import beMangComplete from "@/assets/be-mang-complete.png";

const villageGates = [
  { name: "Content", icon: "📝", accessory: "🖌️ Bút Lông" },
  { name: "Media", icon: "🎬", accessory: "🏮 Đèn Lồng" },
  { name: "Tech", icon: "💻", accessory: "🥁 Trống Đồng" },
  { name: "Design", icon: "🎨", accessory: "👒 Nón Lá" },
  { name: "Marketing", icon: "📊", accessory: "🧣 Khăn Rằn" },
  { name: "HR", icon: "🏛️", accessory: "👞 Guốc Mộc" },
  { name: "Finance", icon: "💰", accessory: "📜 Sổ Thông Hành" },
  { name: "Strategy", icon: "🏯", accessory: "🔱 Ấn Trạng Nguyên" },
];

// Simulated: villages the user joined and received items from
const joinedVillages = ["Content", "Media", "Tech"];

const Chapter4 = () => {
  const navigate = useNavigate();
  const [chosenVillage, setChosenVillage] = useState<string | null>(null);

  const collectedAccessories = villageGates.filter(v => joinedVillages.includes(v.name));

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-4 md:px-8 py-3"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-base md:text-lg font-bold text-foreground">
            💫 Chọn team yêu thích
          </h1>
          <span className="text-xs font-display font-bold text-game-seal-gold bg-game-seal-gold/10 px-2.5 py-1 rounded-full">
            Bước tiếp theo
          </span>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col items-center overflow-y-auto px-4 md:px-8 py-6 md:py-10">
        <div className="w-full max-w-4xl">
          {/* Character with collected accessories */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <motion.img
                src={joinedVillages.length >= 3 ? beMangComplete : beMang}
                alt="Bé Măng"
                className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Display collected accessories around character */}
              {collectedAccessories.map((item, i) => {
                const angle = (i * 120) - 90; // distribute around character
                const radius = 55;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                return (
                  <motion.span
                    key={item.name}
                    className="absolute text-lg md:text-xl"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 3, repeat: Infinity }}
                  >
                    {item.accessory.split(" ")[0]}
                  </motion.span>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground font-body mt-2">
              Vật phẩm đã thu thập: {collectedAccessories.map(a => a.accessory).join(", ")}
            </p>
          </div>

          <div className="text-center mb-6">
            <h2 className="font-display text-lg md:text-xl font-bold text-foreground">
              Team nào bạn thích nhất?
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Chọn team mà bạn muốn gia nhập
            </p>
          </div>

          {/* Village gates grid — wider on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {villageGates.map((gate, i) => {
              const wasJoined = joinedVillages.includes(gate.name);
              return (
                <motion.button
                  key={gate.name}
                  className={`flex flex-col items-center justify-center gap-2 p-4 md:p-5 rounded-2xl border-2 transition-all
                    ${chosenVillage === gate.name
                      ? "bg-primary/15 border-primary shadow-float ring-2 ring-primary/20"
                      : wasJoined
                        ? "bg-game-seal-gold/10 border-game-seal-gold/30 hover:border-primary/30"
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: "spring" }}
                  onClick={() => setChosenVillage(gate.name)}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-3xl">{gate.icon}</span>
                  <span className="font-display text-sm font-bold text-foreground">
                    Làng {gate.name}
                  </span>
                  {wasJoined && (
                    <span className="text-[10px] text-game-seal-gold font-display font-bold">
                      ✓ Đã tham gia
                    </span>
                  )}
                  {chosenVillage === gate.name && (
                    <motion.span
                      className="text-xs text-primary font-display font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >✓ Đã chọn</motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {chosenVillage && (
            <motion.button
              className="mt-6 w-full max-w-md mx-auto block bg-primary text-primary-foreground font-display font-bold text-base py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(`/chapter5?team=${chosenVillage}`)}
            >
              Xác nhận: Làng {chosenVillage} ✨
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter4;
