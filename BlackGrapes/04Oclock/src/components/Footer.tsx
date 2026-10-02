import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "../router";
import { CONTACT_CONFIG } from "../data/contact";
import "./styles/Footer.css";

const Footer = () => {
  const [modalContent, setModalContent] = useState<"privacy" | "terms" | null>(null);

  return (
    <>
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-col-brand">
              <Link to="/" className="footer-brand-logo">
                <img
                  src="/images/image.png"
                  alt="BlackGrapesSofttech Logo"
                  className="footer-brand-logo-img"
                />
              </Link>
              <p className="footer-brand-desc">
                We build thoughtful digital products, scalable software and intelligent technology solutions that help businesses move forward.
              </p>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><Link to="/about">About Us</Link></li>
                <li className="footer-link-item"><Link to="/services">Services</Link></li>
                <li className="footer-link-item"><Link to="/about#journey">Our Journey</Link></li>
                <li className="footer-link-item"><Link to="/about#mission">Mission & Vision</Link></li>
                <li className="footer-link-item"><Link to="/works">Our Works</Link></li>
                <li className="footer-link-item"><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Information */}
            <div>
              <h4 className="footer-col-title">Contact</h4>
              <div className="footer-contact-info">
                <p>Email: <a href={`mailto:${CONTACT_CONFIG.email}`}>{CONTACT_CONFIG.email}</a></p>
                <p>Phone: <a href="tel:+917470997884">+91 7470997884</a> / <a href="tel:+916262414463">+91 6262414463</a></p>
                <p>Location: <a href="https://maps.app.goo.gl/8CGaCBy9xGM63Ryi7" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "underline", textUnderlineOffset: "3px" }}>{CONTACT_CONFIG.location}</a></p>
                <Link to="/contact" className="footer-cta-link">
                  Let's Talk <MdArrowOutward />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>© 2026 BlackGrapesSofttech. All Rights Reserved.</p>
            <div className="footer-legal-links">
              <button
                className="footer-legal-button"
                onClick={() => setModalContent("privacy")}
              >
                Privacy Policy
              </button>
              <button
                className="footer-legal-button"
                onClick={() => setModalContent("terms")}
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {modalContent && (
        <div className="legal-modal-backdrop" onClick={() => setModalContent(null)}>
          <div className="legal-modal-card" onClick={(e) => e.stopPropagation()}>
            {modalContent === "privacy" ? (
              <>
                <h3>Privacy Policy</h3>
                <p>
                  BlackGrapesSofttech is committed to safeguarding client privacy and personal data. We do not sell, license, or transmit user information to unauthorized third parties.
                </p>
                <p>
                  All project data, backend API requests, and communication inquiries submitted via our portals are encrypted using industry-standard protocols.
                </p>
              </>
            ) : (
              <>
                <h3>Terms & Conditions</h3>
                <p>
                  By accessing and utilizing the website and services of BlackGrapesSofttech, you agree to comply with our enterprise terms of service and intellectual property provisions.
                </p>
                <p>
                  All software code, visual assets, designs, and content published on this domain remain the exclusive property of BlackGrapesSofttech.
                </p>
              </>
            )}
            <button
              className="legal-modal-close-btn"
              onClick={() => setModalContent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
