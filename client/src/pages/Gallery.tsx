import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight, Upload, Camera } from "lucide-react";
import { Fragment, useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGalleryItems, useUploadGalleryPhoto } from "@/hooks/use-gallery";

import img1869 from "@/assets/gallery/img_1869_1775627155323.jpg";
import img1867 from "@/assets/gallery/img_1867_1775627182910.jpg";
import img1782 from "@/assets/gallery/img_1782_1775627297000.jpg";
import img1788 from "@/assets/gallery/img_1788_1775627297001.jpg";
import img1783 from "@/assets/gallery/img_1783_1775627297001.jpg";
import img1787 from "@/assets/gallery/img_1787_1775627297001.jpg";
import img1779 from "@/assets/gallery/img_1779_1775627297001.jpg";
import img1786 from "@/assets/gallery/img_1786_1775627297002.jpg";
import img1785 from "@/assets/gallery/img_1785_1775627297002.jpg";
import img1682 from "@/assets/gallery/img_1682_1775627297002.jpg";
import img1789 from "@/assets/gallery/img_1789_1775627297002.jpg";
import img1793 from "@/assets/gallery/img_1793_1775627297002.jpg";
import img1795 from "@/assets/gallery/img_1795_1775627297003.jpg";
import imgAc603f7b from "@/assets/gallery/ac603f7b-fdad-4ad4-9ece-4d7b05d8bbc3_1775627299254.jpg";
import img1858 from "@/assets/gallery/img_1858_1775630634164.jpg";
import img1729a from "@/assets/gallery/img_1729_1775630634164.jpg";
import img1770a from "@/assets/gallery/img_1770_1775630634164.jpg";
import img1771 from "@/assets/gallery/img_1771_1775630634165.jpg";
import img1712 from "@/assets/gallery/img_1712_1775630634165.jpg";
import img1801 from "@/assets/gallery/img_1801_1775630634165.jpg";
import img1809 from "@/assets/gallery/img_1809_1775630634165.jpg";
import img1820 from "@/assets/gallery/img_1820_1775630634166.jpg";
import img1748 from "@/assets/gallery/img_1748_1775630634166.jpg";
import img1868 from "@/assets/gallery/img_1868_1775630634166.jpg";
import img1844 from "@/assets/gallery/img_1844_1775630634166.jpg";
import img1784 from "@/assets/gallery/img_1784_1775630634167.jpg";
import img1759 from "@/assets/gallery/img_1759_1775630634167.jpg";
import img1867b from "@/assets/gallery/img_1867_1775630634167.jpg";
import img1770b from "@/assets/gallery/img_1770_1775630647896.jpg";
import img1745 from "@/assets/gallery/img_1745_1775630647897.jpg";
import img1732 from "@/assets/gallery/img_1732_1775630647897.jpg";
import img1858b from "@/assets/gallery/img_1858_1775630647897.jpg";
import img1729b from "@/assets/gallery/img_1729_1775630647898.jpg";
import img1656 from "@/assets/gallery/img_1656_1775631232295.jpg";
import img1654 from "@/assets/gallery/img_1654_1775631232296.jpg";
import img1628 from "@/assets/gallery/img_1628_1775631232296.jpg";
import img1632 from "@/assets/gallery/img_1632_1775631232296.jpg";
import img1655 from "@/assets/gallery/img_1655_1775631232298.jpg";

