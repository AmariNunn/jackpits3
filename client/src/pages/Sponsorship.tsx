import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

import celebrationImg from "@assets/Golfer's_winning_moment_in_anime_style_1773071637027.png";

const opportunities = [
  {
    title: "🏆 TITLE SPONSOR",
    price: "$10,000+",
    description: 'Exclusive title naming rights: "[Company Name] Presents the Jack Pitts Open." Maximum brand visibility throughout the event and beyond.',
    features: [
      "Exclusive title naming rights",
      "Premier logo on all event materials & banners",
      "4 complimentary golfer registrations",
      "Hole-in-One sponsorship recognition",
      "VIP table at Awards Luncheon (8 seats)",
      "Speaking opportunity at the event",
      "Full-page ad in event program",
      "Social media spotlight campaign",
      "Year-round logo on Foundation website"
    ],
    borderColor: "border-t-[#c9973a] border-t-[6px]",
    bgColor: "bg-gradient-to-b from-[#c9973a]/5 to-white",
    badge: "text-[#c9973a] border-[#c9973a]/40"
  },
  {
    title: "🥇 EAGLE SPONSOR",
    price: "$5,000",
    description: "Premium partnership with strong brand presence across all event materials and communications.",
    features: [
      "Logo on event banner & all printed materials",
      "4 complimentary golfer registrations",
      "Reserved VIP table at Awards Luncheon (4 seats)",
      "Half-page ad in event program",
      "Recognition in all event announcements",
      "Logo on Foundation website for one year",
      "Social media feature post"
    ],
    borderColor: "border-t-amber-500 border-t-[6px]",
    bgColor: "bg-gradient-to-b from-amber-500/5 to-white",
    badge: "text-amber-600 border-amber-500/40"
  },
  {
    title: "🥈 BIRDIE SPONSOR",
    price: "$2,500",
    description: "Meaningful community partnership with event visibility and program recognition.",
    features: [
      "2 complimentary golfer registrations",
      "Company name on event banner",
      "Quarter-page ad in event program",
      "Awards luncheon recognition",
      "Listed on Foundation website"
    ],
    borderColor: "border-t-gray-400 border-t-[6px]",
    bgColor: "bg-gradient-to-b from-gray-100 to-white",
    badge: "text-gray-500 border-gray-400/40"
  },
  {
    title: "🥉 PAR SPONSOR",
    price: "$1,000",
    description: "Solid community support with golfer registration and event program recognition.",
    features: [
      "1 complimentary golfer registration",
      "Company name listed in event program",
      "Recognition from the podium at luncheon",
      "Listed on Foundation website"
    ],
    borderColor: "border-t-[#1a6b3a] border-t-4",
    bgColor: "bg-white",
    badge: "text-[#1a6b3a] border-[#1a6b3a]/40"
  },
  {
    title: "⛳ HOLE SPONSOR",
    price: "$500",
    description: "Dedicated tee or hole signage with your company name and logo on the course.",
    features: [
      "Dedicated tee/hole signage with logo",
      "Listing in event program",
      "Social media thank-you mention"
    ],
    borderColor: "border-t-[#1a6b3a]/70 border-t-4",
    bgColor: "bg-white",
    badge: "text-[#1a6b3a]/70 border-[#1a6b3a]/30"
  },
  {
    title: "🤝 COMMUNITY SPONSOR",
    price: "$250",
    description: "Show your community commitment with recognition in all event announcements and program.",
    features: [
      "Company name listed in event program",
      "Recognition in event announcements",
      "Certificate of appreciation"
    ],
    borderColor: "border-t-[#0d1f0f]/30 border-t-4",
    bgColor: "bg-white",
    badge: "text-[#0d1f0f]/50 border-[#0d1f0f]/20"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Sponsorship() {
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
            <motion.div key={index} variants={item}>
              <Card className={`h-full ${opportunity.borderColor} ${opportunity.bgColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg border-0`} data-testid={`card-sponsorship-${index}`}>
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
                <CardContent>
                  <p className="text-[#0d1f0f]/60 mb-6 leading-relaxed italic font-body text-sm">
                    {opportunity.description}
                  </p>
                  <ul className="space-y-3">
                    {opportunity.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm font-body">
                        <Check className="h-4 w-4 text-[#1a6b3a] mr-3 shrink-0" />
                        <span className="text-[#0d1f0f]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-[#0d1f0f]/10">
                    <Button className="w-full bg-[#1a6b3a] hover:bg-[#1a6b3a]/90 text-white" data-testid={`button-select-sponsorship-${index}`}>
                      Select Sponsorship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 bg-[#1a6b3a] text-[#f5f0e8] rounded-2xl p-6 sm:p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-display text-[#f5f0e8]">
            Become a Sponsor
          </h2>
          <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mb-2 font-body">
            Select your tier, complete the registration form, and mail your check payable to <strong>Jack Pitts Health Foundation</strong>.
          </p>
          <p className="text-sm opacity-60 mb-6 md:mb-8 font-body">
            P.O. Box 250014 · West Bloomfield, MI 48323 · jnpitts@comcast.net · www.jackpittshealthfoundation.org
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto bg-[#c9973a] hover:bg-[#c9973a]/90 text-white font-bold px-8" data-testid="button-contact-foundation">
              <a href="mailto:jnpitts@comcast.net">Contact the Foundation</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#f5f0e8]/30 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 font-bold px-8" data-testid="button-download-prospectus">
              Download Sponsorship Packet
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
