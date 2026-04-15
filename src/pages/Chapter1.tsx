import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import beMang from "@/assets/be-mang.png";

const Chapter1 = () => {
  const [step, setStep] = useState<"scroll" | "reveal" | "ready">("scroll");
  const navigate = useNavigate();

  const candidateName = "Minh Anh";
  const mentorName = "Chị Hương";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8860B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <AnimatePresence mode="wait">
        {step === "scroll" && (
          <motion.div
            key="scroll"
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
          >
            <motion.div
              className="relative w-80 md:w-96 bg-game-scroll-cream border-2 border-game-seal-gold/40 rounded-2xl shadow-card overflow-hidden"
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="flex justify-center py-4 bg-game-seal-gold/10 border-b border-game-seal-gold/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-14 h-14 rounded-full bg-game-seal-gold/20 border-2 border-game-seal-gold flex items-center justify-center">
                  <span className="text-3xl">📜</span>
                </div>
              </motion.div>

              <motion.div
                className="p-6 md:p-8 space-y-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <p className="text-xs text-muted-foreground font-body uppercase tracking-widest">
                  Thư mời chính thức
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
                  Xin chào<br />
                  <span className="text-primary">{candidateName}</span>
                </h2>
                <div className="w-10 h-0.5 bg-game-seal-gold/40 mx-auto" />
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  Chúc mừng bạn đã vượt qua vòng sơ tuyển!
                  Hãy bắt đầu <strong>Hành trình phát triển cùng NhiLe Team</strong>.
                </p>
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground font-body">
                    Mentor đồng hành
                  </p>
                  <p className="text-base font-display font-bold text-foreground">
                    👩‍💼 {mentorName}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex justify-center gap-2 py-3 bg-game-seal-gold/5 border-t border-game-seal-gold/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <span className="text-sm opacity-60">🪷</span>
                <span className="text-sm opacity-40">🪷</span>
                <span className="text-sm opacity-60">🪷</span>
              </motion.div>
            </motion.div>

            <motion.button
              className="mt-8 bg-primary text-primary-foreground font-display font-bold text-base px-10 py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              onClick={() => setStep("reveal")}
            >
              Mở thư 📨
            </motion.button>
          </motion.div>
        )}

        {step === "reveal" && (
          <motion.div
            key="reveal"
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative mb-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <motion.img
                src={beMang}
                alt="Bé Măng"
                className="w-36 h-36 md:w-44 md:h-44 object-contain drop-shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute -top-2 -right-2 text-lg"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >🪷</motion.span>
              <motion.span
                className="absolute -bottom-1 -left-3 text-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >🦋</motion.span>
            </motion.div>

            <motion.div
              className="text-center space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Xin chào, {candidateName}! 👋
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed max-w-md">
                Đây là <strong>Bé Măng</strong> — người bạn đồng hành của bạn
                trong hành trình khám phá NhiLe Team.
              </p>
            </motion.div>

            <motion.div
              className="mt-6 bg-card border border-border rounded-2xl p-5 w-full max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-lg">🌱</span>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-body">Cấp bậc</p>
                  <p className="text-sm font-display font-bold text-foreground">Mầm non kiến tạo</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-muted-foreground">💚 Sức khỏe</span>
                  <span className="font-display font-bold text-game-hp-green">100/100</span>
                </div>
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-muted-foreground">💧 Nước</span>
                  <span className="font-display font-bold text-game-water-blue">100/100</span>
                </div>
              </div>
            </motion.div>

            <motion.button
              className="mt-6 w-full max-w-sm bg-primary text-primary-foreground font-display font-bold text-base py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              onClick={() => setStep("ready")}
            >
              Bắt đầu hành trình 🚀
            </motion.button>
          </motion.div>
        )}

        {step === "ready" && (
          <motion.div
            key="ready"
            className="relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <span className="text-6xl">🗺️</span>
            </motion.div>

            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Hành trình bắt đầu!
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-body mb-1 max-w-md leading-relaxed">
              Ghé thăm các làng nghề, trải nghiệm văn hóa, và thu thập phụ kiện trên hành trình phát triển.
            </p>

            <motion.div
              className="mt-4 bg-game-scroll-cream border border-game-seal-gold/20 rounded-xl px-5 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm font-body font-semibold text-foreground/70 italic">
                "Có công mài sắt, có ngày nên kim" ✨
              </p>
            </motion.div>

            <motion.button
              className="mt-6 w-full max-w-sm bg-primary text-primary-foreground font-display font-bold text-base py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={() => navigate("/map")}
            >
              Khám phá bản đồ 🗺️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chapter1;
