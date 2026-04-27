import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Star, BookOpen, Heart, ArrowRight, Quote } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

import img1 from "@assets/img_1682_1768237549327.jpg";
import img2 from "@assets/img_1679_1768237549325.jpg";
import img3 from "@assets/img_1869_1775630718066.jpg";
import img4 from "@assets/img_1867_1775627182910.jpg";
import img5 from "@assets/img_1858_1775630647897.jpg";
import img6 from "@assets/img_1844_1775630634166.jpg";
import img7 from "@assets/img_1856_1775630718068.jpg";
import img8 from "@assets/img_1840_1775630737968.jpg";

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

function FadeInSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const milestones = [
  {
    year: "1965",
    title: "State Champion & Valedictorian",
    body: "Led Trinity High School (Decatur, GA) to the Class A GIA State Championship — throwing two touchdowns, scoring the winning TD, and intercepting a key pass. Graduated at the top of his class.",
    icon: Trophy,
    color: "#c9973a",
  },
  {
    year: "1966",
    title: "GIA All-Star Game MVP",
    body: "Named MVP of the GIA East-West All-Star Game, cementing his reputation as Georgia's premier prep quarterback and attracting attention from programs across the country.",
    icon: Star,
    color: "#1a6b3a",
  },
  {
    year: "1966",
    title: "Michigan State & Big Ten Pioneer",
    body: "Recruited by legendary coach Duffy Daugherty — described as \"the finest quarterback prospect we've ever seen on film\" — Jack became believed to be the first African American from metro Atlanta to play Big Ten football, winning the starting QB position and throwing two TD passes against Notre Dame.",
    icon: BookOpen,
    color: "#c9973a",
  },
  {
    year: "2010",
    title: "Foundation Established",
    body: "Jack Pitts founded the Jack Pitts Health Foundation in West Bloomfield, Michigan, channeling the lessons of his athletic career into a lifelong mission of community health and service.",
    icon: Heart,
    color: "#1a6b3a",
  },
  {
    year: "2015",
    title: "Decatur Athletics Wall of Honor",
    body: "Inducted into the Decatur Athletics Wall of Honor for lifetime contributions to athletics and community — a formal acknowledgment of his lasting impact on the city that shaped him.",
    icon: Trophy,
    color: "#c9973a",
  },
  {
    year: "2024",
    title: "Georgia High School Football Hall of Fame",
    body: "Inducted into the Georgia High School Football Hall of Fame, among 30 honorees celebrated at the College Football Hall of Fame in Atlanta — a crowning recognition of a trailblazing career.",
    icon: Star,
    color: "#1a6b3a",
  },
];

const athleticStats = [
  { value: 56, suffix: "", label: "Career Touchdowns" },
  { value: 24, suffix: "", label: "TDs in First 5 Senior Games" },
  { value: 30, suffix: "+", label: "College Scholarship Offers" },
  { value: 16, suffix: "", label: "Years of Foundation Impact" },
];

const impactStats = [
  { value: 170, suffix: "K+", label: "Dollars Raised for Health Organizations", prefix: "$" },
  { value: 16, suffix: "", label: "Years of Annual Golf Tournaments", prefix: "" },
  { value: 4, suffix: "", label: "Disease Areas Supported", prefix: "" },
];

