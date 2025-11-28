
import { Card, CardContent } from "@/components/ui/card";

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  subContent?: string;
  onClick?: () => void;
  link?: string;
  isMobile: boolean;
  isStatic?: boolean;
}

const ContactInfoCard = ({
  icon,
  title,
  content,
  subContent,
  onClick,
  link,
  isMobile,
  isStatic,
}: ContactInfoCardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <a
          href={link}
          target={title === "Location" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="block h-full"
        >
          {children}
        </a>
      );
    }
    return (
      <div onClick={onClick} className={`block ${onClick ? 'cursor-pointer' : ''}`}>
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
      <Card className={`border-white/5 bg-card h-full ${!isStatic && "hover:shadow-md transition-all transform hover:-translate-y-1 group"}`}>
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-muted-foreground text-sm truncate group-hover:text-primary transition-colors">
              {content}
            </p>
            {subContent && !isMobile && (
              <p className="text-xs text-muted-foreground mt-1 italic group-hover:text-primary/80 transition-colors">
                {subContent}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default ContactInfoCard;
