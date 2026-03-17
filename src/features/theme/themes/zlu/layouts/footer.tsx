import { Link } from "@tanstack/react-router";
import { blogConfig } from "@/blog.config";

interface FooterProps {
  navOptions: Array<{ label: string; to: string; id: string }>;
}

export function Footer({ navOptions }: FooterProps) {
  return (
    <footer className="zlu-footer">
      <div className="zlu-footer-content">
        <div className="zlu-footer-section">
          <h4>{blogConfig.title}</h4>
          <p className="text-sm text-[var(--zlu-text-secondary)]">{blogConfig.description}</p>
        </div>

        <div className="zlu-footer-section">
          <h4>导航</h4>
          <div className="zlu-footer-links">
            {navOptions.map((item) => (
              <Link key={item.id} to={item.to} className="zlu-footer-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="zlu-footer-section">
          <h4>链接</h4>
          <div className="zlu-footer-links">
            {blogConfig.social.github && (
              <a
                href={blogConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="zlu-footer-link"
              >
                GitHub
              </a>
            )}
            {blogConfig.social.email && (
              <a href={`mailto:${blogConfig.social.email}`} className="zlu-footer-link">
                Email
              </a>
            )}
            <Link to="/friend-links" className="zlu-footer-link">
              友情链接
            </Link>
          </div>
        </div>
      </div>

      <div className="zlu-footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {blogConfig.title}. All rights reserved.
        </p>
        <p className="mt-2">
          Powered by Flare Stack Blog
        </p>
      </div>
    </footer>
  );
}
