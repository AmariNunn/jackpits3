import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import golfBallImg from "@assets/pngtree-golf-ball-3d-element-png-image_11595208_1775620613342.png";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Schedule from "@/pages/Schedule";
import Registration from "@/pages/Registration";
import Gallery from "@/pages/Gallery";
import Sponsorship from "@/pages/Sponsorship";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  const left = useTransform(spring, (v) => `calc(${v * 100}% - ${v * 32}px)`);
  const rotate = useTransform(spring, [0, 1], [0, 1440]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none" style={{ height: "35px" }}>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a6b3a]" />
      <motion.img
        src={golfBallImg}
        alt=""
        style={{ left, rotate }}
        className="absolute bottom-[3px] w-8 h-8 object-contain drop-shadow-md"
      />
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/registration" component={Registration} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/sponsorship" component={Sponsorship} />
              <Route component={NotFound} />
            </Switch>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
