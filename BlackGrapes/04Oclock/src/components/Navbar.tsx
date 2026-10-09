import { useEffect, useState } from "react";
import { MdMenu, MdClose, MdArrowOutward } from "react-icons/md";
import { Link, useRouter } from "../router";
import "./styles/Navbar.css";

export const smoother = { paused: (_val?: boolean) => {} };

const Navbar = () => {
  const { path } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Our Works", href: "/works" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "menu-open" : ""}`}>
        <div className="header">
          {/* Brand Logo Image */}
          <Link
            to="/"
            className="brand-logo-link"
            data-cursor="disable"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src="/images/image.png"
              alt="BlackGrapesSofttech Logo"
              className="navbar-brand-logo-img"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links-desktop">
            {navLinks.map((link) => {
              const isActive = path === link.href || (link.href !== "/" && path.startsWith(link.href));
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`nav-link-item ${isActive ? "active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Header CTA Button */}
          <Link to="/contact" className="header-cta-btn">
            Let's Talk <MdArrowOutward />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation-drawer"
        className={`mobile-menu-drawer ${isMobileMenuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <nav className="mobile-drawer-nav">
          {navLinks.map((link) => {
            const isActive = path === link.href || (link.href !== "/" && path.startsWith(link.href));
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                {isActive && <span className="mobile-nav-dot" />}
              </Link>
            );
          })}
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            to="/contact"
            className="mobile-cta-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Let's Talk <MdArrowOutward />
          </Link>

          <div className="mobile-drawer-contact-snippet">
            <span className="mobile-drawer-tag">BLACKGRAPES SOFTECH</span>
            <a href="mailto:info@blackgrapessoftech.com" className="mobile-drawer-email">
              info@blackgrapessoftech.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
