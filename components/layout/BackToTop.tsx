import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BackToTopProps {
  threshold?: number;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  className?: string;
}

export default function BackToTop({
  threshold = 300,
  position = "bottom-right",
  className,
}: BackToTopProps) {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Position classes based on the position prop
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  };

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Show button based on threshold
      if (window.scrollY > threshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          className={cn("fixed z-50", positionClasses[position], className)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            variant="secondary"
            className="h-12 w-12 cursor-pointer rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg hover:bg-primary hover:scale-110 transition-all overflow-hidden border border-primary/20"
            aria-label="Back to top"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute bottom-0 left-0 right-0 bg-primary/30 transition-all duration-300"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>
            <ChevronUp size={30} className="z-10 animate-pulse duration-2000" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
