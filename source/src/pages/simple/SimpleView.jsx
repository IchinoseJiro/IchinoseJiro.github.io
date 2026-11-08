import { portfolioUrl } from '../../utils/portfolioNavigation.js'
// Simple view home page: readable profile sections and compact top navigation.
import BrandLogo from '../../components/branding/BrandLogo.jsx'
import SocialLinks from '../../components/contact/SocialLinks.jsx'
import NavigationHint from '../../components/navigation/NavigationHint.jsx'
import { SkillsSection } from '../../features/skills/Skills.jsx'
import { projects } from '../../data/projects.js'
import { profile, experience, certificationDetails, contact } from '../../data/profileContent.js'
import './SimpleView.css'
import '../../styles/portfolio-shared.css'

export default function SimpleView({ menu, copyButton, onAbout }) {
  return (
    <div className="simple-shell">
      <a className="simple-skip" href="#simple-about">
        Skip to content
      </a>
      {/* Sticky header: logo, orange navigation instructions, and File/View/Go/Help menus. */}
      <header className="simple-header">
        <div className="simple-header-inner">
          <a className="simple-brand" href="#simple-top" aria-label="LunR Code home">
            <BrandLogo decorative />
            <span>
              LunR Code<small>Jireh Chantengco</small>
            </span>
          </a>
          <NavigationHint simple className="simple-hint simple-header-hint" />
          {menu}
        </div>
      </header>
      <main className="simple-main" id="simple-top">
        {/* Introduction: greeting, professional focus, photo, and action links. */}
        <section className="simple-hero" aria-labelledby="simple-title">
          <div>
            <p className="simple-eyebrow">WEB DEVELOPMENT · IT SUPPORT</p>
            <h1 id="simple-title">
              Hello, world.
              <br />
              I’m <span>{profile.goesBy}.</span>
            </h1>
            <p className="simple-hero-description">
              An Information Technology graduate specializing in Web Development, based in{' '}
              {profile.location}.
            </p>
            <div className="simple-actions">
              <a className="simple-primary" href={portfolioUrl()}>
                See my projects ↗
              </a>
              <a className="simple-secondary" href="#simple-contact">
                Get in touch
              </a>
            </div>
            <p className="simple-availability">
              <span aria-hidden="true" /> Open to opportunities
            </p>
          </div>
          <figure className="simple-portrait">
            <img
              src="/images/jireh-portrait.jpg"
              width="1280"
              height="960"
              alt="Lowell Jireh P. Chantengco outdoors among trees"
            />
            <figcaption>
              <BrandLogo decorative />
              <span>
                {profile.name}
                <small>{profile.role}</small>
              </span>
            </figcaption>
          </figure>
        </section>
        {/* Links to the five profile sections below. */}
        <nav className="simple-section-nav" aria-label="Profile sections">
          {['About', 'Experience', 'Education', 'Skills', 'Contact'].map((name) => (
            <a href={`#simple-${name.toLowerCase()}`} key={name}>
              {name}
            </a>
          ))}
        </nav>
        {/* About: summary, location, and web development focus. */}
        <section
          className="simple-section simple-about"
          id="simple-about"
          aria-labelledby="simple-about-title"
        >
          <div>
            <p className="simple-eyebrow">A LITTLE ABOUT ME</p>
            <h2 id="simple-about-title">
              Learning, building,
              <br />
              and growing.
            </h2>
          </div>
          <div>
            <p>{profile.summary}</p>
            <p>I enjoy creating responsive websites and solving practical technical problems.</p>
            <div className="simple-facts">
              <span>
                <small>BASED IN</small>
                {profile.location}
              </span>
              <span>
                <small>FOCUS</small>
                {profile.specialization}
              </span>
            </div>
          </div>
        </section>
        {/* Experience: expandable jobs and certifications. */}
        <section
          className="simple-section"
          id="simple-experience"
          aria-labelledby="simple-experience-title"
        >
          <p className="simple-eyebrow">WHERE I’VE WORKED</p>
          <h2 id="simple-experience-title">Experience</h2>
          <div className="simple-experience-list">
            {experience.map((job, index) => (
              <details className="simple-job" key={job.company} open={index === 0}>
                <summary>
                  <span>
                    <strong>{job.role}</strong>
                    <small>{job.company}</small>
                  </span>
                  <time>{job.dates}</time>
                  <b aria-hidden="true">⌄</b>
                </summary>
                <ul>
                  {job.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <div className="simple-certifications">
            <h3>Certifications</h3>
            <ul>
              {certificationDetails.map((certificate) => (
                <li key={certificate.name}>
                  {certificate.url ? (
                    <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                      {certificate.name} <span aria-hidden="true">↗</span>
                      <span className="skill-sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <span>{certificate.name}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="certificate-sharing-note">
              Direct certificate links aren’t available yet for AI for Beginners and Agile Project
              Management. You can find these certifications on my{' '}
              <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn profile ↗<span className="skill-sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        </section>
        {/* Education: university details, college work, and graduation. */}
        <section
          className="simple-section"
          id="simple-education"
          aria-labelledby="simple-education-title"
        >
          <p className="simple-eyebrow">MY FOUNDATION</p>
          <h2 id="simple-education-title">Education</h2>
          <div className="simple-education-card">
            <img
              className="simple-education-mark"
              src="/images/HAU-logo.png"
              alt="Holy Angel University seal"
              width="1670"
              height="1582"
              loading="lazy"
            />
            <div>
              <h3>{profile.education}</h3>
              <p>{profile.degree}</p>
              <p>{profile.specialization} specialization</p>
              <p>Attended {profile.educationTimeline}</p>
            </div>
            <div className="simple-education-projects">
              <h4>College Projects</h4>
              <ul>
                {projects.map((project) => (
                  <li key={project.id}>
                    <a href={portfolioUrl(project.id)}>
                      {project.title} <span aria-hidden="true">↗</span>
                    </a>
                    <span className="simple-education-stack">HTML, CSS, {project.database}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="simple-graduation">
              Graduated
              <br />
              <strong>{profile.graduated}</strong>
            </span>
          </div>
        </section>
        {/* Skills cards and icons from the shared catalog. */}
        <div id="simple-skills" className="simple-skills">
          <SkillsSection plain toolboxLink />
        </div>
        {/* Current and college project gallery callout. */}
        <section
          className="simple-section simple-project-callout"
          aria-labelledby="simple-project-title"
        >
          <BrandLogo decorative />
          <div>
            <p className="simple-eyebrow">CURRENT & COLLEGE PROJECTS</p>
            <h2 id="simple-project-title">See what I’m building.</h2>
            <p>
              Follow Re-spawnpoint, my current personal project, and explore COFFEEGO and Autoworld
              Carwash from college.
            </p>
          </div>
          <a className="simple-secondary" href={portfolioUrl()}>
            Open project gallery ↗
          </a>
        </section>
        {/* Contact copy controls and LinkedIn/GitHub links. */}
        <section
          className="simple-section simple-contact"
          id="simple-contact"
          aria-labelledby="simple-contact-title"
        >
          <div>
            <p className="simple-eyebrow">LET’S CONNECT</p>
            <h2 id="simple-contact-title">Get in touch.</h2>
            <p>
              Looking for a web developer or IT support?
              <br />
              You can reach me here.
            </p>
          </div>
          <div className="simple-contact-controls">
            <p>Click to copy a contact detail, or open a profile in a new tab.</p>
            {copyButton('email', 'EMAIL', contact.email)}
            {copyButton('phone', 'PHONE', contact.phone)}
            <SocialLinks />
          </div>
        </section>
      </main>
      {/* Footer: branding, About popup, and Back to top. */}
      <footer className="simple-footer">
        <span>
          <BrandLogo decorative />
          LunR Code · {profile.name}
        </span>
        <button type="button" onClick={onAbout}>
          About this portfolio
        </button>
        <a href="#simple-top">Back to top ↑</a>
      </footer>
    </div>
  )
}
