"use client";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function LayoutWrapper(props: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {props.children}
    </ThemeProvider>
  );
}
