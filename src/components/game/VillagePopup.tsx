import { useState } from "react";
import { createPortal } from "react-dom";
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
    meetingTime?: string;
  } | null;
  onClose: () => void;
}

export const VillagePopup = ({ village, onClose }: VillagePopupProps) => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const handleJoin = () => {
    setConfirmed(true);
    setTimeout(() => {
      onClose();
      setConfirmed(false);
      navigate("/chapter3");
    }, 1500);
  };

  return createPortal(
    <AnimatePresence>
      {village && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-card border-2 border-game-seal-gold/30 rounded-2xl p-6 md:p-8 shadow-card max-w-md w-full"
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl border-2 shrink-0
                ${village.completed
                  ? "bg-game-seal-gold/20 border-game-seal-gold"
                  : village.current
                  ? "bg-primary/15 border-primary"
                  : "bg-muted border-border opacity-60 grayscale"
                }`}>
                <span>{village.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-bold text-foreground">{village.name}</h3>
                <p className="text-sm text-muted-foreground font-body mt-0.5 leading-relaxed">
                  {village.description}
                </p>
              </div>
            </div>

            <div className="mt-5">
              {village.completed ? (
                <div className="bg-game-seal-gold/10 border border-game-seal-gold/30 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">🏅</span>
                  <div>
                    <p className="text-sm font-display font-bold text-game-seal-gold">
                      Hoàn thành! Đã nhận: {village.accessory}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Cảm ơn bạn đã tham gia buổi trải nghiệm! 🎆
                    </p>
                  </div>
                </div>
              ) : village.current ? (
                <div className="space-y-4">
                  <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">🗓️</span>
                      <p className="text-sm font-display font-bold text-foreground">Lịch họp Zoom</p>
                    </div>
                    <p className="text-base font-body font-semibold text-primary">{village.meetingTime || "Đang sắp xếp..."}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 font-body">
                      👩‍💼 HR đồng hành cùng bạn trong suốt buổi tham quan
                    </p>
                  </div>

                  {!confirmed ? (
                    <div className="space-y-3">
                      <p className="text-sm text-center text-muted-foreground font-body">
                        Bé Măng ơi, bạn có muốn tham gia không? 🌱
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={onClose}
                          className="flex-1 bg-muted text-foreground/70 font-display font-bold text-sm py-3 rounded-xl hover:bg-muted/80 active:scale-[0.98] transition-all"
                        >
                          Để sau
                        </button>
                        <button
                          onClick={handleJoin}
                          className="flex-1 bg-primary text-primary-foreground font-display font-bold text-sm py-3 rounded-xl shadow-float hover:opacity-90 active:scale-[0.98] transition-all"
                        >
                          Tham gia! 🎉
                        </button>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      className="bg-game-hp-green/10 border border-game-hp-green/30 rounded-xl p-4 text-center"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <span className="text-3xl">📅</span>
                      <p className="text-sm font-display font-bold text-game-hp-green mt-2">
                        Đã thêm vào lịch! Hẹn gặp bạn tại buổi Zoom 🎊
                      </p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="bg-muted/50 border border-border rounded-xl p-4 flex items-center gap-3">
                  <span className="text-xl">🔒</span>
                  <p className="text-sm text-muted-foreground font-body">
                    Hoàn thành làng trước để mở khóa làng này nhé!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
