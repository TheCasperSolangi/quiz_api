import { motion } from "framer-motion";

const Footer = () => {
  const links = [
    { name: "API Docs", href: "/api-docs" },

    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      ),
    },
    
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="py-16 md:py-20 bg-background border-t border-border/70">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
         {/* Brand */}
        {/* Brand */}
        <div className="flex items-center justify-center gap-3.5 mb-10">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center">
            {/* Transparent Logo */}
            <img
              src="/logo.png"
              alt="QuizAPI Logo"
              className="w-26 h-25 object-contain"
            />
          </div>

          <div className="text-left">
            <h3 className="font-bold text-2xl md:text-3xl tracking-tight text-foreground">
              Deskarro
            </h3>
            <p className="text-muted-foreground/80 text-sm mt-0.5 font-medium">
              Developer-first quiz & assessment platform
            </p>
          </div>
        </div>



          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-10 md:mb-12">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm md:text-base font-medium transition-colors duration-200 hover:underline underline-offset-4 decoration-accent/60"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Socials + Copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 w-full max-w-md md:max-w-none">
            <div className="flex items-center justify-center gap-6 md:gap-7">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground/80 hover:text-foreground transition-all duration-200 hover:scale-110 hover:rotate-3 active:scale-95"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-muted-foreground/70 text-sm font-medium">
              © {new Date().getFullYear()} Deskarro — All rights reserved
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;