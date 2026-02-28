import { Link } from "@tanstack/react-router";
import type { NavOption } from "@/features/theme/contract/layouts";
import { blogConfig } from "@/blog.config";

interface FooterProps {
  navOptions: Array<NavOption>;
}

export function Footer({ navOptions }: FooterProps) {
  return (
    <footer className="magic-footer py-12 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand / Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-primary mb-2">Magic</h3>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {blogConfig.author}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {navOptions.map((option) => (
              <Link
                key={option.id}
                to={option.to}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {option.label}
              </Link>
            ))}
            <a
              href={blogConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              GitHub
            </a>
            <a
              href={`mailto:${blogConfig.social.email}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
