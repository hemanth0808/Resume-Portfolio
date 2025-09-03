import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Mail, Phone, Github, Linkedin, MapPin, Code, Briefcase, GraduationCap, Award, Settings, Database, Cloud, Monitor } from 'lucide-react';

const MonochromePortfolio = ({ data }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="monochrome-portfolio">
      {/* Navigation */}
      <nav className="monochrome-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-text">{data.personal.name}</span>
          </div>
          <div className="nav-links">
            <a href="#hero" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop" 
            alt="Developer workspace" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{data.personal.name}</h1>
            <p className="hero-subtitle">{data.personal.title}</p>
            <p className="hero-description">{data.personal.summary}</p>
            <div className="hero-cta">
              <a href="#experience" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">Get In Touch</a>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <ChevronDown className="scroll-icon" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Passionate developer crafting digital solutions</p>
          </div>
          
          <div className="about-grid">
            <div className="about-content">
              <div className="about-text">
                <p className="about-paragraph">
                  I'm a results-driven Full Stack Developer with expertise in modern web technologies. 
                  My passion lies in creating scalable, efficient applications that solve real-world problems.
                </p>
                <p className="about-paragraph">
                  With experience in both frontend and backend development, I bring a holistic approach 
                  to every project, ensuring seamless user experiences and robust system architecture.
                </p>
              </div>
              
              <div className="contact-info">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>{data.personal.email}</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>{data.personal.phone}</span>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>{data.personal.location}</span>
                </div>
              </div>
            </div>

            <div className="skills-section">
              <div className="skill-category">
                <div className="skill-header">
                  <Monitor className="skill-icon" />
                  <h3>Frontend</h3>
                </div>
                <div className="skill-tags">
                  {data.skills.frontend.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <div className="skill-header">
                  <Database className="skill-icon" />
                  <h3>Backend</h3>
                </div>
                <div className="skill-tags">
                  {data.skills.backend.slice(0, 8).map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <div className="skill-header">
                  <Cloud className="skill-icon" />
                  <h3>Cloud & DevOps</h3>
                </div>
                <div className="skill-tags">
                  {data.skills.cloud.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">Production-level projects at Linkfields Innovations</p>
          </div>

          <div className="experience-grid">
            {data.experience[0].projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                  <div className="project-overlay">
                    <a href={project.link} className="project-link">
                      <ExternalLink className="link-icon" />
                    </a>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.name}</h3>
                    <span className="company-badge">Linkfields Innovations</span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="project-achievements">
                    {project.achievements.slice(0, 2).map((achievement, achIdx) => (
                      <div key={achIdx} className="achievement-item">
                        <div className="achievement-bullet"></div>
                        <span className="achievement-text">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Toggle Section */}
      <section id="projects" className="projects-toggle-section">
        <div className="container">
          <div className="toggle-container">
            <button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="toggle-projects-btn"
            >
              {showAllProjects ? 'Show Featured Projects Only' : 'View All Projects'}
              <ChevronDown className={`toggle-icon ${showAllProjects ? 'rotated' : ''}`} />
            </button>
          </div>

          {showAllProjects && (
            <div className="all-projects-section">
              <div className="section-header">
                <h2 className="section-title">Education Projects</h2>
                <p className="section-subtitle">Academic and learning projects</p>
              </div>
              
              <div className="education-projects-grid">
                {data.educationProjects.map((project, idx) => (
                  <div key={idx} className="education-project-card">
                    <div className="project-image">
                      <img src={project.image} alt={project.name} />
                    </div>
                    
                    <div className="project-content">
                      <div className="project-header">
                        <h3 className="project-title">{project.name}</h3>
                        <span className="duration-badge">{project.duration}</span>
                      </div>
                      
                      <p className="project-description">{project.description}</p>
                      
                      <div className="project-tech">
                        {project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="project-achievements">
                        {project.achievements.slice(0, 2).map((achievement, achIdx) => (
                          <div key={achIdx} className="achievement-item">
                            <div className="achievement-bullet"></div>
                            <span className="achievement-text">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-content">
              <h2 className="contact-title">Let's Work Together</h2>
              <p className="contact-description">
                Ready to bring your next project to life? Let's discuss how we can create 
                something amazing together.
              </p>
              
              <div className="contact-methods">
                <a href={`mailto:${data.personal.email}`} className="contact-method">
                  <Mail className="contact-method-icon" />
                  <span>{data.personal.email}</span>
                </a>
                
                <a href={`tel:${data.personal.phone}`} className="contact-method">
                  <Phone className="contact-method-icon" />
                  <span>{data.personal.phone}</span>
                </a>
                
                <a href={data.personal.linkedin} className="contact-method">
                  <Linkedin className="contact-method-icon" />
                  <span>LinkedIn Profile</span>
                </a>
                
                <a href={data.personal.github} className="contact-method">
                  <Github className="contact-method-icon" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" placeholder="Your name" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="your.email@example.com" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows="4" placeholder="Tell me about your project..."></textarea>
                </div>
                
                <button type="submit" className="btn-primary contact-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-name">{data.personal.name}</span>
              <span className="footer-title">{data.personal.title}</span>
            </div>
            
            <div className="footer-links">
              <a href={data.personal.github} className="footer-link">
                <Github className="footer-icon" />
              </a>
              <a href={data.personal.linkedin} className="footer-link">
                <Linkedin className="footer-icon" />
              </a>
              <a href={`mailto:${data.personal.email}`} className="footer-link">
                <Mail className="footer-icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 {data.personal.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MonochromePortfolio;