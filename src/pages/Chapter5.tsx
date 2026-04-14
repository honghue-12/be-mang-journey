import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import beMangComplete from "@/assets/be-mang-complete.png";

const Chapter5 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chosenTeam = searchParams.get("team") || "Marketing";
  const candidateName = "Minh Anh";

  const [phase, setPhase] = useState<"letter" | "decision" | "accepted" | "declined">("letter");
  const [letterProgress, setLetterProgress] = useState(0);

  // Start handwriting effect on mount
  useState(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLetterProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 40);
  });

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-3 py-2"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-sm font-bold text-foreground">
            💌 Thư chào mừng
          </h1>
          <span className="text-[10px] font-display font-bold text-game-seal-gold bg-game-seal-gold/10 px-2 py-0.5 rounded-full">
            Làng {chosenTeam}
          </span>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <AnimatePresence mode="wait">
          {(phase === "letter" || phase === "decision") && (
            <motion.div
              key="letter"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Letter */}
              <motion.div
                className="w-full max-w-sm bg-game-scroll-cream border-2 border-game-seal-gold/30 rounded-2xl p-5 shadow-card relative overflow-hidden"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="absolute inset-0 bg-game-scroll-cream z-10 pointer-events-none transition-all duration-100"
                  style={{ top: `${letterProgress}%` }}
                />

                <div className="relative z-0 space-y-3">
                  <p className="text-[10px] text-muted-foreground font-body text-center uppercase tracking-widest">
                    Thư từ NhiLe Team
                  </p>
                  <div className="w-8 h-0.5 bg-game-seal-gold/30 mx-auto" />

                  <p className="text-sm font-body text-foreground/80 leading-relaxed italic">
                    Xin chào <strong>{candidateName}</strong>,
                  </p>
                  <p className="text-xs font-body text-foreground/70 leading-relaxed">
                    Sau trải nghiệm vừa rồi, chúng tôi hy vọng bạn đã có những giây phút thú vị
                    khi khám phá NhiLe Team!
                  </p>
                  <p className="text-xs font-body text-foreground/70 leading-relaxed">
                    Bạn có muốn trở thành một phần của <strong className="text-primary">gia đình NhiLe Team</strong> không?
                  </p>
                  <p className="text-xs font-body text-foreground/70 leading-relaxed">
                    Chúng tôi không chắc chắn bạn đậu phỏng vấn, nhưng nếu bạn đồng ý, chúng tôi mời bạn
                    tham gia buổi phỏng vấn cùng CEO vào <strong className="text-primary">Thứ 2 tuần tới, 10:00 sáng</strong>.
                  </p>
                  <p className="text-xs font-body text-foreground/60 mt-3 text-right">
                    — NhiLe Team 🌱
                  </p>
                </div>
              </motion.div>

              {/* Writing indicator or decision buttons */}
              {letterProgress < 100 ? (
                <motion.div className="mt-4 flex items-center gap-2">
                  <span className="text-sm">✍️</span>
                  <p className="text-xs text-muted-foreground font-body italic">Đang viết thư...</p>
                  <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-game-seal-gold rounded-full"
                      animate={{ width: `${letterProgress}%` }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="mt-6 w-full max-w-sm space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => setPhase("accepted")}
                    className="w-full bg-primary text-primary-foreground font-display font-bold text-sm py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
                  >
                    Đồng ý tham gia phỏng vấn! 🎉
                  </button>
                  <button
                    onClick={() => setPhase("declined")}
                    className="w-full bg-muted text-foreground/60 font-display font-bold text-sm py-3 rounded-xl hover:bg-muted/80 active:scale-[0.97] transition-all"
                  >
                    Từ chối, cảm ơn NLT 🙏
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === "accepted" && (
            <motion.div
              key="accepted"
              className="flex flex-col items-center text-center px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Fireworks */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
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
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {["🎆", "🎇", "✨", "🎊", "🌟", "💫"][i % 6]}
                  </motion.span>
                ))}
              </div>

              <motion.img
                src={beMangComplete}
                alt="Bé Măng"
                className="w-28 h-28 object-contain drop-shadow-xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, -8, 0] }}
                transition={{ scale: { type: "spring", delay: 0.3 }, y: { duration: 3, repeat: Infinity } }}
              />

              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                🎉 Tuyệt vời!
              </h1>
              <p className="text-sm text-muted-foreground font-body mb-2 leading-relaxed">
                Chúng tôi rất vui khi bạn đồng ý!
              </p>
              <p className="text-xs text-muted-foreground font-body mb-6 leading-relaxed">
                Lịch phỏng vấn sẽ được gửi đến bạn trong vòng 1 tuần. <br />
                Buổi phỏng vấn sẽ cùng CEO để chia sẻ về văn hóa và quy tắc NLT.
              </p>

              <div className="w-full max-w-xs bg-game-seal-gold/10 border-2 border-game-seal-gold/40 rounded-2xl p-4 mb-6">
                <p className="text-xs font-display font-bold text-game-seal-gold text-center">
                  📅 Lịch phỏng vấn: Thứ 2 tuần tới, 10:00 sáng
                </p>
                <p className="text-[10px] text-muted-foreground text-center mt-1">
                  Phỏng vấn cùng CEO • Văn hóa & Rule NLT
                </p>
              </div>

              <motion.div
                className="bg-game-scroll-cream border border-game-seal-gold/20 rounded-xl px-4 py-2.5 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-xs font-body font-semibold text-foreground/70 italic text-center">
                  "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao" 🌄
                </p>
              </motion.div>

              <button
                onClick={() => navigate("/")}
                className="w-full max-w-xs bg-primary text-primary-foreground font-display font-bold text-sm py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Về trang chủ 🏠
              </button>
            </motion.div>
          )}

          {phase === "declined" && (
            <motion.div
              key="declined"
              className="flex flex-col items-center text-center px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.img
                src={beMangComplete}
                alt="Bé Măng"
                className="w-24 h-24 object-contain drop-shadow-lg mb-4 saturate-50"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                Cảm ơn bạn! 🙏
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed max-w-xs">
                Chúng tôi tôn trọng quyết định của bạn. Hy vọng hành trình vừa qua đã mang lại
                những trải nghiệm thú vị. Cánh cửa NLT luôn rộng mở khi bạn sẵn sàng!
              </p>

              <button
                onClick={() => navigate("/")}
                className="w-full max-w-xs bg-muted text-foreground/70 font-display font-bold text-sm py-3.5 rounded-xl hover:bg-muted/80 active:scale-[0.97] transition-all"
              >
                Về trang chủ 🏠
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chapter5;
