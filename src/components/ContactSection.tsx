
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "muhammedgamal997@gmail.com",
      link: "mailto:muhammedgamal997@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+20 1289223643",
      link: "tel:+201289223643"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using mailto link
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:muhammedgamal997@gmail.com?subject=${subject}&body=${body}`;
      
      // Open the email client
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Message prepared",
        description: "Your message has been prepared for sending. Please send it from your email client.",
      });
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 1000);
    } catch (error) {
      console.error("Error preparing email:", error);
      toast({
        title: "Error",
        description: "There was a problem preparing your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            Contact Me
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-6">
            Have a question or want to work together? Reach out to me using the form below.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.link}
                target={item.title === "Location" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="border-white/5 bg-card hover:shadow-md hover:shadow-primary/10 hover:border-primary/20 transition-all transform hover:-translate-y-1 group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        {item.content}
                      </p>
                      {item.subContent && (
                        <p className="text-xs text-muted-foreground mt-1 italic group-hover:text-primary/80 transition-colors">
                          {item.subContent}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}

            <div className="flex gap-4 mt-8 justify-center lg:justify-start">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="bg-card hover:bg-primary/20 transition-all p-3 rounded-full border border-white/5 transform hover:scale-110"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-card border-white/5 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-card border-white/5 focus:border-primary/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-card border-white/5 focus:border-primary/50"
              />
            </div>
            
            <div className="space-y-2">
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="min-h-[150px] bg-card border-white/5 focus:border-primary/50 resize-none"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full gap-2 transition-all transform hover:scale-105" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
