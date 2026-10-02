import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <div className="landing-section" id="landingDiv">
      {/* Background Hero Video with Cinematic Blur Effect */}
      <div className="hero-video-wrapper">
        <video
          src="/images/herovdo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-element"
        />
        <div className="hero-video-blur-overlay" />
      </div>

      {/* Robot Character Image in Background behind text */}
      <div className="hero-character-wrapper">
        <img
          src="/images/7addd40bc67f5f380c018d8a8c67adf1-removebg-preview.png"
          alt="BlackGrapesSofttech Hero Character"
          className="hero-character-img"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Background Giant Futuristic Watermark Typography (Split Left & Right of Grapes) */}
      <div className="hero-watermark-split">
        <span className="hero-watermark-side hero-watermark-left">BLACK</span>
        <span className="hero-watermark-side hero-watermark-right">GRAPES</span>
      </div>

      {/* Foreground Content Overlay */}
      <div className="hero-content-overlay">
        {/* Center Main Statement Block */}
        <div className="hero-statement-block">
          <h1 className="hero-main-statement">SOFTECH</h1>
        </div>

        {/* Bottom Bar: Centered Stats Metrics */}
        <div className="hero-bottom-bar">
          {/* Centered Bottom Stats Bar */}
          <div className="hero-stats-group">
            <div className="hero-stat-item">
              <div className="hero-stat-number">
                5<span>+</span>
              </div>
              <div className="hero-stat-label">Yrs Industry Experience</div>
            </div>

            <div className="hero-stat-item">
              <div className="hero-stat-number">
                75<span>+</span>
              </div>
              <div className="hero-stat-label">Projects Delivered</div>
            </div>

            <div className="hero-stat-item">
              <div className="hero-stat-number">
                35<span>+</span>
              </div>
              <div className="hero-stat-label">Experts</div>
            </div>

            <div className="hero-stat-item">
              <div className="hero-stat-number">
                100<span>+</span>
              </div>
              <div className="hero-stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Landing;