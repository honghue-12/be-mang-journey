import { useState, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useNavigate } from "react-router-dom";
import beMang from "@/assets/be-mang.png";
import beMangComplete from "@/assets/be-mang-complete.png";

const villageGates = [
  { name: "Content", icon: "📝", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
  { name: "Media", icon: "🎬", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
  { name: "Tech", icon: "💻", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
  { name: "Design", icon: "🎨", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
  { name: "Marketing", icon: "📊", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
  { name: "HR", icon: "🏛️", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
  { name: "Finance", icon: "💰", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
  { name: "Strategy", icon: "🏯", color: "bg-game-seal-gold/15 border-game-seal-gold/40" },
];

const Chapter4 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"armor" | "choose" | "letter" | "celebration">("armor");
  const [chosenVillage, setChosenVillage] = useState<string | null>(null);
  const [hoveredGate, setHoveredGate] = useState<string | null>(null);
  const [letterProgress, setLetterProgress] = useState(0);

  const candidateName = "Minh Anh";
  const topSkill = "Tư duy sáng tạo";
  const feedbackKeyword = "đam mê";

  // Simulate handwriting
  const startHandwriting = () => {
    setPhase("letter");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLetterProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase("celebration"), 1000);
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-3 py-2"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-sm font-bold text-foreground">
            🏯 Vinh Quy Bái Tổ
          </h1>
          <span className="text-[10px] font-display font-bold text-game-seal-gold bg-game-seal-gold/10 px-2 py-0.5 rounded-full">
            Chương 4
          </span>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* ARMOR REVEAL */}
          {phase === "armor" && (
            <motion.div
              key="armor"
              className="flex-1 flex flex-col items-center justify-center px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <motion.div
                className="relative mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <motion.img
                  src={beMangComplete}
                  alt="Bé Măng - Giáp Trạng Nguyên"
                  className="w-36 h-36 object-contain drop-shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                {/* Sparkles */}
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xs"
                    style={{
                      top: `${20 + Math.sin(i * 1.05) * 40}%`,
                      left: `${20 + Math.cos(i * 1.05) * 40}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  >✨</motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-1">
                  Giáp Trạng Nguyên
                </h2>
                <p className="text-xs text-muted-foreground font-body mb-4 leading-relaxed">
                  Bé Măng đã thu thập đủ 8 vật phẩm và khoác lên bộ giáp hoàn chỉnh!
                </p>
              </motion.div>

              {/* Accessories grid */}
              <motion.div
                className="grid grid-cols-4 gap-2 w-full max-w-xs mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {["👒 Nón Lá", "🧣 Khăn Rằn", "👞 Guốc Mộc", "🖌️ Bút Lông", "📜 Sổ T.Hành", "🥁 Trống Đồng", "🏮 Đèn Lồng", "🔱 Ấn T.Nguyên"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="bg-game-seal-gold/10 border border-game-seal-gold/30 rounded-xl p-2 text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.08, type: "spring" }}
                  >
                    <span className="text-sm">{item.split(" ")[0]}</span>
                    <p className="text-[8px] font-display font-semibold text-foreground/60 mt-0.5 leading-tight">
                      {item.split(" ").slice(1).join(" ")}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                className="w-full max-w-xs bg-primary text-primary-foreground font-display font-bold text-sm py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                onClick={() => setPhase("choose")}
              >
                Chọn cổng làng 🚪
              </motion.button>
            </motion.div>
          )}

          {/* VILLAGE CHOICE */}
          {phase === "choose" && (
            <motion.div
              key="choose"
              className="flex-1 flex flex-col px-4 py-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="text-center mb-4">
                <h2 className="font-display text-base font-bold text-foreground">
                  Chọn cổng làng của bạn
                </h2>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Nhấn vào cổng làng mà bạn muốn gia nhập
                </p>
              </div>

              {/* Character */}
              <div className="flex justify-center mb-4">
                <motion.img
                  src={beMangComplete}
                  alt="Bé Măng"
                  className="w-16 h-16 object-contain drop-shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Village gates grid */}
              <div className="grid grid-cols-2 gap-2 flex-1">
                {villageGates.map((gate, i) => (
                  <motion.button
                    key={gate.name}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border-2 transition-all
                      ${chosenVillage === gate.name
                        ? "bg-primary/15 border-primary shadow-float ring-2 ring-primary/20"
                        : `${gate.color} hover:border-primary/30`
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
                  onClick={startHandwriting}
                >
                  Xác nhận: Làng {chosenVillage} ✨
                </motion.button>
              )}
            </motion.div>
          )}

          {/* HANDWRITING LETTER */}
          {phase === "letter" && (
            <motion.div
              key="letter"
              className="flex-1 flex flex-col items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-full max-w-xs bg-game-scroll-cream border-2 border-game-seal-gold/30 rounded-2xl p-5 shadow-card relative overflow-hidden"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Writing progress mask */}
                <div
                  className="absolute inset-0 bg-game-scroll-cream z-10 pointer-events-none transition-all duration-100"
                  style={{ top: `${letterProgress}%` }}
                />

                <div className="relative z-0 space-y-3">
                  <p className="text-[10px] text-muted-foreground font-body text-center uppercase tracking-widest">
                    Thư tay từ Leader
                  </p>

                  <div className="w-8 h-0.5 bg-game-seal-gold/30 mx-auto" />

                  <p className="text-sm font-body text-foreground/80 leading-relaxed" style={{ fontStyle: "italic" }}>
                    Kính gửi <strong>{candidateName}</strong>,
                  </p>
                  <p className="text-xs font-body text-foreground/70 leading-relaxed">
                    Qua hành trình vừa qua, chúng tôi nhận thấy bạn sở hữu
                    <strong className="text-primary"> {topSkill}</strong> — một
                    phẩm chất quý giá mà Làng {chosenVillage} đang cần.
                  </p>
                  <p className="text-xs font-body text-foreground/70 leading-relaxed">
                    Sự <strong className="text-accent">{feedbackKeyword}</strong> của
                    bạn đã truyền cảm hứng cho cả đội ngũ. Chúng tôi rất vui mừng
                    chào đón bạn!
                  </p>
                  <p className="text-xs font-body text-foreground/60 mt-4 text-right">
                    — Leader Làng {chosenVillage} 🖋️
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mt-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-sm">✍️</span>
                <p className="text-xs text-muted-foreground font-body italic">Đang viết thư...</p>
                <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-game-seal-gold rounded-full"
                    animate={{ width: `${letterProgress}%` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* CELEBRATION */}
          {phase === "celebration" && (
            <motion.div
              key="celebration"
              className="flex-1 flex flex-col items-center justify-center px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Fireworks */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-lg"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 60}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -30],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {["🎆", "🎇", "✨", "🎊", "🌟", "💫"][i % 6]}
                  </motion.span>
                ))}
              </div>

              <motion.img
                src={beMangComplete}
                alt="Bé Măng hoàn thiện"
                className="w-32 h-32 object-contain drop-shadow-xl mb-4 relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, -10, 0] }}
                transition={{ scale: { type: "spring", delay: 0.3 }, y: { duration: 3, repeat: Infinity } }}
              />

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  🎉 Vinh Quy Bái Tổ!
                </h1>
                <p className="text-sm text-muted-foreground font-body mb-1">
                  Chúc mừng <strong>{candidateName}</strong>!
                </p>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Bạn chính thức gia nhập <strong className="text-primary">Làng {chosenVillage}</strong>
                </p>
              </motion.div>

              <motion.div
                className="w-full max-w-xs bg-game-seal-gold/10 border-2 border-game-seal-gold/40 rounded-2xl p-4 relative z-10 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">🔱</span>
                  <span className="font-display text-sm font-bold text-game-seal-gold">Ấn Trạng Nguyên</span>
                  <span className="text-2xl">🔱</span>
                </div>
                <p className="text-[10px] text-foreground/60 font-body">
                  Hoàn thành hành trình Chép sử • 8/8 làng nghề
                </p>
              </motion.div>

              <motion.div
                className="relative z-10 bg-game-scroll-cream border border-game-seal-gold/20 rounded-xl px-4 py-2.5 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <p className="text-xs font-body font-semibold text-foreground/70 italic text-center">
                  "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao" 🌄
                </p>
              </motion.div>

              <motion.button
                className="w-full max-w-xs bg-primary text-primary-foreground font-display font-bold text-sm py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                onClick={() => navigate("/")}
              >
                Về trang chủ 🏠
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chapter4;
