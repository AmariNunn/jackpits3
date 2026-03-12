import { Link } from "wouter";
import { Heart, Mail, MapPin } from "lucide-react";
import trophyImg from "@assets/ChatGPT_Image_Mar_8,_2026,_07_29_09_PM_1773071637027.png";

export function Footer() {
  return (
    <footer className="bg-[#0d1f0f] text-[#f5f0e8] pt-10 sm:pt-16 pb-8 relative overflow-hidden">
      {/* Trophy image — large, right side, behind content like the hero */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <img
          src={trophyImg}
          alt=""
          className="h-full w-auto max-w-[38%] object-contain object-right drop-shadow-2xl opacity-40"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 sm:mb-12 border-b border-[#f5f0e8]/10 pb-8 sm:pb-12">
          <p className="text-[#f5f0e8]/80 font-body italic text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto text-center">
            Jack Pitts — Trinity High School Class A GIA State Champion (1965) · Michigan State University ·
            2024 Georgia High School Football Hall of Fame Inductee · Dedicated to the National Kidney Foundation of Michigan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#f5f0e8] mb-1">Jack Pitts</h3>
              <p className="text-[#c9973a] text-sm font-athletic tracking-[0.2em] uppercase">Health Foundation</p>
            </div>
            <p className="text-[#f5f0e8]/80 leading-relaxed max-w-sm font-body">
              Annual Golf Outing benefiting the National Kidney Foundation of Michigan. "It Is Not About Us But Those We Do This For."
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-[#c9973a]">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Event Schedule", href: "/schedule" },
                { label: "Registration Details", href: "/registration" },
                { label: "Photo Gallery", href: "/gallery" },
                { label: "Sponsorship", href: "/sponsorship" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-[#f5f0e8]/80 hover:text-[#f5f0e8] transition-colors cursor-pointer text-sm font-body" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-[#c9973a]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-[#f5f0e8]/80">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <span className="text-sm font-body">
                  P.O. Box 250014<br />
                  West Bloomfield, MI 48323
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[#f5f0e8]/80">
                <Mail className="w-5 h-5 shrink-0" />
                <a href="mailto:jnpitts@comcast.net" className="text-sm hover:text-[#f5f0e8] transition-colors font-body">
                  jnpitts@comcast.net
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[#f5f0e8]/10 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-xs sm:text-sm text-[#f5f0e8]/60 font-body">
          <p>© {new Date().getFullYear()} Jack Pitts Health Foundation. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>for the community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
