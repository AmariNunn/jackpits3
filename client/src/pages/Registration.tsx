import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import puttingImg from "@assets/Golfer_focused_on_the_perfect_putt_1773071637027.png";

const FORMSPREE_URL = "https://formspree.io/f/xvzvyaqz";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC"
];

interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

interface FormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  entryType: "individual" | "team";
  teamMembers: TeamMember[];
  banquetTickets: string;
  donation: string;
}

const defaultTeamMember = (): TeamMember => ({ name: "", email: "", phone: "" });

const defaultForm: FormData = {
  name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  entryType: "individual",
  teamMembers: [defaultTeamMember(), defaultTeamMember(), defaultTeamMember(), defaultTeamMember()],
  banquetTickets: "0",
  donation: "",
};

function isAfterJuly11() {
  return new Date() > new Date("2026-07-11");
}

function calcTotal(form: FormData): number {
  const late = isAfterJuly11();
  let total = 0;
  if (form.entryType === "individual") {
    total = late ? 150 : 125;
  } else {
    total = late ? 600 : 500;
  }
  const tickets = parseInt(form.banquetTickets || "0", 10) || 0;
  total += tickets * 45;
  const donation = parseFloat(form.donation || "0") || 0;
  total += donation;
  return total;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{msg}</p>;
}

