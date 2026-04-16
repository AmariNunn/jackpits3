import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Award, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";

import img1 from "@assets/img_1679_1768237549325.jpg";
import img2 from "@assets/img_1682_1768237549327.jpg";
import trophyRaise from "@assets/ChatGPT_Image_Mar_8,_2026,_07_29_09_PM_1773071637027.png";
import celebration from "@assets/Golfer's_winning_moment_in_anime_style_1773071637027.png";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const awards = [
  { year: "1965", title: "State Championship MVP", desc: "Class A GIA State Championship — led Trinity High School to victory as starting quarterback and class valedictorian." },
  { year: "1966", title: "All-Star Game MVP", desc: "GIA East-West All-Star Game MVP — showcasing elite talent on Georgia's biggest prep stage." },
  { year: "2015", title: "Wall of Honor Inductee", desc: "Decatur Athletics Wall of Honor — honored for lifetime contributions to athletics and community." },
  { year: "2024", title: "Hall of Fame Inductee", desc: "Georgia High School Football Hall of Fame — inducted at the College Football Hall of Fame in Atlanta." },
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div ref={containerRef} className="flex flex-col w-full overflow-x-hidden relative">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1f0f]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

        <motion.div
          style={{ y: y1 }}
          className="absolute top-[12%] left-[3%] w-60 h-80 rounded-xl overflow-hidden shadow-2xl z-0 hidden border-4 border-white/10 rotate-[-6deg]"
        >
          <img src={img1} className="w-full h-full object-cover" alt="Foundation Activity" />
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] left-[8%] w-48 h-64 rounded-xl overflow-hidden shadow-2xl z-0 hidden border-4 border-white/10 rotate-[4deg]"
        >
          <img src={img2} className="w-full h-full object-cover" alt="Golf Event" />
        </motion.div>

        <div className="relative w-full min-h-screen py-24 pt-28 md:py-32 flex items-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 right-0 flex items-center justify-end pointer-events-none"
          >
            <div className="relative w-full h-full flex items-center justify-end pr-0 md:pr-8 lg:pr-16">
              <img
                src={trophyRaise}
                alt="Jack Pitts raising trophy"
                loading="eager"
                fetchPriority="high"
                className="w-[45%] sm:w-2/3 md:w-1/2 lg:w-1/2 h-auto object-contain animate-float drop-shadow-2xl"
                data-testid="img-hero-trophy"
              />
              <div className="absolute inset-0 bg-[#1a6b3a]/20 rounded-3xl -z-10 blur-3xl opacity-50" />
            </div>
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-2xl pr-[47%] sm:pr-0"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-5 py-2 rounded-full bg-[#c9973a]/20 text-[#c9973a] border border-[#c9973a]/30 text-xs font-athletic tracking-[0.3em] uppercase mb-6 md:mb-8"
                data-testid="badge-established"
              >
                Est. 2010
              </motion.span>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-display font-black text-[#f5f0e8] mb-1 leading-[0.85] uppercase tracking-tight">
                Jack<br />Pitts
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-display font-bold text-[#f5f0e8] mb-2 uppercase tracking-widest leading-tight">
                Health Foundation
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#c9973a] mb-4 md:mb-5 uppercase tracking-wide leading-tight">
                Annual Golf Outing
              </p>
              <p className="text-sm font-bold text-[#f5f0e8] mb-8 md:mb-10 max-w-lg font-athletic tracking-[0.2em] uppercase">
                Benefiting the National Kidney Foundation of Michigan
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <Link href="/registration">
                  <Button size="lg" className="w-full sm:w-auto bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white px-8 sm:px-10 h-12 sm:h-14 rounded-full text-base sm:text-lg font-bold shadow-xl border-0" data-testid="button-register-hero">
                    Register Now
                  </Button>
                </Link>
                <Link href="/sponsorship">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#c9973a]/40 text-[#c9973a] hover:bg-[#c9973a]/10 px-8 sm:px-10 h-12 sm:h-14 rounded-full text-base sm:text-lg font-bold transition-all duration-500" data-testid="button-sponsorship-hero">
                    Sponsorship
                  </Button>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 md:mt-12 inline-flex items-center gap-3 bg-[#1a6b3a]/30 backdrop-blur-sm px-5 sm:px-6 py-3 rounded-full border border-[#1a6b3a]/40"
                data-testid="badge-impact"
              >
                <Trophy className="w-5 h-5 text-[#c9973a]" />
                <span className="text-[#f5f0e8] font-athletic tracking-widest text-xs sm:text-sm uppercase">16+ Years of Impact</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-7 h-12 border-2 border-[#f5f0e8]/20 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#c9973a] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-[#f5f0e8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-athletic text-[#c9973a] tracking-[0.4em] uppercase text-sm mb-4 block">The Legend</span>
              <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display italic text-[#0d1f0f] leading-snug mb-4 md:mb-6 border-l-4 border-[#c9973a] pl-4 sm:pl-6">
                "The finest quarterback prospect we've ever seen on film"
              </blockquote>
              <p className="text-[#0d1f0f]/60 font-body text-xs sm:text-sm uppercase tracking-widest mb-6 md:mb-8">
                — Duffy Daugherty, Michigan State Head Coach
              </p>
              <div className="space-y-4 md:space-y-6 text-[#0d1f0f]/80 font-body leading-relaxed text-base md:text-lg">
                <p>
                  In 1965, Jack Pitts led Trinity High School (Decatur, GA) to the Class A GIA State Championship —
                  throwing two touchdowns, scoring the winning TD, and intercepting a key pass in the title game.
                  He was also valedictorian of his graduating class, receiving more than 30 scholarship offers from major universities across the country.
                </p>
                <p>
                  Recruited by legendary Michigan State coach Duffy Daugherty, Jack is believed to be the first
                  African American from metro Atlanta to play Big Ten football. His journey sits at the intersection
                  of football history and the civil rights movement — a trailblazer who proved talent transcends racial barriers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative flex justify-center"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] w-[70%]">
                <img
                  src="https://lh3.googleusercontent.com/d/1edNQpYS1FWQVptB2PfV4lVVdly4oLmqi"
                  alt="Jack Pitts with trophy"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  data-testid="img-legend-trophy"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-[#1a6b3a] p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border-4 sm:border-8 border-[#f5f0e8]"
              >
                <p className="text-white text-3xl sm:text-5xl font-display font-bold mb-1">16+</p>
                <p className="text-white/80 font-athletic tracking-widest uppercase text-[10px] sm:text-xs">Years of Impact</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-20 bg-[#1a6b3a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"/%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
            {[
              { value: 56, suffix: "", label: "Career Touchdowns" },
              { value: 19, suffix: "-14", label: "Championship Victory" },
              { value: 30, suffix: "+", label: "Scholarship Offers" },
              { value: 16, suffix: "+", label: "Years of Impact" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center`}
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="text-3xl sm:text-4xl md:text-6xl font-athletic text-white mb-1 sm:mb-2">
                  {stat.suffix === "-14" ? (
                    <><AnimatedCounter end={stat.value} />{stat.suffix}</>
                  ) : (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  )}
                </span>
                <span className="text-[#f5f0e8]/60 text-[10px] sm:text-xs font-athletic tracking-[0.15em] sm:tracking-[0.2em] uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="font-athletic text-[#c9973a] tracking-[0.4em] uppercase text-sm mb-3 md:mb-4 block">Honors & Recognition</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#0d1f0f]">Awards & Milestones</h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#c9973a]/20 -translate-y-1/2" />
            <div className="md:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-[#c9973a]/20" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                  data-testid={`award-card-${award.year}`}
                >
                  <div className="hidden md:flex justify-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-[#c9973a] border-4 border-[#f5f0e8] shadow-md z-10 relative" />
                  </div>
                  <div className="md:hidden absolute left-6 top-2 w-4 h-4 rounded-full bg-[#c9973a] border-4 border-[#f5f0e8] shadow-md z-10 -translate-x-1/2" />

                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-t-4 border-[#c9973a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group md:ml-0 ml-12">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <Award className="w-5 h-5 text-[#c9973a]" />
                      <span className="font-athletic text-3xl sm:text-4xl text-[#1a6b3a]">{award.year}</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0d1f0f] mb-2 sm:mb-3">{award.title}</h3>
                    <p className="text-[#0d1f0f]/60 font-body text-sm leading-relaxed">{award.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-[#1a6b3a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z\" fill=\"%23ffffff\" fill-opacity=\"1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="font-athletic text-[#c9973a] tracking-[0.4em] uppercase text-sm mb-4 md:mb-6 block">A Catalyst for Change</span>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic text-[#f5f0e8] leading-snug max-w-4xl mx-auto mb-4 px-2">
              "It Is Not About Us But Those We Do This For"
            </blockquote>
            <p className="text-[#f5f0e8]/60 font-athletic tracking-widest uppercase text-xs sm:text-sm">— Jack Pitts Health Foundation</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:order-last shrink-0"
            >
              <img
                src={celebration}
                alt="Jack Pitts celebration"
                className="w-36 sm:w-44 lg:w-48 max-w-[200px] animate-float drop-shadow-xl"
                data-testid="img-celebration"
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-[#f5f0e8]/80 font-body leading-relaxed text-base md:text-lg">
                  The Jack Pitts Health Foundation has raised more than $170,000 for health organizations
                  over 16 years of golf tournaments — supporting the National Kidney Foundation of Michigan
                  and other vital organizations dedicated to research, education, and direct community services.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-[#f5f0e8]/80 font-body leading-relaxed text-base md:text-lg">
                  The Foundation's annual golf outing — a 4-person scramble with cash prizes up to $1,000 —
                  has been recognized with plaques in the lobbies of Sparrow Hospital and the Henry Cancer Center
                  for its philanthropic contributions to the community.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-[#f5f0e8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1a6b3a]/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 md:mb-16">
            <span className="font-athletic text-[#c9973a] tracking-[0.4em] uppercase text-sm mb-3 md:mb-4 block">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0d1f0f] mb-4 md:mb-6">
              Turning the Love of Golf<br className="hidden sm:block" /> Into a Legacy of Health
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#0d1f0f]/60 max-w-3xl mx-auto font-body leading-relaxed">
              The Jack Pitts Health Foundation delivers information, education, and direct services that help
              improve health outcomes for those who need them most, wherever support is most accessible.
              Our annual golf outing powers this mission, with proceeds benefiting the National Kidney Foundation
              of Michigan and many others in need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: "⛳", title: "4-Person Scramble", desc: "Compete in our signature scramble format with cash prizes up to $1,000 and a chance to be part of something bigger than golf." },
              { icon: "🤝", title: "Community Impact", desc: "More than $170,000 raised over 16 years — benefiting the National Kidney Foundation of Michigan and other organizations serving those in need." },
              { icon: "🏆", title: "Legacy of Excellence", desc: "Named MVP, State Champion, valedictorian, and Big Ten trailblazer — Jack Pitts' legacy drives every event we host." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#0d1f0f] mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-[#0d1f0f]/60 font-body leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 md:mt-16 text-center"
          >
            <Link href="/registration">
              <Button size="lg" className="w-full sm:w-auto bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white px-8 sm:px-10 h-12 sm:h-14 rounded-full text-base sm:text-lg font-bold shadow-xl" data-testid="button-register-bottom">
                Join Us This Year <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
