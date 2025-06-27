
'use client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LightPullThemeSwitcherProps = {
  onLightOn: () => void;
};

export function LightPullThemeSwitcher({ onLightOn }: LightPullThemeSwitcherProps) {

    return (
      <div className="relative py-16 p-6 overflow-hidden bg-transparent">
        <motion.div
          drag="y"
          dragDirectionLock
          onDragEnd={(event, info) => {
            if (info.offset.y > 20) { // Require a noticeable pull
              onLightOn();
            }
          }}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
          dragElastic={0.075}
          whileDrag={{ cursor: "grabbing" }}
          className={cn(
            "relative bottom-0 w-8 h-8 rounded-full cursor-grab",
            // "Off" state styles (dark bulb)
            "bg-[radial-gradient(circle_at_center,_#4b5563,_#1f2937,_#000)]",
            "shadow-[0_0_20px_6px_rgba(31,41,55,0.7)]"
          )}
        >
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-[9999px] bg-neutral-700"></div>
        </motion.div>
      </div>
    );
}