// Teams With Jack — newly added foursomes posing with Jack
import jackTeam01 from "@assets/img_1765_1776699094609.jpg";
import jackTeam02 from "@assets/img_1766_1776699094610.jpg";
import jackTeam03 from "@assets/img_1769_1776699094612.jpg";
import jackTeam04 from "@assets/img_1771_1776699094613.jpg";
import jackTeam05 from "@assets/img_1773_1776699094615.jpg";
import jackTeam06 from "@assets/img_1777_1776699094615.jpg";
import jackTeam07 from "@assets/img_1778_1776699094615.jpg";
import jackTeam08 from "@assets/img_1725_1776699094615.jpg";
import jackTeam09 from "@assets/img_1726_1776699094615.jpg";
import jackTeam10 from "@assets/img_1729_1776699094615.jpg";
import jackTeam11 from "@assets/img_1732_1776699094615.jpg";
import jackTeam12 from "@assets/img_1737_1776699094615.jpg";
import jackTeam13 from "@assets/img_1740_1776699094615.jpg";
import jackTeam14 from "@assets/img_1742_1776699094616.jpg";
import jackTeam15 from "@assets/img_1745_1776699094616.jpg";
import jackTeam16 from "@assets/img_1748_1776699094616.jpg";
import jackTeam17 from "@assets/img_1754_1776699094616.jpg";
import jackTeam18 from "@assets/img_1712_1776699094616.jpg";
import jackTeam19 from "@assets/img_1719_1776699094616.jpg";
import jackTeam20 from "@assets/img_1720_1776699094616.jpg";

// Category names shared across both years
const CATEGORY_NAMES = [
  "Awards & Banquet",
  "Fairway Friends",
  "Course Action",
  "Team Spirit",
  "Clubhouse Memories",
  "Lasting Impressions",
  "Teams With Jack",
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Awards & Banquet": "Honoring excellence and celebrating together",
  "Fairway Friends": "Teams and foursomes enjoying the course",
  "Course Action": "In the swing of things out on the links",
  "Team Spirit": "The camaraderie that makes this event special",
  "Clubhouse Memories": "After the round, stories and laughter are shared",
  "Lasting Impressions": "Unforgettable moments from the Jack Pitts Open",
  "Teams With Jack": "Foursomes and friends posing with Jack on the course",
};

