import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { useRef } from "react";

// Only logo paths (ideally use SVG versions where possible for clean grayscale)
const clientLogos = [
  "/city_school.png",
  "/tcf.png",
  "/iobm.png",
  "/usindh.png",
  "/new_logo.png",
  "/K5ZMIVZg.png",
  // → add more paths as needed
];

const testimonials = [
  // The Citizens Foundation (2)
  {
    id: 1,
    initials: "TC",
    avatarColor: "bg-[#1f2937]",
    text: "Deskarro has transformed our quiz-based learning. The dashboard insights are incredibly accurate and help us improve student engagement daily.",
    author: "Ayesha Khan",
    role: "Program Manager, The Citizens Foundation",
  },
  {
    id: 2,
    initials: "TC",
    avatarColor: "bg-[#111827]",
    text: "Reliable, fast, and easy to use. Our teachers now create quizzes in minutes and track results instantly. Truly a game-changer for our digital classrooms.",
    author: "Omar Raza",
    role: "Head of Digital Learning, The Citizens Foundation",
  },

  // IoBM (2)
  {
    id: 3,
    initials: "IO",
    avatarColor: "bg-[#0f172a]",
    text: "Deskarro helped us run large-scale competitions smoothly with zero downtime. The analytics are brilliant and the user experience is outstanding.",
    author: "Dr. Sarah Ahmed",
    role: "Faculty Lead, University of Sindh",
  },
  {
    id: 4,
    initials: "IO",
    avatarColor: "bg-[#111827]",
    text: "Our quiz events have become more interactive and professional. The platform handles high traffic effortlessly and the support is top-notch.",
    author: "Bilal Hussain",
    role: "Student Activities Coordinator, IoBM",
  },

  // The City School (2)
  {
    id: 5,
    initials: "CS",
    avatarColor: "bg-[#1f2937]",
    text: "We have improved student participation by 40% using Deskarro. Teachers love the question bank and auto-grading features.",
    author: "Hina Malik",
    role: "Academic Supervisor, Usman Public School",
  },
  {
    id: 6,
    initials: "CS",
    avatarColor: "bg-[#0f172a]",
    text: "The platform is intuitive and stable. It helped us standardize assessments across campuses with consistent results and reporting.",
    author: "Saeed Qureshi",
    role: "Head of Assessment, The City School",
  },

  // NextTrivia (2)
  {
    id: 7,
    initials: "NT",
    avatarColor: "bg-[#111827]",
    text: "Deskarro’s performance is exceptional during live trivia events. The latency is minimal and the user interface is extremely engaging.",
    author: "Zara Iqbal",
    role: "Event Manager, Must Graduate Academy",
  },
  {
    id: 8,
    initials: "NT",
    avatarColor: "bg-[#1f2937]",
    text: "Our audience retention improved significantly after switching to Deskarro. The platform feels modern and the analytics are highly actionable.",
    author: "Brayan Brabolanos",
    role: "Project Manager, Tara Solutions Costa Rica",
  },

  // DCTrivia (2)
  {
    id: 9,
    initials: "DC",
    avatarColor: "bg-[#0f172a]",
    text: "Deskarro makes hosting quizzes effortless. The system is fast, stable, and the reporting tools help us understand player behavior better.",
    author: "Nadia Shah",
    role: "Operations Lead, DCTrivia",
  },
  
];

const Clients = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="clients" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-4">
            Trusted by industry leaders
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Powering quizzes for the best teams
          </h2>
        </motion.div>

        {/* Logos — no background, pure greyscale images */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.07 }}
          viewport={{ once: true }}
          className="
            grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 
            gap-8 sm:gap-10 md:gap-12 lg:gap-14 
            items-center justify-items-center
          "
        >
          {clientLogos.map((logoPath, index) => (
            <motion.div
              key={logoPath + index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group w-20 sm:w-24 md:w-28 lg:w-32 aspect-[4/3] flex items-center justify-center"
            >
              <img
                src={logoPath}
                alt="Client logo"
                className="
                  w-full h-full object-contain 
                  filter grayscale 
                  opacity-60 
                  group-hover:grayscale-0 
                  group-hover:opacity-100 
                  group-hover:scale-110 
                  transition-all duration-400 ease-out
                "
                // Remove broken images quietly
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0";
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials section remains mostly the same */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-24"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <FaQuoteLeft className="w-4 h-4" />
              Client Feedback
            </div>
            <h3 className="text-3xl font-bold mt-5">What They Say</h3>
          </div>

          {/* Horizontal scroll area – unchanged logic */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div ref={testimonialsRef} className="overflow-x-auto scrollbar-hide pb-6">
              <div className="flex gap-6 md:gap-8 px-2 min-w-max">
                {testimonials.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="
                      flex-shrink-0 w-80 sm:w-96 
                      p-6 sm:p-8 rounded-2xl 
                      bg-card border border-border 
                      hover:border-primary/30 hover:shadow-xl 
                      transition-all duration-300 group
                    "
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className={`w-12 h-12 rounded-xl ${t.avatarColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="font-bold text-lg">{t.initials}</span>
                        </div>
                        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground italic">
                          "{t.text}"
                        </p>
                      </div>
                      <div className="mt-auto pt-6 border-t border-border">
                        <div className="font-semibold">{t.author}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

           
          </div>

        
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;