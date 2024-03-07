import InternalLinkButton from "./General/InternalLinkButton";
import { Button } from "./UI/button";
import { LucideMenu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./UI/popover";
import LogoWithCSAStacked from "./LogoWithCSAStacked";

export default function NavBar() {
  return (
    <nav className="bg-slate-200 dark:bg-slate-900 w-full border-b border-slate-400 dark:border-slate-700 py-2">
      <div className="w-11/12 sm:w-9/12 flex items-center mx-auto gap-2">
        <LogoWithCSAStacked />
        <div className="hidden md:block">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">About</Button>
            </PopoverTrigger>
            <PopoverContent className="w-max flex flex-col gap-1 p-1 bg-slate-300 dark:bg-slate-900 border-slate-400 dark:border-slate-800 border-2">
              <InternalLinkButton href="/executives" variant="ghost">
                Executives
              </InternalLinkButton>
              <InternalLinkButton href="/regulations" variant="ghost">
                Regulations
              </InternalLinkButton>
              <InternalLinkButton href="/constitution" variant="ghost">
                Constitution
              </InternalLinkButton>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1 md:hidden"></div>
        <div className="block md:hidden">
          <Button icon={<LucideMenu />} size="icon" variant="ghost"></Button>
        </div>
      </div>
    </nav>
  );
}
