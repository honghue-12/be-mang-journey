import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBars } from "@/components/game/StatusBars";
import { VillageNode } from "@/components/game/VillageNode";
import { QuoteBar } from "@/components/game/QuoteBar";
import { InventoryBag } from "@/components/game/InventoryBag";
import { VillagePopup } from "@/components/game/VillagePopup";
import beMang from "@/assets/be-mang.png";
import worldMap from "@/assets/world-map.jpg";

const villages = [
  { name: "Làng Content", icon: "📝", accessory: "🖌️ Bút Lông", completed: true, current: false, description: "Nơi sáng tạo nội dung, kể chuyện thương hiệu.", position: { top: "85%", left: "22%" }, meetingTime: "Thứ 2, 10:00 - 11:00" },
  { name: "Làng Media", icon: "🎬", accessory: "🏮 Đèn Lồng", completed: true, current: false, description: "Sản xuất hình ảnh, video và đa phương tiện.", position: { top: "74%", left: "72%" }, meetingTime: "Thứ 3, 14:00 - 15:00" },
  { name: "Làng Tech", icon: "💻", accessory: "🥁 Trống Đồng", completed: true, current: false, description: "Phát triển công nghệ và giải pháp kỹ thuật số.", position: { top: "63%", left: "28%" }, meetingTime: "Thứ 4, 09:00 - 10:00" },
  { name: "Làng Design", icon: "🎨", accessory: "👒 Nón Lá", completed: true, current: false, description: "Thiết kế sáng tạo và trải nghiệm người dùng.", position: { top: "52%", left: "75%" }, meetingTime: "Thứ 4, 15:00 - 16:00" },
  { name: "Làng Marketing", icon: "📊", accessory: "🧣 Khăn Rằn", completed: false, current: true, description: "Chiến lược tiếp thị và phát triển thị trường.", position: { top: "41%", left: "30%" }, meetingTime: "Thứ 5, 10:00 - 11:00" },
  { name: "Làng HR", icon: "🏛️", accessory: "👞 Guốc Mộc", completed: false, current: false, description: "Nhân sự và văn hoá doanh nghiệp.", position: { top: "30%", left: "70%" }, meetingTime: "Thứ 5, 14:00 - 15:00" },
  { name: "Làng Finance", icon: "💰", accessory: "📜 Sổ Thông Hành", completed: false, current: false, description: "Tài chính, kế toán và quản trị.", position: { top: "19%", left: "25%" }, meetingTime: "Thứ 6, 09:00 - 10:00" },
  { name: "Làng Strategy", icon: "🏯", accessory: "🔱 Ấn Trạng Nguyên", completed: false, current: false, description: "Chiến lược phát triển và tầm nhìn dài hạn.", position: { top: "8%", left: "60%" }, meetingTime: "Thứ 6, 14:00 - 15:00" },
];

const MAX_VILLAGES = 3;

const Index = () => {
  const [selectedVillage, setSelectedVillage] = useState<typeof villages[0] | null>(null);
  const [joinedVillages, setJoinedVillages] = useState<string[]>(["Content", "Media", "Tech", "Design"]);
  const completedCount = villages.filter((v) => v.completed).length;
  const currentVillage = villages.find((v) => v.current);
  const collectedVillages = villages.filter((v) => v.completed).map(v => v.name.replace("Làng ", ""));

  const canJoinMore = joinedVillages.length < MAX_VILLAGES + villages.filter(v => v.completed).length;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-20 bg-card/95 backdrop-blur-md border-b border-border px-3 py-2"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-sm font-bold text-foreground leading-tight">
              📜 Hành trình phát triển
            </h1>
            <span className="text-[10px] font-display font-bold text-game-seal-gold bg-game-seal-gold/10 px-1.5 py-0.5 rounded-full">
              {completedCount}/8
            </span>
          </div>
          <div className="flex items-center gap-1">
            <InventoryBag collectedVillages={collectedVillages} />
          </div>
        </div>
        <StatusBars />
      </motion.header>

      {/* World Map */}
      <div className="flex-1 relative overflow-y-auto">
        <div className="relative" style={{ height: "720px" }}>
          <img
            src={worldMap}
            alt="Bản đồ 8 Làng nghề"
            className="absolute inset-0 w-full h-full object-cover"
            width={1080}
            height={1920}
          />
          <div className="absolute inset-0 bg-background/5" />

          {/* Character at current village with label */}
          {currentVillage && (
            <motion.div
              className="absolute z-20 flex flex-col items-center"
              style={{
                top: currentVillage.position.top,
                left: currentVillage.position.left,
                transform: "translate(-50%, -100%)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <motion.div
                className="bg-primary/90 text-primary-foreground text-[9px] font-display font-bold px-2 py-0.5 rounded-full mb-1 whitespace-nowrap shadow-float"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                📍 Bạn đang ở đây
              </motion.div>
              <motion.img
                src={beMang}
                alt="Bé Măng"
                className="w-16 h-16 object-contain drop-shadow-lg"
                width={512}
                height={640}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}

          {/* Village Nodes */}
          {villages.map((village, i) => (
            <VillageNode
              key={village.name}
              {...village}
              index={i}
              onClick={() => setSelectedVillage(village)}
            />
          ))}

          {/* Decorations */}
          <span className="absolute text-xl opacity-60" style={{ top: "90%", left: "82%" }}>🐃</span>
          <span className="absolute text-lg opacity-40" style={{ top: "45%", left: "90%" }}>🌳</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-20 px-3 pb-3 pt-1 space-y-2 bg-gradient-to-t from-background via-background/95 to-transparent">
        <QuoteBar />
      </div>

      {/* Village Popup */}
      <VillagePopup village={selectedVillage} onClose={() => setSelectedVillage(null)} />
    </div>
  );
};

export default Index;
