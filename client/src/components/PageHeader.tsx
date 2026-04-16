import { motion } from "framer-motion";
import trophyImg from "@assets/ChatGPT_Image_Mar_8,_2026,_07_29_09_PM_1773071637027.png";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  leftImage?: string;
}

export function PageHeader({ title, subtitle, backgroundImage, leftImage }: PageHeaderProps) {
  const sideImage = leftImage ?? trophyImg;

  return (
    <div className="relative pt-28 pb-14 md:pt-40 md:pb-28 overflow-hidden bg-[#0d1f0f]">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="opacity-[0.04] w-1/2 h-1/2" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex absolute inset-0 items-end justify-end pointer-events-none z-[1]"
      >
        <img
          src={sideImage}
          alt=""
          loading="eager"
          fetchpriority="high"
          className="h-[88%] w-auto max-w-[38%] sm:max-w-[32%] object-contain object-right drop-shadow-2xl sm:-translate-x-[150px]"
        />
      </motion.div>

      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={backgroundImage} alt="Header background" className="w-full h-full object-cover" loading="eager" fetchpriority="high" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-athletic text-[#c9973a] tracking-[0.35em] uppercase text-xs mb-4 block"
        >
          Jack Pitts Health Foundation
        </motion.span>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#f5f0e8] uppercase tracking-tight leading-[0.9]"
          >
            {title}
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="h-[3px] w-20 bg-[#c9973a] mt-4 mb-1 rounded-full"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#f5f0e8]/65 text-sm md:text-base max-w-lg font-body mt-3 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
