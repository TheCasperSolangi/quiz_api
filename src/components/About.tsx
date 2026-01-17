import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Code2 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-millisecond response times with our globally distributed edge network.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption and role-based access control.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track quiz performance, completion rates, and user engagement in real-time.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description: "Clean REST API, comprehensive SDKs, and detailed documentation.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 section-dark">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why developers choose <span className="text-gradient">QuizAPI</span>
          </h2>
          <p className="text-section-dark-muted text-lg max-w-2xl mx-auto">
            Built by developers, for developers. We handle the complexity so you can focus on creating amazing quiz experiences.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-section-dark border border-white/10 hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-section-dark-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          {[
            { value: "150k+", label: "Quizzes Created" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "< 50ms", label: "Avg Response" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-section-dark-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
