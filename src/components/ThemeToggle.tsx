
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle 
      pressed={theme === "dark"}
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full p-2 hover:bg-accent/50"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
