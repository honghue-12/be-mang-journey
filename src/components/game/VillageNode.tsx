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
  accessory,
  index,
  position,
  onClick,
}: VillageNodeProps) => (
  <motion.button
    className={`absolute flex flex-col items-center gap-1 z-10 group`}
    style={{ top: position.top, left: position.left }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.12, type: "spring", stiffness: 200 }}
    onClick={onClick}
  >
    {/* Glow ring for completed */}
    {completed && (
      <motion.div
        className="absolute -inset-2 rounded-full bg-game-village-glow/30 blur-md"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}

    {/* Village icon */}
    <div
      className={`relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl border-2 shadow-village transition-all
        ${completed
          ? "bg-game-seal-gold/20 border-game-seal-gold"
          : current
          ? "bg-primary/10 border-primary animate-pulse"
          : "bg-card border-border opacity-70"
        }`}
    >
      <span>{icon}</span>
      {completed && (
        <motion.span
          className="absolute -top-1 -right-1 text-sm"
          initial={{ rotate: -30, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring" }}
        >
          🔱
        </motion.span>
      )}
    </div>

    {/* Label */}
    <span className="font-display text-[10px] font-bold text-foreground bg-card/80 px-2 py-0.5 rounded-full border border-border backdrop-blur-sm whitespace-nowrap shadow-float">
      {name}
    </span>

    {/* Accessory earned */}
    {completed && (
      <span className="text-xs opacity-80">{accessory}</span>
    )}
  </motion.button>
);
