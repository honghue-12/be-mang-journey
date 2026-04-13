import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import beMang from "@/assets/be-mang.png";

const quizQuestions = [
  {
    question: "NhiLe Team được thành lập với triết lý nào?",
    options: ["Lợi nhuận trên hết", "Con người là trung tâm", "Tăng trưởng bằng mọi giá", "Cạnh tranh khốc liệt"],
    correct: 1,
  },
  {
    question: "Biểu tượng văn hóa nào đại diện cho tinh thần NLT?",
    options: ["Cây tre", "Cây thông", "Cây phượng", "Cây bàng"],
    correct: 0,
  },
  {
    question: "\"Mầm non kiến tạo\" là cách gọi dành cho ai?",
    options: ["Khách hàng mới", "Ứng viên đang trải nghiệm", "Nhân viên kỳ cựu", "Ban lãnh đạo"],
    correct: 1,
  },
  {
    question: "Trong hành trình 8 làng, phụ kiện cuối cùng tạo thành gì?",
    options: ["Giáp Chiến binh", "Giáp Trạng Nguyên", "Bộ áo dài", "Trang phục lễ hội"],
    correct: 1,
  },
  {
    question: "Câu tục ngữ nào phù hợp nhất với tinh thần NLT?",
    options: ["Ăn cỗ đi trước", "Có công mài sắt có ngày nên kim", "Nước chảy đá mòn", "Tốt gỗ hơn tốt nước sơn"],
    correct: 1,
  },
];

const QUIZ_TIME = 30; // seconds per question

