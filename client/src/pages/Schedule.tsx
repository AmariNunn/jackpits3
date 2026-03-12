import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import swingImg from "@assets/ChatGPT_Image_Mar_8,_2026,_07_29_17_PM_1773283486026.png";

export default function Schedule() {
  const events = [
    { time: "8:00 AM", title: "Registration & Breakfast", desc: "Check-in at the clubhouse, grab your cart, and enjoy a continental breakfast before the tournament begins." },
    { time: "9:00 AM", title: "Putting Contest", desc: "Warm up and compete in our putting contest on the practice green — exclusive sponsor recognition at this station." },
    { time: "10:00 AM", title: "Shotgun Start — 4-Person Scramble", desc: "All teams tee off simultaneously across the course in our signature 4-person scramble format with cash prizes up to $1,000." },
    { time: "12:00 PM", title: "Lunch at the Turn", desc: "Refreshments and lunch served at the halfway house — sponsored hospitality keeping you fueled through the back nine." },
    { time: "3:30 PM", title: "Post-Round Reception", desc: "Drinks and appetizers in the clubhouse while scores are tallied and Closest to the Pin and Longest Drive winners are announced." },
    { time: "4:30 PM", title: "James & Martha Bibbs Humanitarian Award Luncheon", desc: "Our annual celebration of community service — buffet dinner, prize presentations, raffle drawing, and recognition of this year's honorees." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <PageHeader
        title="Event Schedule"
        subtitle="Annual Golf Outing · 4-Person Scramble · Forest Akers West Golf Course, MSU"
        leftImage={swingImg}
      />

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#1a6b3a]/20 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                  data-testid={`schedule-event-${index}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#1a6b3a] border-4 border-[#f5f0e8] shadow-lg transform -translate-x-1/2 z-10 mt-1 md:mt-0" />

                  <div className="w-full md:w-1/2 pl-10 sm:pl-12 md:pl-0 md:px-12">
                    <div className={`bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-[#c9973a]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}>
                      <div className={`flex items-center gap-2 text-[#c9973a] font-athletic text-lg tracking-wider mb-2 ${
                         index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#0d1f0f] mb-2">{event.title}</h3>
                      <p className="text-[#0d1f0f]/60 text-sm font-body">{event.desc}</p>
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
