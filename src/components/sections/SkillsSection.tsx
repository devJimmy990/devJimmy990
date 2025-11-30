import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SkillIcons from "../icons/SkillIcons";

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const skillLogos = SkillIcons();

  const skills = {
    frontend: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "HTML/CSS", level: 92 },
      { name: "Next.js", level: 75 },
    ],
    mobile: [
      { name: "Flutter", level: 88 },
      { name: "Dart", level: 85 },
      { name: "React Native", level: 70 },
      { name: "iOS/Android", level: 65 },
      { name: "Firebase", level: 80 },
    ],
    other: [
      { name: "Git/GitHub", level: 90 },
      { name: "UI/UX Design", level: 75 },
      { name: "Node.js", level: 65 },
      { name: "RESTful APIs", level: 85 },
      { name: "Testing", level: 70 },
    ]
  };

  const logosByCategory = {
    frontend: [
      { name: "React", icon: skillLogos.react },
      { name: "TypeScript", icon: skillLogos.typescript },
      { name: "JavaScript", icon: skillLogos.javascript },
      { name: "HTML5", icon: skillLogos.html5 },
      { name: "CSS3", icon: skillLogos.css3 },
    ],
    mobile: [
      { name: "React Native", icon: skillLogos.reactnative },
      { name: "Flutter", icon: skillLogos.flutter },
      { name: "Dart", icon: skillLogos.dart },
      { name: "Firebase", icon: skillLogos.firebase },
      { name: "Supabase", icon: skillLogos.supabase },
      { name: "Java", icon: skillLogos.java },
    ],
    other: []
  };

  return (
    <section id="skills" className="section">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            My Skills
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-6">
            I've worked with a variety of technologies and tools in web and mobile development.
            Here are some of my key technical skills.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="frontend" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="frontend" className="px-8">Frontend</TabsTrigger>
              <TabsTrigger value="mobile" className="px-8">Mobile</TabsTrigger>
              <TabsTrigger value="other" className="px-8">Other</TabsTrigger>
            </TabsList>

            {Object.entries(skills).map(([category, categorySkills]) => (
              <TabsContent key={category} value={category} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2 transition-all duration-1000" />
                    </div>
                  ))}
                </div>

                {logosByCategory[category as keyof typeof logosByCategory].length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
                    {logosByCategory[category as keyof typeof logosByCategory].map((logo, idx) => (
                      <div
                        key={idx}
                        className="aspect-square bg-card rounded-lg flex flex-col items-center justify-center p-4 border border-white/5 hover:border-primary/50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 flex items-center justify-center mb-2">
                          {logo.icon}
                        </div>
                        <span className="text-xs text-center text-muted-foreground mt-1">{logo.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
