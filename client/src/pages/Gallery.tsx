import { PageHeader } from "@/components/PageHeader";
import { useGalleryItems, useCreateGalleryItem } from "@/hooks/use-gallery";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
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

  // Warm the browser cache for the adjacent slides so navigation feels
  // instant, without eagerly downloading every photo in the set.
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

          {/* Caption — always on top of the image */}
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

// Mounts its children only when scrolled near the viewport so off-screen
// carousels don't download their images eagerly on page load.
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
  const createItem = useCreateGalleryItem();
  const [isOpen, setIsOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  // Organize items into different carousel groups
  const carouselGroups = useMemo(() => {
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

    // Only hide the old DB placeholder entries, not any static photos
    const hiddenIds = new Set([19, 20, 21, 22, 23, 24, 25, 26, 27]);
    const displayItems = [...staticImages, ...(items || [])].filter((item) => !hiddenIds.has(item.id));

    // Split all 38 photos into 6 sections (~6-7 each)
    const group1 = displayItems.slice(0, 7);
    const group2 = displayItems.slice(7, 14);
    const group3 = displayItems.slice(14, 20);
    const group4 = displayItems.slice(20, 26);
    const group5 = displayItems.slice(26, 32);
    const group6 = displayItems.slice(32);

    return [
      { title: "Awards & Banquet", description: "Honoring excellence and celebrating together", items: group1 },
      { title: "Fairway Friends", description: "Teams and foursomes enjoying the course", items: group2 },
      { title: "Course Action", description: "In the swing of things out on the links", items: group3 },
      { title: "Team Spirit", description: "The camaraderie that makes this event special", items: group4 },
      { title: "Clubhouse Memories", description: "After the round, stories and laughter are shared", items: group5 },
      { title: "Lasting Impressions", description: "Unforgettable moments from the Jack Pitts Open", items: group6 },
    ];
  }, [items]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem.mutateAsync({
        imageUrl,
        caption,
        altText: caption
      });
      setIsOpen(false);
      setImageUrl("");
      setCaption("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="relative pt-28 pb-14 md:pt-40 md:pb-28 overflow-hidden bg-[#0d1f0f]">
        <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
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
          

          <div className="space-y-24">
            {carouselGroups.map((group, idx) => {
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