const Chapter3 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"feedback" | "quiz" | "results">("feedback");
  const [feedback, setFeedback] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [health, setHealth] = useState(100);
  const [water, setWater] = useState(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Timer
  useEffect(() => {
    if (phase !== "quiz" || showResult) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, showResult]);

  const handleTimeout = useCallback(() => {
    setHealth((h) => Math.max(0, h - 20));
    setWater((w) => Math.max(0, w - 20));
    setAnswers((a) => [...a, -1]);
    setShowResult(true);
    setTimeout(() => nextQuestion(), 1500);
  }, [currentQ]);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);

    const isCorrect = idx === quizQuestions[currentQ].correct;
    if (!isCorrect) {
      setHealth((h) => Math.max(0, h - 15));
      setWater((w) => Math.max(0, w - 20));
    }
    setAnswers((a) => [...a, idx]);
    setTimeout(() => nextQuestion(), 1200);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setPhase("results");
    } else {
      setCurrentQ((q) => q + 1);
      setTimeLeft(QUIZ_TIME);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const correctCount = answers.filter((a, i) => a === quizQuestions[i]?.correct).length;
  const beMangState = health > 60 ? "healthy" : health > 30 ? "tired" : "wilted";

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-3 py-2"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <h1 className="font-display text-sm font-bold text-foreground">
            📖 Cửa Ải Văn Hóa
          </h1>
          <span className="text-[10px] font-display font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            Chương 3
          </span>
        </div>
        {/* Status bars */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 flex-1">
            <span className="text-sm">💚</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden border border-border">
              <motion.div
                className="h-full rounded-full bg-game-hp-green"
                animate={{ width: `${health}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-[10px] font-display font-bold text-foreground/60 min-w-[24px] text-right">{health}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-1">
            <span className="text-sm">💧</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden border border-border">
              <motion.div
                className="h-full rounded-full bg-game-water-blue"
                animate={{ width: `${water}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-[10px] font-display font-bold text-foreground/60 min-w-[24px] text-right">{water}</span>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 flex flex-col px-4 py-4">
        {/* Bé Măng status */}
        <div className="flex justify-center mb-4">
          <motion.div className="relative">
            <motion.img
              src={beMang}
              alt="Bé Măng"
              className={`w-20 h-20 object-contain drop-shadow-lg transition-all duration-500
                ${beMangState === "tired" ? "saturate-50 brightness-90" : ""}
                ${beMangState === "wilted" ? "grayscale brightness-75" : ""}
              `}
              animate={
                beMangState === "wilted"
                  ? { rotate: [0, -5, 0], y: [0, 3, 0] }
                  : beMangState === "tired"
                  ? { y: [0, -3, 0] }
                  : { y: [0, -6, 0] }
              }
              transition={{ duration: 2, repeat: Infinity }}
            />
            {beMangState === "wilted" && (
              <motion.span
                className="absolute -top-1 -right-1 text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >😰</motion.span>
            )}
            {beMangState === "healthy" && (
              <motion.span
                className="absolute -top-1 -right-1 text-sm"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >😊</motion.span>
            )}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {/* FEEDBACK PHASE */}
          {phase === "feedback" && (
            <motion.div
              key="feedback"
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex-1 flex flex-col">
                <h2 className="font-display text-base font-bold text-foreground mb-1">
                  Cảm nhận của bạn 💭
                </h2>
                <p className="text-xs text-muted-foreground font-body mb-3">
                  Chia sẻ suy nghĩ của bạn sau khi tham quan các làng nghề.
                </p>

                <textarea
                  className="flex-1 min-h-[120px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Điều bạn ấn tượng nhất về NhiLe Team là gì?..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-muted-foreground font-body">{feedback.length}/500</span>
                </div>

                <button
                  onClick={() => setPhase("quiz")}
                  disabled={feedback.length < 10}
                  className="mt-3 w-full bg-primary text-primary-foreground font-display font-bold text-sm py-3 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Tiếp tục thử thách 📝
                </button>
              </div>
            </motion.div>
          )}

          {/* QUIZ PHASE */}
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {/* Progress */}
              <div className="flex items-center gap-2 mb-3">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      i < currentQ
                        ? answers[i] === quizQuestions[i].correct
                          ? "bg-game-hp-green"
                          : "bg-accent"
                        : i === currentQ
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-display font-bold text-muted-foreground">
                  Câu {currentQ + 1}/{quizQuestions.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className={`text-sm ${timeLeft <= 10 ? "text-accent" : "text-muted-foreground"}`}
                    animate={timeLeft <= 10 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >⏱️</motion.span>
                  <span className={`text-sm font-display font-bold ${timeLeft <= 10 ? "text-accent" : "text-foreground"}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card mb-3">
                <h3 className="font-display text-sm font-bold text-foreground leading-relaxed">
                  {quizQuestions[currentQ].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2 flex-1">
                {quizQuestions[currentQ].options.map((opt, i) => {
                  const isCorrect = i === quizQuestions[currentQ].correct;
                  const isSelected = selectedOption === i;

                  return (
                    <motion.button
                      key={i}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-body transition-all
                        ${showResult
                          ? isCorrect
                            ? "bg-game-hp-green/10 border-game-hp-green text-foreground"
                            : isSelected
                            ? "bg-accent/10 border-accent text-foreground"
                            : "bg-card border-border text-muted-foreground"
                          : "bg-card border-border hover:border-primary/30 active:scale-[0.98] text-foreground"
                        }`}
                      onClick={() => handleAnswer(i)}
                      disabled={showResult}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className="font-display font-bold mr-2 text-muted-foreground">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                      {showResult && isCorrect && <span className="ml-2">✅</span>}
                      {showResult && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* RESULTS PHASE */}
          {phase === "results" && (
            <motion.div
              key="results"
              className="flex-1 flex flex-col items-center justify-center text-center px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ type: "spring" }}
              >
                {correctCount >= 4 ? "🎉" : correctCount >= 2 ? "💪" : "🌱"}
              </motion.div>

              <h2 className="font-display text-xl font-bold text-foreground mb-1">
                {correctCount >= 4 ? "Xuất sắc!" : correctCount >= 2 ? "Khá tốt!" : "Tiếp tục cố gắng!"}
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Bạn trả lời đúng <strong>{correctCount}/{quizQuestions.length}</strong> câu hỏi
              </p>

              {/* Stats */}
              <div className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 shadow-card space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs font-body">
                  <span className="text-muted-foreground">💚 Sức khỏe còn lại</span>
                  <span className={`font-display font-bold ${health > 50 ? "text-game-hp-green" : "text-accent"}`}>{health}/100</span>
                </div>
                <div className="flex justify-between items-center text-xs font-body">
                  <span className="text-muted-foreground">💧 Nước còn lại</span>
                  <span className={`font-display font-bold ${water > 50 ? "text-game-water-blue" : "text-accent"}`}>{water}/100</span>
                </div>
                <div className="flex justify-between items-center text-xs font-body">
                  <span className="text-muted-foreground">⏱️ Thời gian trung bình</span>
                  <span className="font-display font-bold text-foreground">~{Math.round(QUIZ_TIME * 0.6)}s/câu</span>
                </div>
              </div>

              {health > 0 ? (
                <button
                  onClick={() => navigate("/chapter4")}
                  className="w-full max-w-xs bg-primary text-primary-foreground font-display font-bold text-sm py-3.5 rounded-xl shadow-float hover:opacity-90 active:scale-[0.97] transition-all"
                >
                  Tiến tới Chương cuối 🏯
                </button>
              ) : (
                <div className="w-full max-w-xs bg-accent/10 border border-accent/20 rounded-xl p-3">
                  <p className="text-xs text-accent font-body">
                    ⚠️ Bé Măng cần được tưới nước! HR sẽ liên hệ hỗ trợ bạn.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chapter3;
