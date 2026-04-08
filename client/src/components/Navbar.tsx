import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import logoUrl from "@assets/JPHF-Logo-PNG2-250_1768237067600.webp";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/schedule", label: "Schedule" },
    { href: "/gallery", label: "Gallery" },
    { href: "/sponsorship", label: "Sponsorship" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f5f0e8]/95 backdrop-blur-lg shadow-lg py-3 border-b border-[#1a6b3a]/10"
          : "bg-transparent py-6"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="cursor-pointer group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative w-12 h-12 md:w-16 md:h-16"
            >
              <img
                src={logoUrl}
                alt="JPHF Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
                data-testid="img-logo"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg md:text-xl leading-none transition-colors duration-500 ${scrolled ? 'text-[#0d1f0f]' : 'text-[#f5f0e8]'}`}>
                Jack Pitts
              </span>
              <span className={`text-[9px] md:text-[10px] font-athletic tracking-[0.15em] uppercase transition-colors duration-500 ${scrolled ? 'text-[#0d1f0f]/60' : 'text-[#f5f0e8]/70'}`}>
                Health Foundation
              </span>
              <span className={`text-[9px] md:text-[10px] font-athletic tracking-[0.12em] uppercase transition-colors duration-500 ${scrolled ? 'text-[#c9973a]' : 'text-[#c9973a]'}`}>
                Annual Golf Outing
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className={`px-4 py-2 text-sm font-body font-medium transition-all duration-300 rounded-full cursor-pointer relative ${
                    location === link.href
                      ? scrolled ? "text-[#1a6b3a] bg-[#1a6b3a]/10" : "text-[#f5f0e8] bg-[#f5f0e8]/10 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]"
                      : scrolled ? "text-[#0d1f0f]/70 hover:text-[#1a6b3a] hover:bg-[#1a6b3a]/5" : "text-[#f5f0e8] hover:text-[#f5f0e8] hover:bg-[#f5f0e8]/10 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]"
                  }`}
                  style={link.label === "Sponsorship" ? { transform: "translateX(140px)" } : undefined}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  <span className="relative z-10">{link.label}</span>
                </motion.span>
              </Link>
            ))}
            <div className="pl-4">
              <Link href="/registration">
                <Button
                  variant="default"
                  className="bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white px-6 rounded-full font-bold shadow-xl shadow-[#1a6b3a]/20"
                  data-testid="button-register-nav"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 focus:outline-none transition-colors ${scrolled ? 'text-[#0d1f0f]' : 'text-[#f5f0e8]'}`}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f5f0e8] border-b border-[#1a6b3a]/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3.5 rounded-xl text-base font-body font-medium transition-colors cursor-pointer ${
                      location === link.href
                        ? "bg-[#1a6b3a]/10 text-[#1a6b3a]"
                        : "text-[#0d1f0f] hover:bg-[#1a6b3a]/5"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/registration">
                  <div onClick={() => setIsOpen(false)}>
                    <Button
                      className="w-full bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white rounded-xl font-bold h-12 shadow-lg"
                      data-testid="button-register-mobile"
                    >
                      Register Now
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
