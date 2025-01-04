import InternalLinkButton from "./General/InternalLinkButton";
import LogoWithCSAStacked from "./LogoWithCSAStacked";
import NavBarAboutDropdown from "./NavBarAboutDropdown";
import NavBarSliderPanel from "./NavBarSliderPanel";

export default function NavBar() {
  return (
    <nav className="bg-slate-200 dark:bg-slate-900 w-full border-b border-slate-400 dark:border-slate-700 py-2">
      <div className="w-11/12 md:w-10/12 lg:w-9/12 flex items-center mx-auto gap-2">
        <LogoWithCSAStacked />
        <div className="hidden md:block">
          <NavBarAboutDropdown />
          <InternalLinkButton href="/history" variant="ghost">
            History
          </InternalLinkButton>
          <InternalLinkButton href="/announcements" variant="ghost">
            Announcements
          </InternalLinkButton>
          <InternalLinkButton href="/events" variant="ghost">
            Events
          </InternalLinkButton>
          <InternalLinkButton href="/contact" variant="ghost">
            Contact
          </InternalLinkButton>
        </div>
        <div className="flex-1 md:hidden"></div>
        <NavBarSliderPanel />
      </div>
    </nav>
  );
}