export default function Story() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-end overflow-hidden bg-[#0d1f0f]"
        data-testid="section-story-hero"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
        />

        {/* Layered photos */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 flex">
          <div className="absolute inset-0 grid grid-cols-3 gap-0 opacity-30">
            <img src={img1} alt="" className="w-full h-full object-cover object-center" />
            <img src={img3} alt="" className="w-full h-full object-cover object-top" />
            <img src={img5} alt="" className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f0f] via-[#0d1f0f]/70 to-[#0d1f0f]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f0f]/60 via-transparent to-[#0d1f0f]/20" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-32 w-full">
          <FadeInSection>
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#c9973a]/40 text-[#c9973a] text-xs font-athletic tracking-[0.2em] uppercase mb-6">
              The Man Behind the Mission
            </span>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f5f0e8] leading-none tracking-tight mb-6">
              JACK<br />
              <span className="text-[#c9973a]">PITTS</span>
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-[#f5f0e8]/80 font-body text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
              Quarterback. Valedictorian. Pioneer. Philanthropist. A story that sits at the intersection of football history and the civil rights movement.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <blockquote className="flex items-start gap-3 max-w-xl">
              <Quote size={24} className="text-[#c9973a] mt-1 flex-shrink-0" />
              <p className="text-[#f5f0e8]/60 font-display text-lg italic leading-relaxed">
                "It Is Not About Us But Those We Do This For"
              </p>
            </blockquote>
          </FadeInSection>
        </motion.div>
      </section>

      {/* ── ATHLETIC STATS BAR ──────────────────────────────────────────── */}
      <section className="bg-[#1a6b3a] py-10" data-testid="section-story-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {athleticStats.map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 0.08}>
                <div data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <p className="font-display font-black text-4xl sm:text-5xl text-[#c9973a] leading-none">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[#f5f0e8]/70 font-athletic text-xs tracking-[0.15em] uppercase mt-2">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ────────────────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] py-24 md:py-32" data-testid="section-story-origin">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <FadeInSection className="order-2 lg:order-1">
              <span className="inline-block px-3 py-1 rounded-full bg-[#1a6b3a]/10 text-[#1a6b3a] text-xs font-athletic tracking-[0.15em] uppercase mb-6">
                Decatur, Georgia — 1965
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0d1f0f] leading-tight mb-6">
                A Trailblazer's<br />
                <span className="text-[#1a6b3a]">Legacy</span>
              </h2>
              <div className="space-y-4 font-body text-[#0d1f0f]/75 text-base leading-relaxed">
                <p>
                  Jack Pitts is more than a former athlete — he is a living symbol of excellence, courage, and community. Growing up in Decatur, Georgia, his extraordinary gifts on the football field opened doors that had previously been closed to Black athletes in the American South.
                </p>
                <p>
                  As quarterback for Trinity High School, Jack led his team to the 1965 Class A GIA State Championship — throwing two touchdowns, scoring the winning touchdown himself, and intercepting a key pass. He graduated as class valedictorian and received more than 30 scholarship offers from universities across the country.
                </p>
                <p>
                  Recruited by Michigan State University under legendary coach Duffy Daugherty — who called Jack <em>"the finest quarterback prospect we've ever seen on film"</em> — he is believed to be the first African American from metro Atlanta to play Big Ten football. His recruitment was part of Coach Daugherty's historic effort to integrate college football.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15} className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3 h-[480px]">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img src={img2} alt="Jack Pitts Foundation event" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f0f]/40 to-transparent" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl">
                    <img src={img4} alt="Foundation activity" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl bg-[#0d1f0f] flex items-center justify-center p-6">
                    <div className="text-center">
                      <p className="font-display font-black text-3xl text-[#c9973a]">56</p>
                      <p className="text-[#f5f0e8]/70 font-athletic text-[10px] tracking-[0.15em] uppercase mt-1">Career TDs</p>
                      <div className="w-8 h-px bg-[#c9973a]/50 mx-auto my-3" />
                      <p className="font-display font-black text-3xl text-[#c9973a]">30<span className="text-xl">+</span></p>
                      <p className="text-[#f5f0e8]/70 font-athletic text-[10px] tracking-[0.15em] uppercase mt-1">Scholarship Offers</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────────── */}
      <section className="bg-[#0d1f0f] py-24 md:py-32" data-testid="section-story-timeline">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-[#c9973a]/30 text-[#c9973a] text-xs font-athletic tracking-[0.2em] uppercase mb-4">
              Milestones
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#f5f0e8] leading-tight">
              A Journey of Firsts
            </h2>
          </FadeInSection>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#1a6b3a]/40 md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                const isLeft = i % 2 === 0;
                return (
                  <FadeInSection key={i} delay={i * 0.08}>
                    <div className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="absolute left-6 md:left-1/2 top-3 w-5 h-5 rounded-full border-2 flex items-center justify-center -translate-x-1/2 z-10"
                        style={{ borderColor: m.color, backgroundColor: "#0d1f0f" }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                      </div>

                      <div className={`pl-16 md:pl-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <div
                          className={`inline-block rounded-2xl p-6 bg-[#f5f0e8]/5 border border-[#f5f0e8]/8 hover:border-[#1a6b3a]/30 transition-colors duration-300 text-left w-full`}
                          data-testid={`milestone-${m.year}-${i}`}
                        >
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${m.color}20` }}>
                              <Icon size={16} style={{ color: m.color }} />
                            </div>
                            <span className="font-athletic text-xs tracking-[0.15em] uppercase" style={{ color: m.color }}>
                              {m.year}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-xl text-[#f5f0e8] mb-2">{m.title}</h3>
                          <p className="font-body text-sm text-[#f5f0e8]/60 leading-relaxed">{m.body}</p>
                        </div>
                      </div>

                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDATION STORY ────────────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] py-24 md:py-32" data-testid="section-story-foundation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeInSection className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1a6b3a]/10 text-[#1a6b3a] text-xs font-athletic tracking-[0.15em] uppercase mb-4">
              The Foundation
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0d1f0f] leading-tight mb-6">
              Turning the Love of Golf<br />
              <span className="text-[#1a6b3a]">Into a Legacy of Health</span>
            </h2>
            <p className="font-body text-[#0d1f0f]/70 text-lg leading-relaxed">
              The Jack Pitts Health Foundation (JPHF) was established to harness the power of community and sport to improve the health and lives of those in need.
            </p>
          </FadeInSection>

          {/* Mission statement */}
          <FadeInSection delay={0.1}>
            <div className="bg-[#0d1f0f] rounded-3xl p-8 md:p-12 mb-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "repeating-linear-gradient(45deg, #1a6b3a 0, #1a6b3a 1px, transparent 0, transparent 50%)",
                backgroundSize: "24px 24px"
              }} />
              <Quote size={32} className="text-[#c9973a] mx-auto mb-6" />
              <h3 className="font-athletic text-xs tracking-[0.2em] uppercase text-[#c9973a] mb-4">Our Mission</h3>
              <p className="font-display font-bold text-2xl sm:text-3xl text-[#f5f0e8] leading-relaxed max-w-3xl mx-auto">
                To provide information, education, and direct services to improve health outcomes for those who need them most — in the locations most accessible to them.
              </p>
            </div>
          </FadeInSection>

          {/* Photo mosaic */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16 h-[320px] md:h-[400px]">
            {[img6, img7, img8, img5].map((src, i) => (
              <FadeInSection key={i} delay={i * 0.07} className="relative rounded-2xl overflow-hidden shadow-lg h-full">
                <img src={src} alt="Foundation event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f0f]/30 to-transparent" />
              </FadeInSection>
            ))}
          </div>

          {/* Impact highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Proven Impact",
                body: "Over $170,000 raised across 16 years of golf tournaments, with funds supporting research, education, and direct services for kidney disease, breast cancer, prostate cancer, and diabetes.",
              },
              {
                icon: Heart,
                title: "Community Health",
                body: "Primary beneficiary is the National Kidney Foundation of Michigan. Also recognized by Sparrow Hospital and the Henry Cancer Center for philanthropic contributions.",
              },
              {
                icon: Star,
                title: "Annual Events",
                body: "Hosts the Jack Pitts Open — a 4-person scramble with cash prizes up to $1,000 — and the James & Martha Bibbs Humanitarian Award Luncheon celebrating community service.",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeInSection key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-8 border border-[#0d1f0f]/8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full" data-testid={`card-impact-${i}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#1a6b3a]/10 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-[#1a6b3a]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#0d1f0f] mb-3">{card.title}</h3>
                    <p className="font-body text-sm text-[#0d1f0f]/65 leading-relaxed">{card.body}</p>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMPACT COUNTERS ─────────────────────────────────────────────── */}
      <section className="bg-[#1a6b3a] py-16" data-testid="section-story-impact">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {impactStats.map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 0.1}>
                <div data-testid={`impact-stat-${i}`}>
                  <p className="font-display font-black text-5xl sm:text-6xl text-[#f5f0e8] leading-none">
                    {stat.prefix}<AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[#f5f0e8]/70 font-athletic text-xs tracking-[0.15em] uppercase mt-3 max-w-[160px] mx-auto">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0d1f0f] py-24" data-testid="section-story-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#f5f0e8] leading-tight mb-6">
              Be Part of the<br />
              <span className="text-[#c9973a]">Legacy</span>
            </h2>
            <p className="font-body text-[#f5f0e8]/65 text-lg leading-relaxed mb-10">
              Join us at the annual Jack Pitts Open and help continue a tradition of excellence, community, and health. Every round played, every dollar raised, carries forward a story worth telling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registration">
                <Button
                  size="lg"
                  className="bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white rounded-full font-bold px-8 shadow-xl shadow-[#1a6b3a]/30 h-14 text-base"
                  data-testid="button-story-register"
                >
                  Register to Play <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/sponsorship">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#f5f0e8]/30 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 rounded-full font-bold px-8 h-14 text-base"
                  data-testid="button-story-sponsor"
                >
                  Become a Sponsor
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
}