export default function Registration() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const late = isAfterJuly11();
  const total = calcTotal(form);

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function setTeamMember(index: number, field: keyof TeamMember, value: string) {
    setForm(prev => {
      const updated = prev.teamMembers.map((m, i) => i === index ? { ...m, [field]: value } : m);
      return { ...prev, teamMembers: updated };
    });
    setErrors(prev => ({ ...prev, [`team_${index}_${field}`]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<string, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    if (!form.zip.trim()) e.zip = "ZIP is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.entryType === "team") {
      form.teamMembers.forEach((m, i) => {
        if (!m.name.trim()) e[`team_${i}_name`] = "Name required";
        if (!m.email.trim()) e[`team_${i}_email`] = "Email required";
        if (!m.phone.trim()) e[`team_${i}_phone`] = "Phone required";
      });
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload: Record<string, unknown> = {
        _subject: "Golf Outing Registration",
        name: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        phone: form.phone,
        email: form.email,
        entry_type: form.entryType === "individual" ? "Individual ($" + (late ? "150" : "125") + ")" : "Team of Four ($" + (late ? "600" : "500") + ")",
        banquet_non_golfer_tickets: form.banquetTickets,
        banquet_total: "$" + (parseInt(form.banquetTickets || "0") * 45).toFixed(2),
        donation: form.donation ? "$" + form.donation : "None",
        total_amount_due: "$" + total.toFixed(2),
      };
      if (form.entryType === "team") {
        form.teamMembers.forEach((m, i) => {
          payload[`team_member_${i + 1}_name`] = m.name;
          payload[`team_member_${i + 1}_email`] = m.email;
          payload[`team_member_${i + 1}_phone`] = m.phone;
        });
      }
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError((data as { error?: string }).error || "Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <PageHeader
          title="Registration"
          subtitle="Annual Golf Outing · 4-Person Scramble · Cash Prizes Up to $1,000"
          leftImage={puttingImg}
        />
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-[#1a6b3a]/20"
            >
              <div className="w-20 h-20 bg-[#1a6b3a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#1a6b3a]" />
              </div>
              <h2 className="text-3xl font-display font-bold text-[#0d1f0f] mb-3">Registration Submitted!</h2>
              <p className="text-[#0d1f0f]/60 font-body mb-8">Thank you for registering. Please complete your registration by mailing your payment.</p>

              <div className="bg-[#f5f0e8] rounded-xl p-6 text-left mb-6 border border-[#c9973a]/20">
                <h3 className="font-display font-bold text-[#0d1f0f] mb-4">Payment Instructions</h3>
                <p className="text-sm text-[#0d1f0f]/70 font-body mb-3">
                  Make check or money order payable to:
                </p>
                <p className="font-bold text-[#1a6b3a] text-lg font-display mb-4">"Jack Pitts Health Foundation"</p>
                <p className="text-sm text-[#0d1f0f]/70 font-body mb-1">Mail to:</p>
                <div className="bg-white rounded-lg p-3 border border-[#0d1f0f]/10 font-mono text-sm text-[#0d1f0f] mb-4">
                  Jack Pitts Health Foundation<br />
                  P.O. Box 250014<br />
                  West Bloomfield, MI 48325
                </div>
                <p className="text-sm font-bold text-[#0d1f0f] mb-2">Total Amount Due: <span className="text-[#1a6b3a]">${total.toFixed(2)}</span></p>
              </div>

              <div className="bg-white rounded-xl p-6 text-left border border-[#0d1f0f]/10 mb-6">
                <h3 className="font-display font-bold text-[#0d1f0f] mb-3">Questions? Contact Us</h3>
                <div className="space-y-2 text-sm font-body text-[#0d1f0f]/70">
                  <p><strong>Jack Pitts</strong> — (248) 836-8014 · <a href="mailto:tiger.pitts@icloud.com" className="text-[#1a6b3a] hover:underline">tiger.pitts@icloud.com</a></p>
                  <p><strong>Deborah Sudduth</strong> — (517) 974-7796 · <a href="mailto:deborah228@yahoo.com" className="text-[#1a6b3a] hover:underline">deborah228@yahoo.com</a> (alternate payment)</p>
                </div>
              </div>

              <p className="text-xs text-[#0d1f0f]/40 font-body">The Jack Pitts Health Foundation is a 501(c)(3) non-profit organization.</p>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <PageHeader
        title="Registration"
        subtitle="Annual Golf Outing · 4-Person Scramble · Cash Prizes Up to $1,000"
        leftImage={puttingImg}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

            <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#0d1f0f]/10"
              >
                <div className="bg-[#1a6b3a] p-5 sm:p-6 text-center text-white">
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-2 text-white">Entry Pricing</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/70 text-xs font-athletic tracking-wider uppercase mb-1">Individual</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-display font-bold">$125</span>
                        <span className="text-white/70 text-sm">/golfer</span>
                      </div>
                      <p className="text-[#c9973a] text-xs mt-1">$150 after July 11, 2026</p>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <p className="text-white/70 text-xs font-athletic tracking-wider uppercase mb-1">Team of Four</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-display font-bold">$500</span>
                        <span className="text-white/70 text-sm">/team</span>
                      </div>
                      <p className="text-[#c9973a] text-xs mt-1">$600 after July 11, 2026</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-xs text-white/60">Registration Deadline: July 11, 2026</p>
                    <p className="text-xs text-white/50 mt-1">No cash accepted at the course.</p>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {[
                    "18 Holes of Golf with Cart",
                    "Lunch at the Turn",
                    "Cash Prizes",
                    "Awards Banquet",
                    "Prizes for Men & Women",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#1a6b3a]/10 text-[#1a6b3a] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-[#0d1f0f]/80 font-body text-sm">{feature}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-[#0d1f0f]/10">
                    <div className="bg-[#f5f0e8] p-3 rounded-lg border border-[#c9973a]/20">
                      <p className="text-xs font-athletic text-[#0d1f0f]/60 tracking-wider uppercase mb-1">Awards Banquet</p>
                      <p className="text-sm font-display font-bold text-[#0d1f0f]">James & Martha Bibbs Humanitarian Awards Banquet</p>
                      <p className="text-xs text-[#0d1f0f]/50 mt-1">$45/person for non-golfers</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="bg-[#1a6b3a]/5 p-4 rounded-xl border border-[#1a6b3a]/10">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#1a6b3a] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-[#0d1f0f] text-sm">Questions?</h4>
                    <p className="text-xs text-[#0d1f0f]/60 mt-1 font-body">
                      Jack Pitts: <a href="tel:2488368014" className="text-[#1a6b3a]">(248) 836-8014</a><br />
                      <a href="mailto:tiger.pitts@icloud.com" className="text-[#1a6b3a] hover:underline">tiger.pitts@icloud.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-[#0d1f0f]/10 overflow-hidden">
                <div className="bg-[#0d1f0f] px-6 py-5">
                  <h2 className="text-xl font-display font-bold text-white">Online Registration Form</h2>
                  <p className="text-white/70 text-sm font-body mt-1">Complete your registration below — <span className="text-[#c9973a] font-semibold">secure your spot instantly when you pay online.</span></p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8" noValidate>

                  <div>
                    <h3 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="reg-name" className="text-[#0d1f0f]/70 font-body text-sm">Full Name *</Label>
                        <Input
                          id="reg-name"
                          data-testid="input-name"
                          value={form.name}
                          onChange={e => set("name", e.target.value)}
                          placeholder="Your full name"
                          className="mt-1"
                        />
                        <FieldError msg={errors.name} />
                      </div>
                      <div>
                        <Label htmlFor="reg-address" className="text-[#0d1f0f]/70 font-body text-sm">Street Address *</Label>
                        <Input
                          id="reg-address"
                          data-testid="input-address"
                          value={form.address}
                          onChange={e => set("address", e.target.value)}
                          placeholder="123 Main St"
                          className="mt-1"
                        />
                        <FieldError msg={errors.address} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="reg-city" className="text-[#0d1f0f]/70 font-body text-sm">City *</Label>
                          <Input
                            id="reg-city"
                            data-testid="input-city"
                            value={form.city}
                            onChange={e => set("city", e.target.value)}
                            placeholder="City"
                            className="mt-1"
                          />
                          <FieldError msg={errors.city} />
                        </div>
                        <div>
                          <Label htmlFor="reg-state" className="text-[#0d1f0f]/70 font-body text-sm">State *</Label>
                          <Select value={form.state} onValueChange={v => set("state", v)}>
                            <SelectTrigger id="reg-state" data-testid="select-state" className="mt-1">
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                              {US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FieldError msg={errors.state} />
                        </div>
                        <div>
                          <Label htmlFor="reg-zip" className="text-[#0d1f0f]/70 font-body text-sm">ZIP *</Label>
                          <Input
                            id="reg-zip"
                            data-testid="input-zip"
                            value={form.zip}
                            onChange={e => set("zip", e.target.value)}
                            placeholder="ZIP"
                            className="mt-1"
                          />
                          <FieldError msg={errors.zip} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="reg-phone" className="text-[#0d1f0f]/70 font-body text-sm">Phone *</Label>
                          <Input
                            id="reg-phone"
                            data-testid="input-phone"
                            type="tel"
                            value={form.phone}
                            onChange={e => set("phone", e.target.value)}
                            placeholder="(555) 000-0000"
                            className="mt-1"
                          />
                          <FieldError msg={errors.phone} />
                        </div>
                        <div>
                          <Label htmlFor="reg-email" className="text-[#0d1f0f]/70 font-body text-sm">Email *</Label>
                          <Input
                            id="reg-email"
                            data-testid="input-email"
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
                    <h3 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Entry Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {(["individual", "team"] as const).map(type => (
                        <button
                          key={type}
                          type="button"
                          data-testid={`button-entry-${type}`}
                          onClick={() => set("entryType", type)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            form.entryType === type
                              ? "border-[#1a6b3a] bg-[#1a6b3a]/5"
                              : "border-[#0d1f0f]/15 bg-white hover:border-[#1a6b3a]/40"
                          }`}
                        >
                          <p className="font-display font-bold text-[#0d1f0f] text-sm">
                            {type === "individual" ? "Individual" : "Team of Four"}
                          </p>
                          <p className="text-[#1a6b3a] font-bold text-lg font-display">
                            {type === "individual" ? (late ? "$150" : "$125") : (late ? "$600" : "$500")}
                          </p>
                          <p className="text-[#0d1f0f]/50 text-xs font-body">
                            {type === "individual" ? "per golfer" : "4 golfers"}
                          </p>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {form.entryType === "team" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-4">
                            <p className="text-sm font-body text-[#0d1f0f]/60">Enter the details for all 4 team members:</p>
                            {form.teamMembers.map((member, i) => (
                              <div key={i} className="p-4 bg-[#f5f0e8] rounded-xl border border-[#0d1f0f]/10">
                                <p className="font-athletic text-xs tracking-wider uppercase text-[#0d1f0f]/50 mb-3">Team Member {i + 1}</p>
                                <div className="space-y-3">
                                  <div>
                                    <Label className="text-[#0d1f0f]/70 text-xs">Name *</Label>
                                    <Input
                                      data-testid={`input-team-${i}-name`}
                                      value={member.name}
                                      onChange={e => setTeamMember(i, "name", e.target.value)}
                                      placeholder="Full name"
                                      className="mt-1 bg-white"
                                    />
                                    <FieldError msg={errors[`team_${i}_name`]} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <Label className="text-[#0d1f0f]/70 text-xs">Email *</Label>
                                      <Input
                                        data-testid={`input-team-${i}-email`}
                                        type="email"
                                        value={member.email}
                                        onChange={e => setTeamMember(i, "email", e.target.value)}
                                        placeholder="email@example.com"
                                        className="mt-1 bg-white"
                                      />
                                      <FieldError msg={errors[`team_${i}_email`]} />
                                    </div>
                                    <div>
                                      <Label className="text-[#0d1f0f]/70 text-xs">Phone *</Label>
                                      <Input
                                        data-testid={`input-team-${i}-phone`}
                                        type="tel"
                                        value={member.phone}
                                        onChange={e => setTeamMember(i, "phone", e.target.value)}
                                        placeholder="(555) 000-0000"
                                        className="mt-1 bg-white"
                                      />
                                      <FieldError msg={errors[`team_${i}_phone`]} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <h3 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Awards Banquet</h3>
                    <div className="p-4 bg-[#f5f0e8] rounded-xl border border-[#c9973a]/20">
                      <p className="font-display font-bold text-[#0d1f0f] text-sm mb-1">James & Martha Bibbs Humanitarian Awards Banquet</p>
                      <p className="text-xs text-[#0d1f0f]/60 font-body mb-3">$45 per non-golfer ticket</p>
                      <div className="flex items-center gap-3">
                        <Label htmlFor="banquet-tickets" className="text-[#0d1f0f]/70 text-sm font-body whitespace-nowrap">Non-golfer tickets:</Label>
                        <Select value={form.banquetTickets} onValueChange={v => set("banquetTickets", v)}>
                          <SelectTrigger id="banquet-tickets" data-testid="select-banquet-tickets" className="w-24 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                              <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {parseInt(form.banquetTickets) > 0 && (
                          <span className="text-sm font-body text-[#1a6b3a] font-bold">
                            = ${(parseInt(form.banquetTickets) * 45).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Optional Donation</h3>
                    <div className="p-4 bg-[#f5f0e8] rounded-xl border border-[#0d1f0f]/10">
                      <p className="text-xs text-[#0d1f0f]/60 font-body mb-3">Non-Golfer, Non-Sponsor Donation (optional)</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0d1f0f]/50 font-bold">$</span>
                        <Input
                          id="donation"
                          data-testid="input-donation"
                          type="number"
                          min="0"
                          step="1"
                          value={form.donation}
                          onChange={e => set("donation", e.target.value)}
                          placeholder="0.00"
                          className="bg-white max-w-[120px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a6b3a]/5 rounded-xl p-5 border border-[#1a6b3a]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-1">Estimated Total</p>
                        <div className="space-y-1 text-xs text-[#0d1f0f]/50 font-body">
                          <p>{form.entryType === "individual" ? "Individual entry" : "Team of four entry"}: ${form.entryType === "individual" ? (late ? "150" : "125") : (late ? "600" : "500")}.00</p>
                          {parseInt(form.banquetTickets) > 0 && (
                            <p>{form.banquetTickets} banquet ticket{parseInt(form.banquetTickets) > 1 ? "s" : ""}: ${(parseInt(form.banquetTickets) * 45).toFixed(2)}</p>
                          )}
                          {parseFloat(form.donation) > 0 && (
                            <p>Donation: ${parseFloat(form.donation).toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-display font-bold text-[#1a6b3a]" data-testid="text-total">${total.toFixed(2)}</p>
                        <p className="text-xs text-[#1a6b3a]/70 font-body font-semibold">due at registration</p>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700 font-body">{submitError}</p>
                    </div>
                  )}

                  <div className="pt-2 space-y-3">
                    <Button
                      type="submit"
                      data-testid="button-submit-registration"
                      disabled={submitting}
                      className="w-full h-14 text-base font-bold bg-[#c9973a] hover:bg-[#b8862e] text-white shadow-lg tracking-wide uppercase"
                    >
                      {submitting ? "Submitting…" : `Reserve My Spot — Pay $${total.toFixed(2)} Online Now →`}
                    </Button>

                    <div className="bg-[#1a6b3a]/5 rounded-lg px-4 py-3 border border-[#1a6b3a]/10">
                      <p className="text-center text-xs text-[#0d1f0f]/50 font-body leading-relaxed">
                        <span className="font-semibold text-[#0d1f0f]/60">100% Secure · Instant Confirmation · Limited Spots Available</span>
                      </p>
                    </div>

                    <p className="text-center text-[10px] text-[#0d1f0f]/30 font-body leading-snug px-2">
                      Prefer to pay by check? Mail your check payable to <em>Jack Pitts Health Foundation</em> along with a printed copy of your submitted form. Spot is not guaranteed until payment is received. Online payment is recommended for immediate confirmation.
                    </p>

                    <p className="text-center text-xs text-[#0d1f0f]/35 font-body">
                      The Jack Pitts Health Foundation is a 501(c)(3) non-profit organization.
                    </p>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
