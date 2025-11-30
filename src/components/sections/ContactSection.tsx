import { useIsMobile } from "@/hooks/use-mobile";
import api from "@/services/api";
import { Github, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import ContactDialog from "../contact/ContactDialog";
import ContactForm from "../contact/ContactForm";
import ContactInfoCard from "../contact/ContactInfoCard";


const ContactSection = () => {
  const isMobile = useIsMobile();
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [country, setCountry] = useState<string>("EG"); // default to Egypt

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Using free geolocation API
        const { data } = await api.get("https://ipapi.co/json/");
        setCountry(data.country_code); // EG, AE, US, etc.
      } catch (error) {
        console.error("Could not detect country:", error);
      }
    };

    fetchCountry();
  }, []);

  // Contact info based on country
  const contactInfo = country === "AE"
    ? [
      {
        icon: <Mail className="h-5 w-5" />,
        title: "Email",
        content: "devjimmy99@gmail.com",
        link: "mailto:devjimmy99@gmail.com"
      },
      {
        icon: <Phone className="h-5 w-5" />,
        title: "Phone",
        content: "+971 50 906 3004",
        onClick: () => setIsPhoneDialogOpen(true),
      },
      {
        isStatic: true,
        title: "Location",
        content: "Deira, Dubai - UAE",
        subContent: "Open to relocation",
        icon: <MapPin className="h-5 w-5" />,
      }
    ]
    : [
      {
        icon: <Mail className="h-5 w-5" />,
        title: "Email",
        content: "devjimmy99@gmail.com",
        link: "mailto:devjimmy99@gmail.com"
      },
      {
        icon: <Phone className="h-5 w-5" />,
        title: "Phone",
        content: "+20 128 922 3643",
        onClick: () => setIsPhoneDialogOpen(true),
      },
      {
        isStatic: true,
        title: "Location",
        content: "Alexandria, Egypt",
        subContent: "Open to relocation",
        icon: <MapPin className="h-5 w-5" />,
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
    }, {
      name: "youTube",
      icon: <Youtube className="w-5 h-5" />,
      href: "https://www.youtube.com/@Dev_Jimmy"
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
                  {...item}
                  key={index}
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
        phone={country === "AE" ? "+971509063004" : "+201289223643"}
      />
    </section>
  );
};

export default ContactSection;
