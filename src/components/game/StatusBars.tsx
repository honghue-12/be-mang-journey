import { motion } from "framer-motion";

interface StatusBarProps {
  label: string;
  value: number;
  max: number;
  colorClass: string;
  icon: string;
}

const StatusBar = ({ label, value, max, colorClass, icon }: StatusBarProps) => (
  <div className="flex items-center gap-2">
    <span className="text-lg">{icon}</span>
    <div className="flex-1">
      <div className="flex justify-between text-xs font-display font-semibold text-foreground/80 mb-0.5">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden border border-border">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  </div>
);

export const StatusBars = () => (
  <div className="space-y-2">
    <StatusBar label="HP" value={100} max={100} colorClass="bg-game-hp-green" icon="💚" />
    <StatusBar label="Nước" value={100} max={100} colorClass="bg-game-water-blue" icon="💧" />
  </div>
);
