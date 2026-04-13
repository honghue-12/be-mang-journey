import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface VillagePopupProps {
  village: {
    name: string;
    icon: string;
    description: string;
    completed: boolean;
    current: boolean;
    accessory: string;
  } | null;
  onClose: () => void;
}

export const VillagePopup = ({ village, onClose }: VillagePopupProps) => {
  if (!village) return null;

  const isLocked = !village.completed && !village.current;
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {village && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center pb-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-card border-2 border-game-seal-gold/30 rounded-2xl p-5 shadow-card max-w-sm w-full"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Drag handle */}
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-3" />

            <div className="flex items-start gap-3">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border-2 shrink-0
                ${village.completed
                  ? "bg-game-seal-gold/20 border-game-seal-gold"
                  : village.current
                  ? "bg-primary/15 border-primary"
                  : "bg-muted border-border opacity-60 grayscale"
                }`}>
                <span>{village.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-bold text-foreground">{village.name}</h3>
                <p className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">
                  {village.description}
                </p>
              </div>
            </div>

            <div className="mt-4">
              {village.completed ? (
                <div className="bg-game-seal-gold/10 border border-game-seal-gold/30 rounded-xl p-3 flex items-center gap-2">
                  <span className="text-lg">🏅</span>
                  <div>
                    <p className="text-xs font-display font-bold text-game-seal-gold">
                      Hoàn thành! Đã nhận: {village.accessory}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      "Bạn vừa tạo ra một khoảnh khắc kỳ diệu tại NLT!" 🎆
                    </p>
                  </div>
                </div>
              ) : village.current ? (
                <button
                  onClick={onClose}
                  className="w-full bg-primary text-primary-foreground font-display font-bold text-sm py-3 rounded-xl shadow-float hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Bắt đầu hành trình 🚀
                </button>
              ) : (
                <div className="bg-muted/50 border border-border rounded-xl p-3 flex items-center gap-2">
                  <span className="text-lg">🔒</span>
                  <p className="text-xs text-muted-foreground font-body">
                    Hoàn thành làng trước để mở khóa làng này nhé!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
