import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import beMang from "@/assets/be-mang.png";

const surveyQuestions = [
  { id: 1, question: "Buổi trải nghiệm hôm nay có thú vị không?", type: "rating" as const },
  { id: 2, question: "Bạn có muốn tìm hiểu thêm về team này không?", type: "yesno" as const },
  { id: 3, question: "Điều gì ấn tượng nhất với bạn?", type: "text" as const },
  { id: 4, question: "Bạn có cảm thấy mình phù hợp với team này không?", type: "rating" as const },
];

const Chapter3 = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [submitted, setSubmitted] = useState(false);

  const villageName = "Làng Marketing";

  const handleAnswer = (value: string | number) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: value }));
  };

  const nextQ = () => {
    if (currentQ + 1 >= surveyQuestions.length) {
      setSubmitted(true);
    } else {
      setCurrentQ((q) => q + 1);
    }
  };

  const q = surveyQuestions[currentQ];
  const hasAnswer = answers[currentQ] !== undefined && answers[currentQ] !== "";

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-4 md:px-8 py-3"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-base md:text-lg font-bold text-foreground">
            📋 Đánh giá trải nghiệm
          </h1>
          <span className="text-xs font-display font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {villageName}
          </span>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col items-center px-4 md:px-8 py-6 md:py-10">
        <div className="w-full max-w-2xl">
          {/* Bé Măng */}
          <div className="flex justify-center mb-6">
            <motion.div className="relative">
              <motion.img
                src={beMang}
                alt="Bé Măng"
                className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                className="absolute -top-1 -right-1 text-base"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >😊</motion.span>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key={`q-${currentQ}`}
                className="flex-1 flex flex-col"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                {/* Progress */}
                <div className="flex items-center gap-2 mb-5">
                  {surveyQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        i < currentQ ? "bg-game-hp-green" : i === currentQ ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground font-body mb-2">
                    Câu {currentQ + 1}/{surveyQuestions.length}
                  </p>
                  <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-5">
                    {q.question}
                  </h2>

                  {q.type === "rating" && (
                    <div className="flex justify-center gap-4 my-5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleAnswer(star)}
                          className={`w-14 h-14 rounded-xl border-2 text-2xl flex items-center justify-center transition-all active:scale-90
                            ${(answers[currentQ] as number) >= star
                              ? "bg-game-seal-gold/20 border-game-seal-gold scale-105"
                              : "bg-card border-border hover:border-primary/30"
                            }`}
                        >
                          {(answers[currentQ] as number) >= star ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "yesno" && (
                    <div className="flex gap-3 my-5">
                      {[
                        { value: "yes", label: "Có, rất muốn!", emoji: "🙌" },
                        { value: "maybe", label: "Cần suy nghĩ thêm", emoji: "🤔" },
                        { value: "no", label: "Chưa chắc lắm", emoji: "😐" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswer(opt.value)}
                          className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-display font-bold transition-all active:scale-95
                            ${answers[currentQ] === opt.value
                              ? "bg-primary/10 border-primary"
                              : "bg-card border-border hover:border-primary/20"
                            }`}
                        >
                          <span className="text-2xl">{opt.emoji}</span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "text" && (
                    <textarea
                      className="flex-1 min-h-[120px] w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      placeholder="Chia sẻ cảm nhận của bạn..."
                      value={(answers[currentQ] as string) || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      maxLength={300}
                    />
                  )}

                  <button
                    onClick={nextQ}
                    disabled={!hasAnswer}
                    className="mt-6 w-full bg-primary text-primary-foreground font-display font-bold text-base py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {currentQ + 1 >= surveyQuestions.length ? "Gửi đánh giá ✅" : "Tiếp theo →"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                className="flex-1 flex flex-col items-center justify-center text-center px-4 py-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.span
                  className="text-6xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ type: "spring" }}
                >🎉</motion.span>

                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Cảm ơn bạn!
                </h2>
                <p className="text-base text-muted-foreground font-body mb-8 leading-relaxed max-w-md">
                  Đánh giá của bạn đã được ghi nhận. <br />
                  Tiếp tục hành trình khám phá nhé!
                </p>

                <button
                  onClick={() => navigate("/chapter4")}
                  className="w-full max-w-sm bg-primary text-primary-foreground font-display font-bold text-base py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
                >
                  Chọn team yêu thích 💫
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Chapter3;
