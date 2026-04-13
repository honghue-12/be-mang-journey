import { motion } from "framer-motion";
import beMangComplete from "@/assets/be-mang-complete.png";

const accessories = [
  { name: "Nón Lá", icon: "👒", collected: true },
  { name: "Khăn Rằn", icon: "🧣", collected: true },
  { name: "Guốc Mộc", icon: "👞", collected: true },
  { name: "Bút Lông", icon: "🖌️", collected: true },
  { name: "Sổ Thông Hành", icon: "📜", collected: false },
  { name: "Trống Đồng", icon: "🥁", collected: false },
  { name: "Đèn Lồng", icon: "🏮", collected: false },
  { name: "Ấn Trạng Nguyên", icon: "🔱", collected: false },
];

export const CompletionPanel = () => {
  const collected = accessories.filter((a) => a.collected).length;

  return (
    <motion.div
      className="bg-card/95 backdrop-blur-md rounded-2xl border border-border p-4 shadow-card"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={beMangComplete}
          alt="Bé Măng hoàn thiện"
          className="w-16 h-16 object-contain"
          loading="lazy"
          width={512}
          height={640}
        />
        <div>
          <h3 className="font-display text-sm font-bold text-foreground">
            Giáp Trạng Nguyên
          </h3>
          <p className="text-xs text-muted-foreground font-body">
            Thu thập đủ 8 vật phẩm để hoàn thành bộ giáp
          </p>
          <div className="flex items-center gap-1 mt-1">
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-game-seal-gold"
                initial={{ width: 0 }}
                animate={{ width: `${(collected / 8) * 100}%` }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
            </div>
            <span className="text-xs font-display font-bold text-game-seal-gold">
              {collected}/8
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {accessories.map((acc, i) => (
          <motion.div
            key={acc.name}
            className={`flex flex-col items-center gap-0.5 p-2 rounded-xl border text-center
              ${acc.collected
                ? "bg-game-seal-gold/10 border-game-seal-gold/40"
                : "bg-muted/50 border-border opacity-50"
              }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.06, type: "spring" }}
          >
            <span className="text-lg">{acc.icon}</span>
            <span className="text-[9px] font-display font-semibold text-foreground/70 leading-tight">
              {acc.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
