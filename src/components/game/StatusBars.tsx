import { motion } from "framer-motion";

interface StatusBarProps {
  label: string;
  value: number;
  max: number;
  colorClass: string;
  icon: string;
}

const StatusBar = ({ value, max, colorClass, icon }: StatusBarProps) => (
  <div className="flex items-center gap-1.5 flex-1">
    <span className="text-sm">{icon}</span>
    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden border border-border">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
    <span className="text-[10px] font-display font-bold text-foreground/60 min-w-[28px] text-right">
      {value}
    </span>
  </div>
);

export const StatusBars = () => (
  <div className="flex items-center gap-3">
    <StatusBar label="HP" value={100} max={100} colorClass="bg-game-hp-green" icon="💚" />
    <StatusBar label="Nước" value={100} max={100} colorClass="bg-game-water-blue" icon="💧" />
  </div>
);
