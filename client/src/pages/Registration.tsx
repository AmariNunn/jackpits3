import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Check, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import puttingImg from "@assets/Golfer_focused_on_the_perfect_putt_1773071637027.png";
import trophyImg from "@assets/ChatGPT_Image_Mar_8,_2026,_07_29_09_PM_1773071637027.png";

export default function Registration() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <PageHeader
        title="Registration"
        subtitle="Annual Golf Outing · 4-Person Scramble · Cash Prizes Up to $1,000"
        leftImage={puttingImg}
      />

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#0d1f0f]/10"
            >
              <div className="bg-[#1a6b3a] p-5 sm:p-8 text-center text-white">
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-white">Individual Entry</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-display font-bold">$125</span>
                  <span className="text-white/80 font-body text-sm sm:text-base">/ golfer</span>
                </div>
                <p className="mt-2 text-sm text-[#c9973a] font-athletic tracking-wider bg-[#c9973a]/20 inline-block px-3 py-1 rounded-full">
                  Early Registration: Before July 11, 2026
                </p>
                <div className="mt-2 text-white/60 text-sm font-body">
                  $150 / golfer after July 11, 2026
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm font-athletic tracking-wider text-white/80 mb-1">Team of Four</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-display font-bold">$500</span>
                    <span className="text-white/60 text-sm font-body">/ team (before July 11)</span>
                  </div>
                  <div className="text-white/50 text-xs mt-1 font-body">$600 / team after July 11, 2026</div>
                </div>
              </div>

              <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
                <div className="space-y-4">
                  {[
                    "18 Holes of Golf with Cart",
                    "Lunch at the Turn",
                    "Cash Prizes",
                    "Awards Banquet",
                    "Prizes for Men & Women",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#1a6b3a]/10 text-[#1a6b3a] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-[#0d1f0f]/80 font-body">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f5f0e8] p-4 rounded-xl border border-[#c9973a]/20">
                  <p className="text-sm font-athletic text-[#0d1f0f]/70 tracking-wider uppercase mb-1">Awards Banquet</p>
                  <p className="font-display font-bold text-[#0d1f0f]">James & Martha Bibbs Humanitarian Awards Banquet</p>
                  <p className="text-sm text-[#0d1f0f]/60 font-body mt-1">$45 per person for non-golfers</p>
                </div>

                <div className="pt-6 border-t border-[#0d1f0f]/10">
                  <p className="text-center text-sm text-[#0d1f0f]/50 mb-6 font-body">
                    <strong>Registration Deadline:</strong> July 11, 2026<br/>
                    <em>No cash accepted at the course.</em>
                  </p>
                  <Button className="w-full h-12 text-lg font-bold shadow-lg bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white" data-testid="button-download-form">
                    <Download className="w-5 h-5 mr-2" /> Download Entry Form
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0d1f0f] mb-3 sm:mb-4">How to Register</h2>
                <p className="text-[#0d1f0f]/60 text-base sm:text-lg leading-relaxed font-body">
                  We are keeping it classic. To ensure all proceeds go directly to the cause without processing fees, we are accepting registrations via mail.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9973a]/20 text-[#0d1f0f] font-athletic text-xl flex items-center justify-center shrink-0 border border-[#c9973a]/40">1</div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-[#0d1f0f] mb-2">Download the Form</h4>
                    <p className="text-[#0d1f0f]/60 font-body">Get the official entry form PDF. You can fill it out digitally and print it, or print and fill by hand.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9973a]/20 text-[#0d1f0f] font-athletic text-xl flex items-center justify-center shrink-0 border border-[#c9973a]/40">2</div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-[#0d1f0f] mb-2">Prepare Payment</h4>
                    <p className="text-[#0d1f0f]/60 font-body">Make checks payable to <strong>"Jack Pitts Health Foundation"</strong>.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9973a]/20 text-[#0d1f0f] font-athletic text-xl flex items-center justify-center shrink-0 border border-[#c9973a]/40">3</div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-[#0d1f0f] mb-2">Mail It In</h4>
                    <p className="text-[#0d1f0f]/60 mb-4 font-body">Send your completed form and check to:</p>
                    <div className="bg-[#1a6b3a]/5 p-4 rounded-lg border border-[#1a6b3a]/10 inline-block">
                      <p className="font-mono text-sm text-[#0d1f0f]">
                        Jack Pitts Health Foundation<br/>
                        P.O. Box 250014<br/>
                        West Bloomfield, MI 48325
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl border border-[#c9973a]/20 shadow-lg"
              >
                <h4 className="font-display font-bold text-[#0d1f0f] text-lg mb-4">About the Honoree</h4>
                <div className="flex gap-4 items-start">
                  <img
                    src={puttingImg}
                    alt="Jack Pitts"
                    className="w-20 h-20 rounded-full object-cover object-top border-2 border-[#c9973a]/30 shrink-0"
                    data-testid="img-honoree-avatar"
                  />
                  <p className="text-[#0d1f0f]/60 font-body text-sm leading-relaxed">
                    Jack Pitts — Trinity High School Class A GIA State Champion (1965), Michigan State University athlete, and 2024 Georgia High School Football Hall of Fame Inductee. His foundation continues a legacy of breaking barriers and championing community health.
                  </p>
                </div>
              </motion.div>

              <div className="bg-[#1a6b3a]/5 p-6 rounded-xl border border-[#1a6b3a]/10">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#1a6b3a] mt-1" />
                  <div>
                    <h4 className="font-display font-bold text-[#0d1f0f]">Questions?</h4>
                    <p className="text-sm text-[#0d1f0f]/60 mt-1 font-body">
                      If you have any questions about registration or sponsorship opportunities, please email us at <a href="mailto:jnpitts@comcast.net" className="text-[#1a6b3a] hover:underline">jnpitts@comcast.net</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
