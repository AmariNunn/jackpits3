import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, AlertCircle, CheckCircle2, Users, User, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import puttingImg from "@assets/Golfer_focused_on_the_perfect_putt_1773071637027.png";

const FORMSPREE_URL = "https://formspree.io/f/xkokjkae";
const ZELLE_URL = "https://www.zellepay.com/";

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
  entryType: "individual" | "team" | "banquet";
  teamMembers: TeamMember[];
  banquetTickets: string;
  donation: string;
  paymentStatus: string;
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
  paymentStatus: "",
};

function isAfterJuly11() {
  return new Date() > new Date("2026-07-11");
}

function calcTotal(form: FormData): number {
  const late = isAfterJuly11();
  let total = 0;
  if (form.entryType === "individual") {
    total = late ? 150 : 125;
  } else if (form.entryType === "team") {
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
  const [modalOpen, setModalOpen] = useState(false);

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

  function openModal(entryType: "individual" | "team" | "banquet") {
    setForm({ ...defaultForm, entryType, banquetTickets: entryType === "banquet" ? "1" : "0" });
    setErrors({});
    setSubmitError("");
    setSubmitted(false);
    setModalOpen(true);
  }

  function handleModalClose(open: boolean) {
    setModalOpen(open);
    if (!open && submitted) {
      setSubmitted(false);
      setForm(defaultForm);
    }
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
    if (form.entryType === "banquet" && parseInt(form.banquetTickets) < 1) {
      e.banquetTickets = "Please select at least 1 ticket";
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
      const payload: Record<string, string> = {
        _subject: "Golf Outing Registration",
        name: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        phone: form.phone,
        email: form.email,
        entry_type: form.entryType === "individual"
          ? "Individual ($" + (late ? "150" : "125") + ")"
          : form.entryType === "team"
          ? "Team of Four ($" + (late ? "600" : "500") + ")"
          : "Banquet Only",
        banquet_non_golfer_tickets: form.banquetTickets,
        banquet_total: "$" + (parseInt(form.banquetTickets || "0") * 45).toFixed(2),
        donation: form.donation ? "$" + form.donation : "None",
        total_amount_due: "$" + total.toFixed(2),
        payment_status: form.paymentStatus || "Not yet paid",
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

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <PageHeader
        title="Registration"
        subtitle="Annual Golf Outing · 4-Person Scramble · Cash Prizes Up to $1,000"
        leftImage={puttingImg}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0d1f0f] mb-3">How would you like to participate?</h2>
            <p className="text-[#0d1f0f]/60 font-body max-w-xl mx-auto">Choose your option below and fill out a quick form — it only takes a few minutes.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
          >
            <div className="bg-white rounded-2xl shadow-lg border-t-4 border-t-[#1a6b3a] overflow-hidden flex flex-col">
              <div className="bg-[#1a6b3a] p-5 text-center text-white">
                <User className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h3 className="text-xl font-display font-bold">Individual Golfer</h3>
                <p className="text-white/70 text-sm mt-1 font-body">Just you on the course</p>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-center mb-4">
                  <p className="text-4xl font-display font-bold text-[#1a6b3a]">{late ? "$150" : "$125"}</p>
                  <p className="text-[#0d1f0f]/50 text-sm font-body">per golfer</p>
                  {!late && <p className="text-[#c9973a] text-xs mt-1 font-body">$150 after July 11, 2026</p>}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {["18 Holes of Golf with Cart", "Lunch at the Turn", "Cash Prizes", "Awards Banquet", "Prizes for Men & Women"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-body text-[#0d1f0f]/80">
                      <Check className="w-4 h-4 text-[#1a6b3a] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  data-testid="button-open-individual"
                  className="w-full h-12 text-base font-bold bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white"
                  onClick={() => openModal("individual")}
                >
                  Register as Individual
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-t-4 border-t-[#c9973a] overflow-hidden flex flex-col ring-2 ring-[#c9973a]/30 relative">
              <div className="absolute top-3 right-3">
                <span className="bg-[#c9973a] text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wide uppercase">Best Value</span>
              </div>
              <div className="bg-[#c9973a] p-5 text-center text-white">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h3 className="text-xl font-display font-bold">Team of Four</h3>
                <p className="text-white/80 text-sm mt-1 font-body">Bring your whole crew</p>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-center mb-4">
                  <p className="text-4xl font-display font-bold text-[#c9973a]">{late ? "$600" : "$500"}</p>
                  <p className="text-[#0d1f0f]/50 text-sm font-body">for 4 golfers</p>
                  {!late && <p className="text-[#c9973a] text-xs mt-1 font-body">$600 after July 11, 2026</p>}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {["18 Holes of Golf with Cart", "Lunch at the Turn", "Cash Prizes", "Awards Banquet", "Prizes for Men & Women"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-body text-[#0d1f0f]/80">
                      <Check className="w-4 h-4 text-[#c9973a] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  data-testid="button-open-team"
                  className="w-full h-12 text-base font-bold bg-[#c9973a] hover:bg-[#b8862e] text-white"
                  onClick={() => openModal("team")}
                >
                  Register My Team
                </Button>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="bg-white rounded-xl p-5 shadow border border-[#0d1f0f]/10">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#1a6b3a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-[#0d1f0f] text-sm mb-1">Want to make a donation?</h4>
                  <p className="text-xs text-[#0d1f0f]/60 font-body">You can add an optional donation when you fill out any registration form. Every dollar supports the National Kidney Foundation of Michigan.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a6b3a]/5 rounded-xl p-5 border border-[#1a6b3a]/10">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#1a6b3a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-[#0d1f0f] text-sm mb-1">Questions? We're happy to help.</h4>
                  <p className="text-xs text-[#0d1f0f]/60 font-body">
                    <strong>Jack Pitts</strong>, President — <a href="tel:2488368014" className="text-[#1a6b3a] font-semibold">(248) 836-8014</a><br />
                    <strong>Melvin Farmer</strong>, Treasurer — <a href="tel:5173234535" className="text-[#1a6b3a] font-semibold">(517) 323-4535</a><br />
                    <strong>Deborah Sudduth</strong>, Golf Committee Chair — <a href="tel:5179747796" className="text-[#1a6b3a] font-semibold">(517) 974-7796</a> · <a href="mailto:deborah228@yahoo.com" className="text-[#1a6b3a] hover:underline">deborah228@yahoo.com</a><br />
                    Email: <a href="mailto:tiger.pitts@icloud.com" className="text-[#1a6b3a] hover:underline">tiger.pitts@icloud.com</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <Dialog open={modalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="p-0 overflow-hidden max-w-2xl w-[95vw] max-h-[92vh] flex flex-col">
          <DialogTitle className="sr-only">Registration Form</DialogTitle>
          <DialogDescription className="sr-only">Complete your registration for the Jack Pitts Health Foundation Golf Outing.</DialogDescription>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-10 text-center overflow-y-auto"
            >
              <div className="w-20 h-20 bg-[#1a6b3a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#1a6b3a]" />
              </div>
              <h2 className="text-2xl font-display font-bold text-[#0d1f0f] mb-3">You're Registered!</h2>
              <p className="text-[#0d1f0f]/60 font-body mb-8">Thank you! Your spot is reserved. Please complete your registration by sending payment.</p>

              <div className="bg-[#f5f0e8] rounded-xl p-6 text-left mb-5 border border-[#c9973a]/20">
                <h3 className="font-display font-bold text-[#0d1f0f] mb-3">How to Send Payment</h3>
                <p className="text-sm text-[#0d1f0f]/70 font-body mb-2">Make check or money order payable to:</p>
                <p className="font-bold text-[#1a6b3a] text-lg font-display mb-3">"Jack Pitts Health Foundation"</p>
                <p className="text-sm text-[#0d1f0f]/70 font-body mb-1">Mail to — <strong>Melvin Farmer, Treasurer</strong>:</p>
                <div className="bg-white rounded-lg p-3 border border-[#0d1f0f]/10 font-mono text-sm text-[#0d1f0f] mb-3">
                  Jack Pitts Health Foundation<br />
                  P.O. Box 250014<br />
                  West Bloomfield, MI 48235
                </div>
                <p className="text-xs text-[#0d1f0f]/60 font-body mb-3">For payment questions, contact <strong>Melvin Farmer, Treasurer</strong> at <a href="tel:5173234535" className="text-[#1a6b3a]">(517) 323-4535</a></p>
                <a
                  href={`${ZELLE_URL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a6b3a] px-4 py-2 text-white font-semibold hover:bg-[#155932] transition-colors mb-3"
                  data-testid="button-zelle-registration"
                >
                  Pay via Zelle to 2488368014
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm font-bold text-[#0d1f0f]">Total Due: <span className="text-[#1a6b3a]">${total.toFixed(2)}</span></p>
              </div>

              <div className="bg-white rounded-xl p-5 text-left border border-[#0d1f0f]/10 mb-6">
                <h3 className="font-display font-bold text-[#0d1f0f] mb-2">Questions?</h3>
                <div className="space-y-1 text-sm font-body text-[#0d1f0f]/70">
                  <p><strong>Jack Pitts</strong>, President — <a href="tel:2488368014" className="text-[#1a6b3a]">(248) 836-8014</a> · <a href="mailto:tiger.pitts@icloud.com" className="text-[#1a6b3a] hover:underline">tiger.pitts@icloud.com</a></p>
                  <p><strong>Melvin Farmer</strong>, Treasurer — <a href="tel:5173234535" className="text-[#1a6b3a]">(517) 323-4535</a> <span className="text-[#0d1f0f]/40">(payments)</span></p>
                  <p><strong>Deborah Sudduth</strong>, Golf Committee Chair — <a href="tel:5179747796" className="text-[#1a6b3a]">(517) 974-7796</a> · <a href="mailto:deborah228@yahoo.com" className="text-[#1a6b3a] hover:underline">deborah228@yahoo.com</a></p>
                </div>
              </div>
              <div className="mb-6 flex justify-center">
                <a
                  href={`${ZELLE_URL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a6b3a] px-5 py-3 text-white font-semibold hover:bg-[#155932] transition-colors"
                  data-testid="button-zelle-confirmation"
                >
                  Pay via Zelle to 2488368014
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-[#0d1f0f]/40 font-body mb-4">The Jack Pitts Health Foundation is a 501(c)(3) non-profit organization.</p>
              <Button onClick={() => handleModalClose(false)} className="bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white px-8">
                Close
              </Button>
            </motion.div>
          ) : (
            <>
              <div className={`px-6 py-5 flex-shrink-0 ${form.entryType === "team" ? "bg-[#c9973a]" : form.entryType === "banquet" ? "bg-[#0d1f0f]" : "bg-[#1a6b3a]"}`}>
                <h3 className="text-xl font-display font-bold text-white">
                  {form.entryType === "individual" ? "Individual Registration" : form.entryType === "team" ? "Team of Four Registration" : "Banquet Ticket Registration"}
                </h3>
                <p className="text-white/70 text-sm font-body mt-1">
                  {form.entryType === "banquet" ? "Reserve your seat at the James & Martha Bibbs Humanitarian Awards Banquet." : "Fill in your details below to reserve your spot."}
                </p>
              </div>

              <div className="overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="p-6 space-y-7" noValidate>

                  <div>
                    <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-4">Your Information</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="reg-name" className="text-[#0d1f0f]/70 font-body text-sm">Full Name *</Label>
                        <Input id="reg-name" data-testid="input-name" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" className="mt-1 h-11" />
                        <FieldError msg={errors.name} />
                      </div>
                      <div>
                        <Label htmlFor="reg-address" className="text-[#0d1f0f]/70 font-body text-sm">Street Address *</Label>
                        <Input id="reg-address" data-testid="input-address" value={form.address} onChange={e => set("address", e.target.value)} placeholder="123 Main St" className="mt-1 h-11" />
                        <FieldError msg={errors.address} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="reg-city" className="text-[#0d1f0f]/70 font-body text-sm">City *</Label>
                          <Input id="reg-city" data-testid="input-city" value={form.city} onChange={e => set("city", e.target.value)} placeholder="City" className="mt-1 h-11" />
                          <FieldError msg={errors.city} />
                        </div>
                        <div>
                          <Label htmlFor="reg-state" className="text-[#0d1f0f]/70 font-body text-sm">State *</Label>
                          <Select value={form.state} onValueChange={v => set("state", v)}>
                            <SelectTrigger id="reg-state" data-testid="select-state" className="mt-1 h-11">
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
                          <Input id="reg-zip" data-testid="input-zip" value={form.zip} onChange={e => set("zip", e.target.value)} placeholder="ZIP" className="mt-1 h-11" />
                          <FieldError msg={errors.zip} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="reg-phone" className="text-[#0d1f0f]/70 font-body text-sm">Phone Number *</Label>
                          <Input id="reg-phone" data-testid="input-phone" type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="(555) 000-0000" className="mt-1 h-11" />
                          <FieldError msg={errors.phone} />
                        </div>
                        <div>
                          <Label htmlFor="reg-email" className="text-[#0d1f0f]/70 font-body text-sm">Email Address *</Label>
                          <Input id="reg-email" data-testid="input-email" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@example.com" className="mt-1 h-11" />
                          <FieldError msg={errors.email} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {form.entryType === "team" && (
                    <div>
                      <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-1">Your 4 Team Members</h4>
                      <p className="text-xs text-[#0d1f0f]/50 font-body mb-4">Enter each golfer's name, email, and phone number.</p>
                      <div className="space-y-4">
                        {form.teamMembers.map((member, i) => (
                          <div key={i} className="p-4 bg-[#f5f0e8] rounded-xl border border-[#0d1f0f]/10">
                            <p className="font-bold text-[#0d1f0f] text-sm mb-3">Golfer {i + 1}</p>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-[#0d1f0f]/70 text-xs">Full Name *</Label>
                                <Input data-testid={`input-team-${i}-name`} value={member.name} onChange={e => setTeamMember(i, "name", e.target.value)} placeholder="Full name" className="mt-1 bg-white h-10" />
                                <FieldError msg={errors[`team_${i}_name`]} />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-[#0d1f0f]/70 text-xs">Email *</Label>
                                  <Input data-testid={`input-team-${i}-email`} type="email" value={member.email} onChange={e => setTeamMember(i, "email", e.target.value)} placeholder="email@example.com" className="mt-1 bg-white h-10" />
                                  <FieldError msg={errors[`team_${i}_email`]} />
                                </div>
                                <div>
                                  <Label className="text-[#0d1f0f]/70 text-xs">Phone *</Label>
                                  <Input data-testid={`input-team-${i}-phone`} type="tel" value={member.phone} onChange={e => setTeamMember(i, "phone", e.target.value)} placeholder="(555) 000-0000" className="mt-1 bg-white h-10" />
                                  <FieldError msg={errors[`team_${i}_phone`]} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {form.entryType !== "banquet" && (
                    <div>
                      <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-3">Add Banquet Tickets? <span className="text-[#0d1f0f]/30 normal-case tracking-normal font-body">(optional)</span></h4>
                      <div className="p-4 bg-[#f5f0e8] rounded-xl border border-[#c9973a]/20">
                        <p className="font-display font-bold text-[#0d1f0f] text-sm mb-1">James & Martha Bibbs Humanitarian Awards Banquet</p>
                        <p className="text-xs text-[#0d1f0f]/60 font-body mb-3">$45 per ticket — for non-golfers attending the evening banquet</p>
                        <div className="flex items-center gap-3">
                          <Label htmlFor="banquet-tickets" className="text-[#0d1f0f]/70 text-sm font-body whitespace-nowrap">Number of tickets:</Label>
                          <Select value={form.banquetTickets} onValueChange={v => set("banquetTickets", v)}>
                            <SelectTrigger id="banquet-tickets" data-testid="select-banquet-tickets" className="w-24 bg-white h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {parseInt(form.banquetTickets) > 0 && (
                            <span className="text-sm font-body text-[#1a6b3a] font-bold">= ${(parseInt(form.banquetTickets) * 45).toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {form.entryType === "banquet" && (
                    <div>
                      <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-3">How many tickets?</h4>
                      <div className="p-4 bg-[#f5f0e8] rounded-xl border border-[#c9973a]/20">
                        <p className="text-xs text-[#0d1f0f]/60 font-body mb-3">$45 per ticket</p>
                        <div className="flex items-center gap-3">
                          <Label htmlFor="banquet-tickets-only" className="text-[#0d1f0f]/70 text-sm font-body whitespace-nowrap">Tickets needed:</Label>
                          <Select value={form.banquetTickets} onValueChange={v => set("banquetTickets", v)}>
                            <SelectTrigger id="banquet-tickets-only" data-testid="select-banquet-tickets" className="w-24 bg-white h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <span className="text-sm font-body text-[#1a6b3a] font-bold">= ${(parseInt(form.banquetTickets || "1") * 45).toFixed(2)}</span>
                        </div>
                        <FieldError msg={errors.banquetTickets} />
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-3">Optional Donation <span className="text-[#0d1f0f]/30 normal-case tracking-normal font-body">(any amount welcome)</span></h4>
                    <div className="p-4 bg-[#f5f0e8] rounded-xl border border-[#0d1f0f]/10">
                      <p className="text-xs text-[#0d1f0f]/60 font-body mb-3">Support the National Kidney Foundation of Michigan with an additional gift.</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0d1f0f]/50 font-bold text-lg">$</span>
                        <Input id="donation" data-testid="input-donation" type="number" min="0" step="1" value={form.donation} onChange={e => set("donation", e.target.value)} placeholder="0" className="bg-white max-w-[120px] h-10" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-3">Payment Status</h4>
                    <div className="p-4 bg-[#f5f0e8] rounded-xl border border-[#0d1f0f]/10">
                      <p className="text-xs text-[#0d1f0f]/60 font-body mb-3">Have you already sent payment? Let us know so we can confirm your spot faster.</p>
                      <Select value={form.paymentStatus} onValueChange={v => set("paymentStatus", v)}>
                        <SelectTrigger data-testid="select-payment-status" className="bg-white h-11">
                          <SelectValue placeholder="Select payment status…" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Not yet paid">Not yet paid</SelectItem>
                          <SelectItem value="Paid via Zelle">Paid via Zelle (to 2488368014)</SelectItem>
                          <SelectItem value="Paid via check/money order">Paid via check or money order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-[#1a6b3a]/5 rounded-xl p-5 border border-[#1a6b3a]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-athletic tracking-wider uppercase text-[#0d1f0f]/50 mb-1">Your Total</p>
                        <div className="space-y-1 text-xs text-[#0d1f0f]/50 font-body">
                          {form.entryType !== "banquet" && (
                            <p>{form.entryType === "individual" ? "Individual entry" : "Team of four"}: ${form.entryType === "individual" ? (late ? "150" : "125") : (late ? "600" : "500")}.00</p>
                          )}
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

                  <div className="pt-1 space-y-3">
                    <Button
                      type="submit"
                      data-testid="button-submit-registration"
                      disabled={submitting}
                      className="w-full h-14 text-base font-bold bg-[#c9973a] hover:bg-[#b8862e] text-white shadow-lg tracking-wide uppercase"
                    >
                      {submitting ? "Submitting…" : `Reserve My Spot — Pay $${total.toFixed(2)} Online Now →`}
                    </Button>

                    <div className="bg-[#1a6b3a]/5 rounded-lg px-4 py-3 border border-[#1a6b3a]/10">
                      <p className="text-center text-xs font-semibold text-[#0d1f0f]/60 font-body">
                        100% Secure · Instant Confirmation · Limited Spots Available
                      </p>
                    </div>

                    <p className="text-center text-[10px] text-[#0d1f0f]/30 font-body leading-snug px-2">
                      Prefer to pay by check? Mail your check payable to <em>Jack Pitts Health Foundation</em> along with a printed copy of your submitted form. Spot is not guaranteed until payment is received.
                    </p>

                    <p className="text-center text-xs text-[#0d1f0f]/35 font-body">
                      The Jack Pitts Health Foundation is a 501(c)(3) non-profit organization.
                    </p>
                  </div>

                </form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
