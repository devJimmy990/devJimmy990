
import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ContactForm from "./contact/ContactForm";
import ContactInfoCard from "./contact/ContactInfoCard";
import ContactDialog from "./contact/ContactDialog";

const ContactSection = () => {
  const isMobile = useIsMobile();
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "muhammedgamal997@gmail.com",
      link: "mailto:muhammedgamal997@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+20 128 922 3643",
      onClick: () => setIsPhoneDialogOpen(true),
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      content: "Alexandria, Egypt",
      subContent: "Open to relocation",
      link: "https://maps.app.goo.gl/Ti4HfJu9B6FuJ7iF6"
    }
  ];

  const socialLinks = [
    {
      name: "github",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/devJimmy990"
    },
    {
      name: "linkedin",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/mogamaal"
    }
  ];

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 relative">
            Contact Me
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-6 text-sm sm:text-base text-justify md:text-center">
            Have a question or want to work together? Reach out to me using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className={`grid ${isMobile ? "grid-cols-1" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1"} gap-4`}>
              {contactInfo.map((item, index) => (
                <ContactInfoCard
                  key={index}
                  {...item}
                  isMobile={isMobile}
                />
              ))}
            </div>

            <div className="flex gap-4 mt-4 justify-center lg:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card hover:bg-primary/20 transition-all p-2 rounded-full border border-white/5 transform hover:scale-110"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      <ContactDialog
        isOpen={isPhoneDialogOpen}
        onOpenChange={setIsPhoneDialogOpen}
      />
    </section>
  );
};

export default ContactSection;