// Carousel component for slides
function Carousel({ items, title, description, eager }: { items: any[]; title: string; description?: string; eager?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  useEffect(() => {
    if (items.length < 2) return;
    const nextIndex = (currentIndex + 1) % items.length;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const toPrefetch = new Set([nextIndex, prevIndex]);
    toPrefetch.delete(currentIndex);
    toPrefetch.forEach((i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = items[i].imageUrl;
    });
  }, [currentIndex, items]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  if (items.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0d1f0f] mb-2">{title}</h2>
        {description && <p className="text-[#0d1f0f]/60 font-body">{description}</p>}
      </div>

      <div className="relative group">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#0d1f0f] shadow-xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentIndex}
              src={items[currentIndex].imageUrl}
              alt={items[currentIndex].caption}
              loading={eager && currentIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </AnimatePresence>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`caption-${currentIndex}`}
            className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 md:p-8 pointer-events-none"
          >
            <div>
              <p className="text-white font-body text-lg md:text-xl">{items[currentIndex].caption}</p>
              <p className="text-white/60 text-sm mt-2">
                {currentIndex + 1} / {items.length}
              </p>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Placeholder card for a category that has no photos yet
function EmptyCategoryCard({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-20">
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0d1f0f] mb-2">{title}</h2>
        {description && <p className="text-[#0d1f0f]/60 font-body">{description}</p>}
      </div>
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#0d1f0f]/5 border-2 border-dashed border-[#0d1f0f]/20 flex items-center justify-center">
        <div className="text-center px-6">
          <Camera size={40} className="mx-auto mb-3 text-[#0d1f0f]/25" />
          <p className="text-[#0d1f0f]/40 font-body text-lg font-medium">Photos coming soon</p>
          <p className="text-[#0d1f0f]/30 font-body text-sm mt-1">2026 tournament photos will appear here</p>
        </div>
      </div>
    </div>
  );
}

function LazyMount({ children, minHeight = 480, rootMargin = "600px" }: { children: React.ReactNode; minHeight?: number; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}

export default function Gallery() {
  const { data: items, isLoading } = useGalleryItems();
  const uploadPhoto = useUploadGalleryPhoto();
  const [isOpen, setIsOpen] = useState(false);
  const [activeYear, setActiveYear] = useState<2025 | 2026>(2026);
  const galleryTopRef = useRef<HTMLDivElement>(null);

  // Upload form state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadCategory, setUploadCategory] = useState(CATEGORY_NAMES[0]);
  const [uploadYear, setUploadYear] = useState<"2025" | "2026">("2026");
  const [uploadAdminKey, setUploadAdminKey] = useState("");
  const [uploadError, setUploadError] = useState("");

  // 2025 carousel groups — static imports split into sections
  const carouselGroups2025 = useMemo(() => {
    const staticImages = [
      { id: -1, imageUrl: img1869, caption: "Celebrating with friends at the banquet" },
      { id: -2, imageUrl: img1867, caption: "Group photo at the awards luncheon" },
      { id: -3, imageUrl: img1782, caption: "Proud winners on the course" },
      { id: -4, imageUrl: img1788, caption: "A memorable group photo on the green" },
      { id: -5, imageUrl: img1783, caption: "More great moments from the outing" },
      { id: -6, imageUrl: img1787, caption: "Smiles and team spirit together" },
      { id: -7, imageUrl: img1779, caption: "Ladies foursome on the course" },
      { id: -8, imageUrl: img1786, caption: "Tournament group at the clubhouse" },
      { id: -9, imageUrl: img1785, caption: "Another strong team on the fairway" },
      { id: -10, imageUrl: img1682, caption: "A full day of golf and community" },
      { id: -11, imageUrl: img1789, caption: "Posing after a great round" },
      { id: -12, imageUrl: img1793, caption: "Friends gathered after play" },
      { id: -13, imageUrl: img1795, caption: "Another winning team photo" },
      { id: -14, imageUrl: imgAc603f7b, caption: "Honorees with their trophies" },
      { id: -15, imageUrl: img1858, caption: "Friends celebrating together indoors" },
      { id: -16, imageUrl: img1729a, caption: "A strong group on the fairway" },
      { id: -17, imageUrl: img1770a, caption: "Another great foursome photo" },
      { id: -18, imageUrl: img1771, caption: "Smiling players on the course" },
      { id: -19, imageUrl: img1712, caption: "Team red on the green" },
      { id: -20, imageUrl: img1801, caption: "Group photo under the evening sky" },
      { id: -21, imageUrl: img1809, caption: "Banquet guest at the tables" },
      { id: -22, imageUrl: img1820, caption: "Seated celebration inside the clubhouse" },
      { id: -23, imageUrl: img1748, caption: "Matching green team on the course" },
      { id: -24, imageUrl: img1868, caption: "Large group pose at the banquet" },
      { id: -25, imageUrl: img1844, caption: "Guests gathered for dinner" },
      { id: -26, imageUrl: img1784, caption: "Purple team on the green" },
      { id: -27, imageUrl: img1759, caption: "Casual team shot on the fairway" },
      { id: -28, imageUrl: img1867b, caption: "Tournament group in the clubhouse" },
      { id: -29, imageUrl: img1770b, caption: "Another bright team photo" },
      { id: -30, imageUrl: img1745, caption: "Ladies in yellow at the course" },
      { id: -31, imageUrl: img1732, caption: "Orange and yellow team group" },
      { id: -32, imageUrl: img1858b, caption: "Indoor award presentation moment" },
      { id: -33, imageUrl: img1729b, caption: "Final group shot on the green" },
      { id: -34, imageUrl: img1656, caption: "Friendly foursome at the end of the day" },
      { id: -35, imageUrl: img1654, caption: "Two friends sharing a laugh by the cart" },
      { id: -36, imageUrl: img1628, caption: "Getting checked in at tournament registration" },
      { id: -37, imageUrl: img1632, caption: "Pure joy — hands up on the fairway" },
      { id: -38, imageUrl: img1655, caption: "Ready for another round" },
    ];

    const hiddenIds = new Set([19, 20, 21, 22, 23, 24, 25, 26, 27]);
    const displayItems = [...staticImages, ...(items || []).filter((i) => (i as any).year === 2025 || !(i as any).year)].filter(
      (item) => !hiddenIds.has(item.id),
    );

    const group1 = displayItems.slice(0, 7);
    const group2 = displayItems.slice(7, 14);
    const group3 = displayItems.slice(14, 20);
    const group4 = displayItems.slice(20, 26);
    const group5 = displayItems.slice(26, 32);
    const group6 = displayItems.slice(32);

    const teamsWithJack = [
      { id: -39, imageUrl: jackTeam01, caption: "Foursome with Jack on the tee box" },
      { id: -40, imageUrl: jackTeam02, caption: "Omega Psi Phi brothers in purple with Jack" },
      { id: -41, imageUrl: jackTeam03, caption: "Green team and the next generation alongside Jack" },
      { id: -42, imageUrl: jackTeam04, caption: "Detroit crew posing with Jack on the green" },
      { id: -43, imageUrl: jackTeam05, caption: "Family foursome sharing the moment with Jack" },
      { id: -44, imageUrl: jackTeam06, caption: "Fraternity brothers gathered around Jack" },
      { id: -45, imageUrl: jackTeam07, caption: "Friends in white and red on the green with Jack" },
      { id: -46, imageUrl: jackTeam08, caption: "Distinguished foursome by the cart with Jack" },
      { id: -47, imageUrl: jackTeam09, caption: "All-green team flanking Jack on the fairway" },
      { id: -48, imageUrl: jackTeam10, caption: "Big smiles from this foursome with Jack" },
      { id: -49, imageUrl: jackTeam11, caption: "Tee-off crew lined up with Jack" },
      { id: -50, imageUrl: jackTeam12, caption: "65 Golf squad standing tall with Jack" },
      { id: -51, imageUrl: jackTeam13, caption: "Young foursome celebrating Jack" },
      { id: -52, imageUrl: jackTeam14, caption: "Three generations on the cart path with Jack" },
      { id: -53, imageUrl: jackTeam15, caption: "Yellow and pink team with Jack on the green" },
      { id: -54, imageUrl: jackTeam16, caption: "Green-shirt foursome with Jack mid-round" },
      { id: -55, imageUrl: jackTeam17, caption: "Friends leaning on putters next to Jack" },
      { id: -56, imageUrl: jackTeam18, caption: "Red team shoulder to shoulder with Jack" },
      { id: -57, imageUrl: jackTeam19, caption: "Foursome from Detroit posing with Jack" },
      { id: -58, imageUrl: jackTeam20, caption: "Spartans green crew gathered with Jack" },
    ];

    return [
      { title: "Awards & Banquet", description: CATEGORY_DESCRIPTIONS["Awards & Banquet"], items: group1 },
      { title: "Fairway Friends", description: CATEGORY_DESCRIPTIONS["Fairway Friends"], items: group2 },
      { title: "Course Action", description: CATEGORY_DESCRIPTIONS["Course Action"], items: group3 },
      { title: "Team Spirit", description: CATEGORY_DESCRIPTIONS["Team Spirit"], items: group4 },
      { title: "Clubhouse Memories", description: CATEGORY_DESCRIPTIONS["Clubhouse Memories"], items: group5 },
      { title: "Lasting Impressions", description: CATEGORY_DESCRIPTIONS["Lasting Impressions"], items: group6 },
      { title: "Teams With Jack", description: CATEGORY_DESCRIPTIONS["Teams With Jack"], items: teamsWithJack },
    ];
  }, [items]);

  // 2026 carousel groups — built from DB items with year=2026, grouped by category
  const carouselGroups2026 = useMemo(() => {
    const items2026 = (items || []).filter((i) => (i as any).year === 2026);
    return CATEGORY_NAMES.map((catName) => {
      const catItems = items2026.filter((i) => (i as any).category === catName);
      return {
        title: catName,
        description: CATEGORY_DESCRIPTIONS[catName],
        items: catItems,
      };
    });
  }, [items]);

  const handleTabSwitch = (year: 2025 | 2026) => {
    setActiveYear(year);
    // Scroll to just below the hero/tabs so you see the first carousel
    setTimeout(() => {
      galleryTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    if (!uploadFile) {
      setUploadError("Please select a photo to upload.");
      return;
    }
    if (!uploadAdminKey) {
      setUploadError("Admin key is required.");
      return;
    }
    const fd = new FormData();
    fd.append("file", uploadFile);
    fd.append("caption", uploadCaption);
    fd.append("altText", uploadCaption);
    fd.append("year", uploadYear);
    fd.append("category", uploadCategory);
    try {
      await uploadPhoto.mutateAsync({ formData: fd, adminKey: uploadAdminKey });
      setIsOpen(false);
      setUploadFile(null);
      setUploadCaption("");
      setUploadCategory(CATEGORY_NAMES[0]);
      setUploadYear("2026");
      setUploadAdminKey("");
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Hero */}
      <div className="relative pt-28 pb-14 md:pt-40 md:pb-28 overflow-hidden bg-[#0d1f0f]">
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#f5f0e8] mb-3 md:mb-4"
          >
            Moments That Matter
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#f5f0e8]/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-body"
          >
            Capturing the spirit of the Jack Pitts Open through the years.
          </motion.p>
        </div>
      </div>

      <section className="py-12 md:py-20 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Year Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-14"
          >
            <div className="inline-flex bg-[#0d1f0f]/8 rounded-2xl p-1.5 gap-1">
              {([2025, 2026] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => handleTabSwitch(yr)}
                  className={`px-7 py-3 rounded-xl font-display font-semibold text-base transition-all duration-200 ${
                    activeYear === yr
                      ? "bg-[#0d1f0f] text-[#f5f0e8] shadow-md"
                      : "text-[#0d1f0f]/60 hover:text-[#0d1f0f]/80 hover:bg-[#0d1f0f]/5"
                  }`}
                >
                  {yr} Photos
                </button>
              ))}
            </div>

            {/* Upload dialog for 2026 (triggered programmatically, no visible button) */}
            {activeYear === 2026 && (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <span className="sr-only" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display">Upload a Photo</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpload} className="space-y-4 mt-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="upload-admin-key">Admin key</Label>
                      <Input
                        id="upload-admin-key"
                        type="password"
                        placeholder="Enter admin key to upload"
                        value={uploadAdminKey}
                        onChange={(e) => setUploadAdminKey(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="upload-file">Photo file</Label>
                      <Input
                        id="upload-file"
                        type="file"
                        accept="image/*,.heic,.heif"
                        onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                        required
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground">HEIC, JPG, PNG and other image formats accepted.</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="upload-caption">Caption</Label>
                      <Input
                        id="upload-caption"
                        placeholder="Describe the photo..."
                        value={uploadCaption}
                        onChange={(e) => setUploadCaption(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="upload-category">Category</Label>
                      <select
                        id="upload-category"
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {CATEGORY_NAMES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="upload-year">Year</Label>
                      <select
                        id="upload-year"
                        value={uploadYear}
                        onChange={(e) => setUploadYear(e.target.value as "2025" | "2026")}
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>

                    {uploadError && (
                      <p className="text-sm text-red-600">{uploadError}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={uploadPhoto.isPending}
                        className="flex-1 bg-[#0d1f0f] hover:bg-[#0d1f0f]/90 text-[#f5f0e8]"
                      >
                        {uploadPhoto.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading…
                          </>
                        ) : (
                          "Upload Photo"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </motion.div>

          {/* Scroll anchor — placed just above carousels */}
          <div ref={galleryTopRef} />

          {/* 2025 Carousels */}
          {activeYear === 2025 && (
            <div className="space-y-24">
              {carouselGroups2025.map((group, idx) => {
                const carousel = (
                  <Carousel
                    items={group.items}
                    title={group.title}
                    description={group.description}
                    eager={idx === 0}
                  />
                );
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {idx === 0 ? carousel : <LazyMount>{carousel}</LazyMount>}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* 2026 Carousels */}
          {activeYear === 2026 && (
            <div className="space-y-24">
              {carouselGroups2026.map((group, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {group.items.length > 0 ? (
                    idx === 0 ? (
                      <Carousel
                        items={group.items}
                        title={group.title}
                        description={group.description}
                        eager
                      />
                    ) : (
                      <LazyMount>
                        <Carousel
                          items={group.items}
                          title={group.title}
                          description={group.description}
                        />
                      </LazyMount>
                    )
                  ) : (
                    <LazyMount>
                      <EmptyCategoryCard
                        title={group.title}
                        description={group.description}
                      />
                    </LazyMount>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {isLoading && (
            <div aria-hidden className="sr-only">
              <Loader2 className="w-12 h-12 animate-spin" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
