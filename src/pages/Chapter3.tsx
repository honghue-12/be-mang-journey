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
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-3 py-2"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-sm font-bold text-foreground">
            📋 Đánh giá trải nghiệm
          </h1>
          <span className="text-[10px] font-display font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {villageName}
          </span>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col px-4 py-4">
        {/* Bé Măng */}
        <div className="flex justify-center mb-4">
          <motion.div className="relative">
            <motion.img
              src={beMang}
              alt="Bé Măng"
              className="w-20 h-20 object-contain drop-shadow-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.span
              className="absolute -top-1 -right-1 text-sm"
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
              <div className="flex items-center gap-2 mb-4">
                {surveyQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      i < currentQ ? "bg-game-hp-green" : i === currentQ ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex-1 flex flex-col">
                <p className="text-[10px] text-muted-foreground font-body mb-1">
                  Câu {currentQ + 1}/{surveyQuestions.length}
                </p>
                <h2 className="font-display text-base font-bold text-foreground mb-4">
                  {q.question}
                </h2>

                {/* Rating type */}
                {q.type === "rating" && (
                  <div className="flex justify-center gap-3 my-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleAnswer(star)}
                        className={`w-12 h-12 rounded-xl border-2 text-xl flex items-center justify-center transition-all active:scale-90
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

                {/* Yes/No type */}
                {q.type === "yesno" && (
                  <div className="flex gap-3 my-4">
                    {[
                      { value: "yes", label: "Có, rất muốn!", emoji: "🙌" },
                      { value: "maybe", label: "Cần suy nghĩ thêm", emoji: "🤔" },
                      { value: "no", label: "Chưa chắc lắm", emoji: "😐" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-display font-bold transition-all active:scale-95
                          ${answers[currentQ] === opt.value
                            ? "bg-primary/10 border-primary"
                            : "bg-card border-border hover:border-primary/20"
                          }`}
                      >
                        <span className="text-xl">{opt.emoji}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Text type */}
                {q.type === "text" && (
                  <textarea
                    className="flex-1 min-h-[100px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Chia sẻ cảm nhận của bạn..."
                    value={(answers[currentQ] as string) || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    maxLength={300}
                  />
                )}

                <button
                  onClick={nextQ}
                  disabled={!hasAnswer}
                  className="mt-auto w-full bg-primary text-primary-foreground font-display font-bold text-sm py-3 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {currentQ + 1 >= surveyQuestions.length ? "Gửi đánh giá ✅" : "Tiếp theo →"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              className="flex-1 flex flex-col items-center justify-center text-center px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.span
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ type: "spring" }}
              >🎉</motion.span>

              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                Cảm ơn bạn!
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
                Đánh giá của bạn đã được ghi nhận. <br />
                Hãy tiếp tục hành trình khám phá nhé!
              </p>

              <button
                onClick={() => navigate("/chapter4")}
                className="w-full max-w-xs bg-primary text-primary-foreground font-display font-bold text-sm py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Chọn team yêu thích 💫
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chapter3;
