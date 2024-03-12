"use client";
import { LucideArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "~/app/(site)/utils";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  top?: number;
  smooth?: boolean;
  svgPath?: string;
  viewBox?: string;
  width?: string;
  height?: string;
};

function scrollToTop(smooth = false) {
  if (smooth) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    document.documentElement.scrollTop = 0;
  }
}

const ScrollToTop = ({
  top = 20,
  className = "",
  smooth = true,
  ...props
}: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(document.documentElement.scrollTop >= top);
    };
    onScroll();
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [top]);

  return (
    visible && (
      <button
        aria-label="Scroll to top"
        className={cn(
          `fixed bottom-8 right-8 z-50 p-2 rounded-full border-slate-200 border-2 dark:border-slate-800 bg-slate-400 hover:bg-slate-500 dark:bg-slate-900 dark:hover:bg-slate-950 hover:text-green-500`,
          className,
        )}
        onClick={() => scrollToTop(smooth)}
        {...props}
      >
        <LucideArrowUp className="size-4 sm:size-6" />
      </button>
    )
  );
};

export default ScrollToTop;
