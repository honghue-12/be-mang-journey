import { motion } from "framer-motion";

interface VillageNodeProps {
  name: string;
  completed: boolean;
  current: boolean;
  icon: string;
  accessory: string;
  index: number;
  position: { top: string; left: string };
  onClick: () => void;
}

export const VillageNode = ({
  name,
  completed,
  current,
  icon,
  index,
  position,
  onClick,
}: VillageNodeProps) => {
  const isLocked = !completed && !current;

  return (
    <motion.button
      className="absolute flex flex-col items-center gap-0.5 z-10"
      style={{ top: position.top, left: position.left, transform: "translate(-50%, -50%)" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 20 }}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
    >
      {/* Glow ring for current */}
      {current && (
        <motion.div
          className="absolute -inset-3 rounded-full bg-primary/20 blur-md"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Village icon */}
      <div
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 transition-all
          ${completed
            ? "bg-game-seal-gold/20 border-game-seal-gold shadow-village"
            : current
            ? "bg-primary/15 border-primary shadow-float"
            : "bg-card/60 border-border/50 opacity-50 grayscale"
          }`}
      >
        <span className={isLocked ? "opacity-40" : ""}>{icon}</span>
        {completed && (
          <motion.span
            className="absolute -top-1.5 -right-1.5 text-xs bg-game-seal-gold text-white rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: index * 0.08 + 0.3 }}
          >
            ✓
          </motion.span>
        )}
        {isLocked && (
          <span className="absolute -top-1 -right-1 text-xs">🔒</span>
        )}
      </div>

      {/* Label */}
      <span
        className={`font-display text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap
          ${completed
            ? "text-game-seal-gold bg-game-seal-gold/10"
            : current
            ? "text-primary bg-primary/10"
            : "text-muted-foreground bg-card/50"
          }`}
      >
        {name}
      </span>
    </motion.button>
  );
};
