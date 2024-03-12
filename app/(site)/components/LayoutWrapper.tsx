// import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function LayoutWrapper(props: PropsWithChildren) {
  return props.children;
  // return (
  //   <ThemeProvider attribute="class" disableTransitionOnChange>
  //     {props.children}
  //   </ThemeProvider>
  // );
}
