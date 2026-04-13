import { useState } from "react";
import { motion } from "framer-motion";
import { StatusBars } from "@/components/game/StatusBars";
import { VillageNode } from "@/components/game/VillageNode";
import { CompletionPanel } from "@/components/game/CompletionPanel";
import { QuoteBar } from "@/components/game/QuoteBar";
import { VillagePopup } from "@/components/game/VillagePopup";
import beMang from "@/assets/be-mang.png";
import worldMap from "@/assets/world-map.jpg";

const villages = [
  { name: "Làng Content", icon: "📝", accessory: "🖌️ Bút Lông", completed: true, current: false, description: "Nơi sáng tạo nội dung, kể chuyện thương hiệu.", position: { top: "72%", left: "18%" } },
  { name: "Làng Media", icon: "🎬", accessory: "🏮 Đèn Lồng", completed: true, current: false, description: "Sản xuất hình ảnh, video và đa phương tiện.", position: { top: "63%", left: "68%" } },
  { name: "Làng Tech", icon: "💻", accessory: "🥁 Trống Đồng", completed: true, current: false, description: "Phát triển công nghệ và giải pháp kỹ thuật số.", position: { top: "52%", left: "25%" } },
  { name: "Làng Design", icon: "🎨", accessory: "👒 Nón Lá", completed: true, current: false, description: "Thiết kế sáng tạo và trải nghiệm người dùng.", position: { top: "43%", left: "72%" } },
  { name: "Làng Marketing", icon: "📊", accessory: "🧣 Khăn Rằn", completed: false, current: true, description: "Chiến lược tiếp thị và phát triển thị trường.", position: { top: "34%", left: "30%" } },
  { name: "Làng HR", icon: "🏛️", accessory: "👞 Guốc Mộc", completed: false, current: false, description: "Nhân sự và văn hoá doanh nghiệp.", position: { top: "24%", left: "65%" } },
  { name: "Làng Finance", icon: "💰", accessory: "📜 Sổ Thông Hành", completed: false, current: false, description: "Tài chính, kế toán và quản trị.", position: { top: "16%", left: "22%" } },
  { name: "Làng Strategy", icon: "🏯", accessory: "🔱 Ấn Trạng Nguyên", completed: false, current: false, description: "Chiến lược phát triển và tầm nhìn dài hạn.", position: { top: "8%", left: "58%" } },
];

const Index = () => {
  const [selectedVillage, setSelectedVillage] = useState<typeof villages[0] | null>(null);
  const completedCount = villages.filter((v) => v.completed).length;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-20 bg-card/90 backdrop-blur-md border-b border-border px-4 py-3"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="font-display text-base font-bold text-foreground leading-tight">
              Hành trình Chép sử 📜
            </h1>
            <p className="text-[10px] text-muted-foreground font-body">
              Mầm non kiến tạo • {completedCount}/8 Làng đã ghé thăm
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs bg-game-scroll-cream border border-game-seal-gold/30 rounded-lg px-2 py-1 font-display font-bold text-foreground/80">
              🍚 Bánh Chưng
            </div>
            <div className="text-xs bg-game-scroll-cream border border-game-seal-gold/30 rounded-lg px-2 py-1 font-display font-bold text-foreground/80">
              ☕ Cà phê
            </div>
          </div>
        </div>
        <StatusBars />
      </motion.header>

      {/* World Map */}
      <div className="flex-1 relative overflow-y-auto">
        <div className="relative" style={{ height: "700px" }}>
          <img
            src={worldMap}
            alt="Bản đồ 8 Làng nghề"
            className="absolute inset-0 w-full h-full object-cover"
            width={1080}
            height={1920}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-background/10" />

          {/* Character */}
          <motion.div
            className="absolute z-20 animate-float"
            style={{ top: "38%", left: "46%" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <img
              src={beMang}
              alt="Bé Măng"
              className="w-24 h-24 object-contain drop-shadow-lg"
              width={512}
              height={640}
            />
            {/* Water dipper icon */}
            <motion.span
              className="absolute -bottom-1 -right-2 text-lg"
              animate={{ rotate: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🥥
            </motion.span>
          </motion.div>

          {/* Village Nodes */}
          {villages.map((village, i) => (
            <VillageNode
              key={village.name}
              {...village}
              index={i}
              onClick={() => setSelectedVillage(village)}
            />
          ))}

          {/* Floating decorations */}
          <motion.span className="absolute animate-float text-2xl" style={{ top: "80%", left: "80%" }}>🐃</motion.span>
          <motion.span className="absolute animate-float-delayed text-xl" style={{ top: "55%", left: "85%" }}>🌳</motion.span>
          <motion.span className="absolute animate-sparkle text-lg" style={{ top: "15%", left: "85%" }}>🛶</motion.span>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="relative z-20 p-4 space-y-3 bg-gradient-to-t from-background via-background to-transparent">
        <CompletionPanel />
        <QuoteBar />
      </div>

      {/* Village Popup */}
      <VillagePopup village={selectedVillage} onClose={() => setSelectedVillage(null)} />
    </div>
  );
};

export default Index;
