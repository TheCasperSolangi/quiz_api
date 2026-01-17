import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for side projects and experimentation.",
    features: [
      "100 request/day",
      "No new quizes",
      "No current affairs",
      "No regional quizes"
    ],
    cta: "Get Started",
    variant: "heroOutline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams and serious applications.",
    features: [
      "5,000 quiz request/day",
      "Unlimited quizes",
      "Weekly quiz updates",
      "Regional & Current Affairs"
    ],
    cta: "Get Started",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale deployments and specific needs.",
    features: [
      "Unlimited Request/day",
      "Daily new quizes",
      "AI quizes",
      "24/7 Customer Support"
    ],
    cta: "Contact Sales",
    variant: "heroOutline" as const,
    popular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <section id="pricing" className="py-24 section-dark">
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
            Simple, transparent <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-section-dark-muted text-lg max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "border-accent bg-accent/5"
                  : "border-white/10 bg-section-dark"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-section-dark-muted">{plan.period}</span>
                  )}
                </div>
                <p className="text-section-dark-muted mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.variant}
                className="w-full"
                size="lg"
                onClick={plan.cta === "Get Started" ? handleGetStarted : undefined}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;