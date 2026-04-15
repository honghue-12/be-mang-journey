import { useState, useEffect } from "react";
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

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLetterProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-4 md:px-8 py-3"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-base md:text-lg font-bold text-foreground">
            💌 Thư chào mừng
          </h1>
          <span className="text-xs font-display font-bold text-game-seal-gold bg-game-seal-gold/10 px-2.5 py-1 rounded-full">
            Làng {chosenTeam}
          </span>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {(phase === "letter" || phase === "decision") && (
            <motion.div
              key="letter"
              className="w-full max-w-lg flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div
                className="w-full bg-game-scroll-cream border-2 border-game-seal-gold/30 rounded-2xl p-6 md:p-8 shadow-card relative overflow-hidden"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="absolute inset-0 bg-game-scroll-cream z-10 pointer-events-none transition-all duration-100"
                  style={{ top: `${letterProgress}%` }}
                />

                <div className="relative z-0 space-y-4">
                  <p className="text-xs text-muted-foreground font-body text-center uppercase tracking-widest">
                    Thư từ NhiLe Team
                  </p>
                  <div className="w-10 h-0.5 bg-game-seal-gold/30 mx-auto" />

                  <p className="text-base font-body text-foreground/80 leading-relaxed italic">
                    Xin chào <strong>{candidateName}</strong>,
                  </p>
                  <p className="text-sm font-body text-foreground/70 leading-relaxed">
                    Sau trải nghiệm vừa rồi, chúng tôi rất vui khi bạn đã có những giây phút thú vị
                    khi khám phá NhiLe Team!
                  </p>
                  <p className="text-sm font-body text-foreground/70 leading-relaxed">
                    Bạn có muốn trở thành một phần của <strong className="text-primary">gia đình NhiLe Team</strong> không?
                  </p>
                  <p className="text-sm font-body text-foreground/70 leading-relaxed">
                    Chúng tôi không chắc chắn bạn đậu phỏng vấn, nhưng nếu bạn đồng ý, chúng tôi mời bạn
                    tham gia buổi phỏng vấn cùng CEO vào <strong className="text-primary">Thứ 2 tuần tới, 10:00 sáng</strong>.
                  </p>
                  <p className="text-sm font-body text-foreground/60 mt-4 text-right">
                    — NhiLe Team 🌱
                  </p>
                </div>
              </motion.div>

              {letterProgress < 100 ? (
                <motion.div className="mt-5 flex items-center gap-2">
                  <span className="text-sm">✍️</span>
                  <p className="text-sm text-muted-foreground font-body italic">Đang viết thư...</p>
                  <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-game-seal-gold rounded-full"
                      animate={{ width: `${letterProgress}%` }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="mt-8 w-full space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => setPhase("accepted")}
                    className="w-full bg-primary text-primary-foreground font-display font-bold text-base py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
                  >
                    Đồng ý tham gia phỏng vấn! 🎉
                  </button>
                  <button
                    onClick={() => setPhase("declined")}
                    className="w-full bg-muted text-foreground/60 font-display font-bold text-base py-3 rounded-xl hover:bg-muted/80 active:scale-[0.97] transition-all"
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
              className="flex flex-col items-center text-center max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Fireworks */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xl"
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
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, -8, 0] }}
                transition={{ scale: { type: "spring", delay: 0.3 }, y: { duration: 3, repeat: Infinity } }}
              />

              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                🎉 Tuyệt vời!
              </h1>
              <p className="text-base text-muted-foreground font-body mb-3 leading-relaxed">
                Chúng tôi rất vui khi bạn đồng ý!
              </p>
              <p className="text-sm text-muted-foreground font-body mb-8 leading-relaxed max-w-md">
                Lịch phỏng vấn được gửi đến bạn trong vòng 1 tuần. <br />
                Buổi phỏng vấn diễn ra cùng CEO để chia sẻ về văn hóa và quy tắc NLT.
              </p>

              <div className="w-full max-w-sm bg-game-seal-gold/10 border-2 border-game-seal-gold/40 rounded-2xl p-5 mb-8">
                <p className="text-sm font-display font-bold text-game-seal-gold text-center">
                  📅 Lịch phỏng vấn: Thứ 2 tuần tới, 10:00 sáng
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1.5">
                  Phỏng vấn cùng CEO • Văn hóa & Rule NLT
                </p>
              </div>

              <motion.div
                className="bg-game-scroll-cream border border-game-seal-gold/20 rounded-xl px-5 py-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm font-body font-semibold text-foreground/70 italic text-center">
                  "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao" 🌄
                </p>
              </motion.div>

              <button
                onClick={() => navigate("/")}
                className="w-full max-w-sm bg-primary text-primary-foreground font-display font-bold text-base py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Về trang chủ 🏠
              </button>
            </motion.div>
          )}

          {phase === "declined" && (
            <motion.div
              key="declined"
              className="flex flex-col items-center text-center max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.img
                src={beMangComplete}
                alt="Bé Măng"
                className="w-28 h-28 object-contain drop-shadow-lg mb-6 saturate-50"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Cảm ơn bạn! 🙏
              </h2>
              <p className="text-base text-muted-foreground font-body mb-8 leading-relaxed max-w-md">
                Chúng tôi tôn trọng quyết định của bạn. Hành trình vừa qua đã mang lại
                những trải nghiệm thú vị. Cánh cửa NLT luôn rộng mở khi bạn sẵn sàng!
              </p>

              <button
                onClick={() => navigate("/")}
                className="w-full max-w-sm bg-muted text-foreground/70 font-display font-bold text-base py-3.5 rounded-xl hover:bg-muted/80 active:scale-[0.97] transition-all"
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
