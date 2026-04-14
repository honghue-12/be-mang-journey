import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const accessories = [
  { name: "Nón Lá", icon: "👒", village: "Content" },
  { name: "Đèn Lồng", icon: "🏮", village: "Media" },
  { name: "Trống Đồng", icon: "🥁", village: "Tech" },
  { name: "Bút Lông", icon: "🖌️", village: "Design" },
  { name: "Khăn Rằn", icon: "🧣", village: "Marketing" },
  { name: "Guốc Mộc", icon: "👞", village: "HR" },
  { name: "Sổ T.Hành", icon: "📜", village: "Finance" },
  { name: "Ấn T.Nguyên", icon: "🔱", village: "Strategy" },
];

interface InventoryBagProps {
  collectedVillages: string[];
}

export const InventoryBag = ({ collectedVillages }: InventoryBagProps) => {
  const [open, setOpen] = useState(false);
  const collected = accessories.filter((a) => collectedVillages.includes(a.village));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative bg-card border border-border rounded-xl px-2 py-1.5 active:scale-95 transition-transform"
      >
        <span className="text-lg">🎒</span>
        {collected.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-game-seal-gold text-[9px] font-display font-bold text-background flex items-center justify-center">
            {collected.length}
          </span>
        )}
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-50 flex items-start justify-end p-3 pt-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
              <motion.div
                className="relative bg-card border-2 border-game-seal-gold/30 rounded-2xl p-4 shadow-card w-56"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-sm font-bold text-foreground">🎒 Kho vật phẩm</h3>
                  <span className="text-[10px] font-display font-bold text-game-seal-gold bg-game-seal-gold/10 px-1.5 py-0.5 rounded-full">
                    {collected.length}/8
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {accessories.map((acc) => {
                    const isCollected = collectedVillages.includes(acc.village);
                    return (
                      <div
                        key={acc.name}
                        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-center transition-all
                          ${isCollected ? "bg-game-seal-gold/10 border border-game-seal-gold/30" : "opacity-25 border border-border"}`}
                      >
                        <span className="text-lg">{acc.icon}</span>
                        <span className="text-[7px] font-display font-semibold text-foreground/60 leading-tight">{acc.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
