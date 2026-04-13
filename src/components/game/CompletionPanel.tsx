import { motion } from "framer-motion";
import beMangComplete from "@/assets/be-mang-complete.png";

const accessories = [
  { name: "Nón Lá", icon: "👒", collected: true },
  { name: "Khăn Rằn", icon: "🧣", collected: true },
  { name: "Guốc Mộc", icon: "👞", collected: true },
  { name: "Bút Lông", icon: "🖌️", collected: true },
  { name: "Sổ T.Hành", icon: "📜", collected: false },
  { name: "Trống Đồng", icon: "🥁", collected: false },
  { name: "Đèn Lồng", icon: "🏮", collected: false },
  { name: "Ấn T.Nguyên", icon: "🔱", collected: false },
];

export const CompletionPanel = () => {
  const collected = accessories.filter((a) => a.collected).length;

  return (
    <motion.div
      className="bg-card/95 backdrop-blur-md rounded-2xl border border-border p-3 shadow-card"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-2.5">
        <img
          src={beMangComplete}
          alt="Bé Măng hoàn thiện"
          className="w-12 h-12 object-contain"
          loading="lazy"
          width={512}
          height={640}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs font-bold text-foreground">
              Giáp Trạng Nguyên
            </h3>
            <span className="text-[10px] font-display font-bold text-game-seal-gold">
              {collected}/8
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
            <motion.div
              className="h-full rounded-full bg-game-seal-gold"
              initial={{ width: 0 }}
              animate={{ width: `${(collected / 8) * 100}%` }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-1">
        {accessories.map((acc, i) => (
          <motion.div
            key={acc.name}
            className={`flex flex-col items-center gap-0.5 py-1 rounded-lg text-center
              ${acc.collected
                ? "bg-game-seal-gold/10"
                : "opacity-30"
              }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.04, type: "spring" }}
            title={acc.name}
          >
            <span className="text-sm">{acc.icon}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
