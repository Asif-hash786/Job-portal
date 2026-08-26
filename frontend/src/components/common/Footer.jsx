import { RiFacebookLine, RiGithubFill, RiTwitterXLine } from "@remixicon/react";
import { Button } from "../ui/button";


const socials = [
  { href: "https://x.com/yourhandle", label: "X", Icon: RiTwitterXLine },
  { href: "https://facebook.com/yourpage", label: "Facebook", Icon: RiFacebookLine },
  { href: "https://github.com/yourrepo", label: "GitHub", Icon: RiGithubFill },
];

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-4 border-t">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} YourSite. All rights reserved.
      </p>

      <div className="flex items-center gap-1">
        {socials.map(({ href, label, Icon }) => (
          <Button
            key={label}
            asChild
            type="button"
            variant="ghost"
            size="icon"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#07AAA5]/10 text-[#07AAA5] border border-[#4ff2ed]"
          >
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon className="h-5 w-5" />
            </a>
          </Button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;