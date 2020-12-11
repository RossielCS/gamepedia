import React from 'react';
import github from '../assets/images/i-octocat-100.png';
import linkedin from '../assets/images/i-linkedin-100.png';
import mail from '../assets/images/i-letter-100.png';

const Footer = () => (
  <div className="Footer">
    <div className="footer-container">
      <div className="footer-authors">
        <p className="app-author">Built by Rossiel Carranza</p>
        <p className="design-author">
          <span>Design based in </span>
          <a href="https://www.behance.net/gallery/11351281/NomNom" target="_blank" rel="noreferrer">
            NomNom
          </a>
          <span> by </span>
          <a href="https://www.behance.net/enfantroy" target="_blank" rel="noreferrer">
            Marc-Antoine Roy
          </a>
        </p>
        <p className="design-author">
          This site uses
          <a href="https://rawg.io/" target="_blank" rel="noreferrer"> RAWG </a>
          as a source of the data and/or images.
        </p>
      </div>
      <div className="footer-icons">
        <a href="https://github.com/RossielCS" target="_blank" rel="noreferrer">
          <div className="icon-container">
            <img src={github} alt="github" />
            <span className="icon-title">GitHub</span>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/rossiel-carranza/" target="_blank" rel="noreferrer">
          <div className="icon-container">
            <img src={linkedin} alt="linkedin" />
            <span className="icon-title">LinkedIn</span>
          </div>
        </a>
        <a href="mailto:rossielcarranza@gmail.com">
          <div className="icon-container">
            <img src={mail} alt="email" />
            <span className="icon-title">Email</span>
          </div>
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
