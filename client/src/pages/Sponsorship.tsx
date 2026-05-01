import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, AlertCircle, CheckCircle2, Mail, ExternalLink, ArrowLeft, CreditCard, Landmark } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

import celebrationImg from "@assets/Golfer's_winning_moment_in_anime_style_1773071637027.png";

const FORMSPREE_URL = "https://formspree.io/f/xkokjkae";
const ZEFFY_URL = "https://www.zeffy.com/en-US/ticketing/jph-golf-tournament-sponsor";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC"
];

const opportunities = [
  {
    title: "💎 PLATINUM SPONSOR",
    price: "$10,000",
    tier: "Platinum Sponsor ($10,000)",
    description: "The pinnacle of partnership — maximum visibility and recognition across all event channels, with three foursome teams and distinguished sponsor status.",
    features: [
      "Three foursome teams (12 golfers)",
      "Banner and poster placement at the event",
      "Recognition in all event communications and Awards program",
      "Sponsor of community outreach activities",
      "Premier recognition at the Awards Luncheon",
      "Year-round presence on Foundation website"
    ],
    borderColor: "border-t-[#c9973a] border-t-[6px]",
    bgColor: "bg-gradient-to-b from-[#c9973a]/5 to-white",
    badge: "text-[#c9973a] border-[#c9973a]/40"
  },
  {
    title: "🥇 GOLD SPONSOR",
    price: "$5,000",
    tier: "Gold Sponsor ($5,000)",
    description: "A distinguished partnership offering strong brand presence and two foursome teams at this celebrated annual event.",
    features: [
      "Two foursome teams (8 golfers)",
      "Banner and poster placement at the event",
      "Recognition in all event communications and Awards program",
      "Reserved seating at the Awards Luncheon",
      "Listed on Foundation website"
    ],
    borderColor: "border-t-amber-500 border-t-[6px]",
    bgColor: "bg-gradient-to-b from-amber-500/5 to-white",
    badge: "text-amber-600 border-amber-500/40"
  },
  {
    title: "🥈 SILVER SPONSOR",
    price: "$3,000",
    tier: "Silver Sponsor ($3,000)",
    description: "A valued partnership with course signage and full recognition in all event communications and the Awards program.",
    features: [
      "One foursome team (4 golfers)",
      "Signage displayed at the event",
      "Recognition in all event communications and Awards program",
      "Listed on Foundation website"
    ],
    borderColor: "border-t-gray-400 border-t-[6px]",
    bgColor: "bg-gradient-to-b from-gray-100 to-white",
    badge: "text-gray-500 border-gray-400/40"
  },
  {
    title: "🍽️ LUNCH AT THE TURN",
    price: "$2,500",
    tier: "Lunch at the Turn Sponsor ($2,500)",
    description: "Exclusive sponsorship of the signature mid-round luncheon — a memorable moment of hospitality enjoyed by every golfer on the course.",
    features: [
      "One foursome team (4 golfers)",
      "Exclusive signage at The Turn",
      "Recognition at the Awards program",
      "Listed on Foundation website"
    ],
    borderColor: "border-t-[#1a6b3a] border-t-[6px]",
    bgColor: "bg-gradient-to-b from-[#1a6b3a]/5 to-white",
    badge: "text-[#1a6b3a] border-[#1a6b3a]/40"
  },
  {
    title: "🤝 COMMUNITY SPONSOR",
    price: "$250",
    tier: "Community Sponsor ($250)",
    description: "A meaningful expression of community commitment, recognized with gratitude in our event program and announcements.",
    features: [
      "Company name listed in the event program",
      "Listing in the event program",
      "Recognition in event announcements",
      "Certificate of appreciation"
    ],
    borderColor: "border-t-[#0d1f0f]/30 border-t-4",
    bgColor: "bg-white",
    badge: "text-[#0d1f0f]/50 border-[#0d1f0f]/20"
  },
  {
    title: "⛳ HOLE SPONSOR",
    price: "$125",
    tier: "Hole Sponsor ($125)",
    description: "Dedicated tee or hole signage proudly displaying your name and logo at one of the course's finest stations.",
    features: [
      "Dedicated tee or hole signage with name and logo",
      "Listing in the event program",
      "Recognition in event announcements",
    ],
    borderColor: "border-t-[#1a6b3a]/70 border-t-4",
    bgColor: "bg-white",
    badge: "text-[#1a6b3a]/70 border-[#1a6b3a]/30"
  }
];

