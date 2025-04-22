
import { Card, CardContent } from "@/components/ui/card";
import { Code, LayoutGrid, Smartphone } from "lucide-react";

const AboutSection = () => {
  const experienceData = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Web Development",
      description: "Build responsive and performant web applications using modern frameworks like React."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-accent" />,
      title: "Mobile Development",
      description: "Create cross-platform mobile applications using Flutter that work seamlessly on iOS and Android."
    },
    {
      icon: <LayoutGrid className="h-8 w-8 text-primary" />,
      title: "UI/UX Design",
      description: "Proficiency in using Figma to translate design prototypes into functional mobile interfaces."
    }
  ];

  return (
    <section id="about" className="section bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            About Me
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-6">
            I'm a passionate software developer with expertise in both web and mobile development. 
            With a strong background in React and Flutter, I create engaging, responsive, and user-friendly applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I started my programming journey in college where I discovered my passion for creating 
                intuitive and aesthetically pleasing digital experiences. Since then, I've worked on 
                numerous projects, from simple websites to complex applications.
              </p>
              <p>
                My experience with React has given me a deep understanding of component-based architecture 
                and state management, while my work with Flutter has developed my skills in creating 
                cross-platform mobile applications with a native feel.
              </p>
              <p>
                I'm constantly learning and exploring new technologies to stay at the forefront 
                of software development. I believe in writing clean, maintainable code and creating 
                solutions that solve real-world problems.
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 grid gap-6">
            {experienceData.map((item, index) => (
              <Card key={index} className="bg-card border-white/5 shadow-lg overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
