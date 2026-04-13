import { motion, AnimatePresence } from "framer-motion";

interface VillagePopupProps {
  village: {
    name: string;
    icon: string;
    description: string;
    completed: boolean;
    accessory: string;
  } | null;
  onClose: () => void;
}

export const VillagePopup = ({ village, onClose }: VillagePopupProps) => (
  <AnimatePresence>
    {village && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-card border-2 border-game-seal-gold/50 rounded-2xl p-5 shadow-card max-w-sm w-full"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-lg"
          >
            ✕
          </button>

          <div className="text-center">
            <span className="text-4xl block mb-2">{village.icon}</span>
            <h3 className="font-display text-lg font-bold text-foreground">{village.name}</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">{village.description}</p>

            {village.completed ? (
              <div className="mt-4 bg-game-seal-gold/10 border border-game-seal-gold/40 rounded-xl p-3">
                <p className="text-xs font-display font-bold text-game-seal-gold">
                  ✅ Hoàn thành! Đã nhận: {village.accessory}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  "Bạn vừa tạo ra một khoảnh khắc kỳ diệu tại NLT!" 🎆
                </p>
              </div>
            ) : (
              <button
                onClick={onClose}
                className="mt-4 bg-primary text-primary-foreground font-display font-bold text-sm px-6 py-2.5 rounded-xl shadow-float hover:opacity-90 transition-opacity"
              >
                Bắt đầu hành trình 🚀
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