const TIER_OPTIONS = opportunities.map(o => o.tier);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface SponsorForm {
  tier: string;
  name: string;
  organization: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneHome: string;
  phoneCell: string;
  email: string;
  signageMessage: string;
}

type Step = "form" | "payment-choice" | "zeffy" | "check-confirmed";

const defaultForm: SponsorForm = {
  tier: "",
  name: "",
  organization: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phoneHome: "",
  phoneCell: "",
  email: "",
  signageMessage: "",
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{msg}</p>;
}

export default function Sponsorship() {
  const [form, setForm] = useState<SponsorForm>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SponsorForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");

  function set(field: keyof SponsorForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function openModal(tier: string) {
    setForm(prev => ({ ...defaultForm, tier }));
    setErrors({});
    setSubmitError("");
    setStep("form");
    setModalOpen(true);
  }

  function handleModalClose(open: boolean) {
    setModalOpen(open);
    if (!open) {
      setStep("form");
      setForm(defaultForm);
    }
  }

  function validate(): boolean {
    const e: Partial<Record<keyof SponsorForm, string>> = {};
    if (!form.tier) e.tier = "Please select a sponsorship tier";
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    if (!form.zip.trim()) e.zip = "ZIP is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phoneHome.trim() && !form.phoneCell.trim()) e.phoneHome = "At least one phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitToFormspree(paymentMethod: string) {
    const payload = {
      _subject: "Golf Outing Sponsorship Inquiry",
      sponsorship_tier: form.tier,
      name: form.name,
      organization: form.organization || "N/A",
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      phone_home: form.phoneHome || "N/A",
      phone_cell: form.phoneCell || "N/A",
      email: form.email,
      signage_poster_hole_message: form.signageMessage || "N/A",
      payment_method: paymentMethod,
    };
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error((data as { error?: string }).error || "Submission failed. Please try again.");
    }
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStep("payment-choice");
  }

  async function handleChooseZeffy() {
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitToFormspree("Zeffy Online");
      setStep("zeffy");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleChooseCheck() {
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitToFormspree("Check / Money Order");
      setStep("check-confirmed");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-12 md:pb-20">
      <PageHeader
        title="Sponsorship"
        subtitle="Jack Pitts Health Foundation Annual Golf Outing · Benefiting the National Kidney Foundation of Michigan"
        leftImage={celebrationImg}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg border-l-4 border-[#c9973a] mb-8 md:mb-12"
        >
          <blockquote className="text-lg sm:text-xl md:text-2xl font-display italic text-[#0d1f0f] leading-relaxed">
            "It Is Not About Us But Those We Do This For"
          </blockquote>
          <p className="text-[#0d1f0f]/50 mt-2 sm:mt-3 font-athletic tracking-widest uppercase text-xs sm:text-sm">— Jack Pitts Health Foundation</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {opportunities.map((opportunity, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <Card className={`h-full flex flex-col ${opportunity.borderColor} ${opportunity.bgColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg border-0`} data-testid={`card-sponsorship-${index}`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={`font-athletic tracking-[0.15em] text-xs ${opportunity.badge}`}>
                      {opportunity.title}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-display font-bold text-[#1a6b3a]">
                    {opportunity.price}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-[#0d1f0f]/60 mb-6 leading-relaxed italic font-body text-sm">
                    {opportunity.description}
                  </p>
                  <ul className="space-y-3 flex-1">
                    {opportunity.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm font-body">
                        <Check className="h-4 w-4 text-[#1a6b3a] mr-3 shrink-0" />
                        <span className="text-[#0d1f0f]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-[#0d1f0f]/10">
                    <Button
                      className="w-full bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white"
                      data-testid={`button-select-sponsorship-${index}`}
                      onClick={() => openModal(opportunity.tier)}
                    >
                      Select Sponsorship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 bg-[#1a6b3a]/5 rounded-xl p-5 border border-[#1a6b3a]/10">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-[#1a6b3a] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-bold text-[#0d1f0f] text-sm mb-1">Sponsorship Questions?</h4>
              <p className="text-sm font-body text-[#0d1f0f]/60">
                Contact <strong>Melvin Farmer, Treasurer</strong> at <a href="tel:5173234535" className="text-[#1a6b3a]">517-323-4535</a> or <a href="mailto:tiger.pitts@icloud.com" className="text-[#1a6b3a] hover:underline">tiger.pitts@icloud.com</a><br />
                <strong>Jack Pitts, President</strong> — <a href="tel:2488368014" className="text-[#1a6b3a]">(248) 836-8014</a><br />
                <strong>Deborah Sudduth, Golf Committee Chair</strong> — <a href="tel:5179747796" className="text-[#1a6b3a]">(517) 974-7796</a> or <a href="mailto:deborah228@yahoo.com" className="text-[#1a6b3a] hover:underline">deborah228@yahoo.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="p-0 overflow-hidden max-w-2xl w-[95vw] max-h-[92vh] flex flex-col">
          <DialogTitle className="sr-only">Sponsorship Contact Form</DialogTitle>
          <DialogDescription className="sr-only">Select your sponsorship tier and complete the form to submit your sponsorship inquiry.</DialogDescription>

          <AnimatePresence mode="wait">

            {/* ── STEP 1: INFO FORM ──────────────────────────────────────── */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="bg-[#0d1f0f] px-6 py-5 flex-shrink-0">
                  <h3 className="text-xl font-display font-bold text-white">Sponsorship Inquiry</h3>
                  <p className="text-white/60 text-sm font-body mt-1">Fill in your details, then choose how to pay. Deadline: July 11, 2026</p>
                </div>

                <div className="overflow-y-auto flex-1">
                  <form onSubmit={handleContinue} className="p-6 space-y-8" noValidate>

                    <div>
                      <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Sponsorship Tier</h4>
                      <Select value={form.tier} onValueChange={v => set("tier", v)}>
                        <SelectTrigger data-testid="select-sponsorship-tier" className="w-full">
                          <SelectValue placeholder="Select a sponsorship tier…" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIER_OPTIONS.map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError msg={errors.tier} />
                    </div>

                    <div>
                      <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Contact Information</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="sp-name" className="text-[#0d1f0f]/70 font-body text-sm">Name *</Label>
                            <Input
                              id="sp-name"
                              data-testid="input-sponsor-name"
                              value={form.name}
                              onChange={e => set("name", e.target.value)}
                              placeholder="Your full name"
                              className="mt-1"
                            />
                            <FieldError msg={errors.name} />
                          </div>
                          <div>
                            <Label htmlFor="sp-org" className="text-[#0d1f0f]/70 font-body text-sm">Organization</Label>
                            <Input
                              id="sp-org"
                              data-testid="input-sponsor-organization"
                              value={form.organization}
                              onChange={e => set("organization", e.target.value)}
                              placeholder="Company / Organization"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="sp-address" className="text-[#0d1f0f]/70 font-body text-sm">Address *</Label>
                          <Input
                            id="sp-address"
                            data-testid="input-sponsor-address"
                            value={form.address}
                            onChange={e => set("address", e.target.value)}
                            placeholder="123 Main St"
                            className="mt-1"
                          />
                          <FieldError msg={errors.address} />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="sp-city" className="text-[#0d1f0f]/70 font-body text-sm">City *</Label>
                            <Input
                              id="sp-city"
                              data-testid="input-sponsor-city"
                              value={form.city}
                              onChange={e => set("city", e.target.value)}
                              placeholder="City"
                              className="mt-1"
                            />
                            <FieldError msg={errors.city} />
                          </div>
                          <div>
                            <Label htmlFor="sp-state" className="text-[#0d1f0f]/70 font-body text-sm">State *</Label>
                            <Select value={form.state} onValueChange={v => set("state", v)}>
                              <SelectTrigger id="sp-state" data-testid="select-sponsor-state" className="mt-1">
                                <SelectValue placeholder="State" />
                              </SelectTrigger>
                              <SelectContent>
                                {US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FieldError msg={errors.state} />
                          </div>
                          <div>
                            <Label htmlFor="sp-zip" className="text-[#0d1f0f]/70 font-body text-sm">ZIP *</Label>
                            <Input
                              id="sp-zip"
                              data-testid="input-sponsor-zip"
                              value={form.zip}
                              onChange={e => set("zip", e.target.value)}
                              placeholder="ZIP"
                              className="mt-1"
                            />
                            <FieldError msg={errors.zip} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <Label htmlFor="sp-phone-home" className="text-[#0d1f0f]/70 font-body text-sm">Phone (Home)</Label>
                            <Input
                              id="sp-phone-home"
                              data-testid="input-sponsor-phone-home"
                              type="tel"
                              value={form.phoneHome}
                              onChange={e => set("phoneHome", e.target.value)}
                              placeholder="(555) 000-0000"
                              className="mt-1"
                            />
                            <FieldError msg={errors.phoneHome} />
                          </div>
                          <div>
                            <Label htmlFor="sp-phone-cell" className="text-[#0d1f0f]/70 font-body text-sm">Phone (Cell)</Label>
                            <Input
                              id="sp-phone-cell"
                              data-testid="input-sponsor-phone-cell"
                              type="tel"
                              value={form.phoneCell}
                              onChange={e => set("phoneCell", e.target.value)}
                              placeholder="(555) 000-0000"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sp-email" className="text-[#0d1f0f]/70 font-body text-sm">Email *</Label>
                            <Input
                              id="sp-email"
                              data-testid="input-sponsor-email"
                              type="email"
                              value={form.email}
                              onChange={e => set("email", e.target.value)}
                              placeholder="you@example.com"
                              className="mt-1"
                            />
                            <FieldError msg={errors.email} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Signage / Poster / Hole Message</h4>
                      <Textarea
                        data-testid="textarea-signage-message"
                        value={form.signageMessage}
                        onChange={e => set("signageMessage", e.target.value)}
                        placeholder="Enter the text you'd like displayed on your signage, poster, or hole marker…"
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    <div className="pt-2 space-y-3">
                      <Button
                        type="submit"
                        data-testid="button-continue-to-payment"
                        className="w-full h-14 text-base font-bold bg-[#c9973a] hover:bg-[#b8862e] text-white shadow-lg tracking-wide uppercase"
                      >
                        Continue to Payment →
                      </Button>
                      <p className="text-center text-xs text-[#0d1f0f]/35 font-body">
                        The Jack Pitts Health Foundation is a 501(c)(3) non-profit organization.
                      </p>
                    </div>

                  </form>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: PAYMENT CHOICE ─────────────────────────────────── */}
            {step === "payment-choice" && (
              <motion.div
                key="payment-choice"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="bg-[#0d1f0f] px-6 py-5 flex-shrink-0">
                  <button
                    onClick={() => setStep("form")}
                    className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-body mb-3 transition-colors"
                    data-testid="button-back-to-form"
                  >
                    <ArrowLeft size={14} /> Back to form
                  </button>
                  <h3 className="text-xl font-display font-bold text-white">Choose How to Pay</h3>
                  <p className="text-white/60 text-sm font-body mt-1">Your info is saved. Select a payment method below.</p>
                </div>

                <div className="overflow-y-auto flex-1 p-6">
                  <div className="bg-[#1a6b3a]/5 rounded-xl p-4 border border-[#1a6b3a]/20 mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-athletic tracking-wider uppercase text-[#0d1f0f]/50">Sponsorship Selected</p>
                      <p className="text-sm font-body font-semibold text-[#0d1f0f] mt-0.5">{form.tier}</p>
                      {form.name && <p className="text-xs text-[#0d1f0f]/50 font-body mt-0.5">{form.name}{form.organization ? ` · ${form.organization}` : ""}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <button
                      data-testid="button-choose-zeffy"
                      disabled={submitting}
                      onClick={handleChooseZeffy}
                      className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#1a6b3a]/20 bg-white hover:border-[#1a6b3a] hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#1a6b3a]/10 flex items-center justify-center mb-4 group-hover:bg-[#1a6b3a]/20 transition-colors">
                        <CreditCard size={28} className="text-[#1a6b3a]" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-[#0d1f0f] mb-2">Pay Online</h4>
                      <p className="text-sm text-[#0d1f0f]/60 font-body leading-relaxed mb-3">
                        Secure online payment via Zeffy — no fees, 100% goes to the foundation.
                      </p>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a6b3a] text-white text-xs font-bold tracking-wide uppercase">
                        Pay Now with Zeffy
                      </span>
                    </button>

                    <button
                      data-testid="button-choose-check"
                      disabled={submitting}
                      onClick={handleChooseCheck}
                      className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#c9973a]/20 bg-white hover:border-[#c9973a] hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#c9973a]/10 flex items-center justify-center mb-4 group-hover:bg-[#c9973a]/20 transition-colors">
                        <Landmark size={28} className="text-[#c9973a]" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-[#0d1f0f] mb-2">Pay by Check</h4>
                      <p className="text-sm text-[#0d1f0f]/60 font-body leading-relaxed mb-3">
                        Mail a check or money order to our treasurer. We'll confirm your sponsorship on receipt.
                      </p>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#c9973a] text-white text-xs font-bold tracking-wide uppercase">
                        Mail a Check
                      </span>
                    </button>
                  </div>

                  {submitting && (
                    <p className="text-center text-sm text-[#0d1f0f]/50 font-body animate-pulse">Saving your sponsorship inquiry…</p>
                  )}

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700 font-body">{submitError}</p>
                    </div>
                  )}

                  <p className="text-center text-xs text-[#0d1f0f]/35 font-body mt-4">
                    The Jack Pitts Health Foundation is a 501(c)(3) non-profit organization.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3a: ZEFFY IFRAME ──────────────────────────────────── */}
            {step === "zeffy" && (
              <motion.div
                key="zeffy"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col flex-1 min-h-0 overflow-hidden"
              >
                <div className="px-6 py-4 flex-shrink-0 bg-[#0d1f0f] flex items-center justify-between">
                  <div>
                    <button
                      onClick={() => setStep("payment-choice")}
                      className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-body mb-1 transition-colors"
                      data-testid="button-back-to-payment-choice"
                    >
                      <ArrowLeft size={14} /> Choose different method
                    </button>
                    <h3 className="text-lg font-display font-bold text-white">Pay via Zeffy</h3>
                  </div>
                  <a
                    href={ZEFFY_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-zeffy-new-tab"
                    className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-body transition-colors"
                  >
                    Open in new tab <ExternalLink size={12} />
                  </a>
                </div>

                <div className="flex-1 min-h-0">
                  <iframe
                    src={ZEFFY_URL}
                    title="Zeffy Sponsorship — Jack Pitts Health Foundation Golf Outing"
                    data-testid="iframe-zeffy"
                    className="w-full h-full border-0"
                    style={{ minHeight: "480px" }}
                    allow="payment"
                  />
                </div>

                <div className="px-6 py-3 flex-shrink-0 border-t border-[#0d1f0f]/10 bg-white text-center">
                  <p className="text-xs text-[#0d1f0f]/40 font-body">
                    Having trouble loading?{" "}
                    <a href={ZEFFY_URL} target="_blank" rel="noreferrer" className="text-[#1a6b3a] underline">
                      Open Zeffy directly
                    </a>{" "}
                    · 100% of proceeds support the Jack Pitts Health Foundation.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3b: CHECK CONFIRMED ───────────────────────────────── */}
            {step === "check-confirmed" && (
              <motion.div
                key="check-confirmed"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="p-8 md:p-10 text-center overflow-y-auto"
              >
                <div className="w-20 h-20 bg-[#1a6b3a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#1a6b3a]" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[#0d1f0f] mb-2">Sponsorship Received!</h2>
                <p className="text-[#0d1f0f]/60 font-body mb-8">
                  Thank you{form.name ? `, ${form.name}` : ""}! We've received your inquiry — please mail your payment to confirm your sponsorship.
                </p>

                <div className="bg-[#f5f0e8] rounded-2xl p-6 text-left mb-6 border border-[#c9973a]/20">
                  <h3 className="font-display font-bold text-[#0d1f0f] mb-5 text-lg">How to Send Payment</h3>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-athletic tracking-[0.12em] uppercase text-[#0d1f0f]/40 mb-1">Make check or money order payable to</p>
                      <p className="font-display font-bold text-[#1a6b3a] text-xl">"Jack Pitts Health Foundation"</p>
                    </div>

                    <div>
                      <p className="text-xs font-athletic tracking-[0.12em] uppercase text-[#0d1f0f]/40 mb-2">Mail to — Melvin Farmer, Treasurer</p>
                      <div className="bg-white rounded-xl p-4 border border-[#0d1f0f]/10 font-mono text-sm text-[#0d1f0f] leading-relaxed">
                        Jack Pitts Health Foundation<br />
                        P.O. Box 250014<br />
                        West Bloomfield, MI 48325
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#0d1f0f]/10">
                      <p className="text-xs font-athletic tracking-[0.12em] uppercase text-[#0d1f0f]/40 mb-1">Sponsorship tier</p>
                      <p className="font-display font-bold text-[#0d1f0f]">{form.tier}</p>
                      <p className="text-sm text-[#1a6b3a] font-body mt-1">Deadline: <strong>July 11, 2026</strong></p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 text-left border border-[#0d1f0f]/10 mb-6">
                  <h3 className="font-display font-bold text-[#0d1f0f] mb-3">Payment Questions?</h3>
                  <div className="space-y-1 text-sm font-body text-[#0d1f0f]/70">
                    <p><strong>Melvin Farmer</strong>, Treasurer — <a href="tel:5173234535" className="text-[#1a6b3a]">(517) 323-4535</a></p>
                    <p><strong>Jack Pitts</strong>, President — <a href="tel:2488368014" className="text-[#1a6b3a]">(248) 836-8014</a> · <a href="mailto:tiger.pitts@icloud.com" className="text-[#1a6b3a] hover:underline">tiger.pitts@icloud.com</a></p>
                    <p><strong>Deborah Sudduth</strong>, Golf Committee Chair — <a href="tel:5179747796" className="text-[#1a6b3a]">(517) 974-7796</a> · <a href="mailto:deborah228@yahoo.com" className="text-[#1a6b3a] hover:underline">deborah228@yahoo.com</a></p>
                  </div>
                </div>

                <p className="text-xs text-[#0d1f0f]/40 font-body mb-5">
                  The Jack Pitts Health Foundation is a 501(c)(3) non-profit organization.<br />
                  Sponsorship is not confirmed until payment is received.
                </p>
                <Button
                  onClick={() => handleModalClose(false)}
                  data-testid="button-close-confirmation"
                  className="bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white px-8"
                >
                  Done
                </Button>
              </motion.div>
            )}

          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
