import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Mail, Phone, Github, Linkedin, MapPin, Code, Briefcase, GraduationCap, Award, Settings, Database, Cloud, Monitor, Zap, Cpu, Globe } from 'lucide-react';

const ColorfulPortfolio = ({ data }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="colorful-portfolio">
      {/* Navigation */}
      <nav className="colorful-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <Code className="brand-icon" />
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
      <section id="hero" className="colorful-hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-greeting">
                <Zap className="greeting-icon" />
                <span>Hello, I'm</span>
              </div>
              <h1 className="hero-name">{data.personal.name}</h1>
              <h2 className="hero-title">{data.personal.title}</h2>
              <p className="hero-description">{data.personal.summary}</p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Production Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">6+</div>
                  <div className="stat-label">Total Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Technologies</div>
                </div>
              </div>
              
              <div className="hero-cta">
                <a href="#experience" className="btn-primary-colorful">View My Work</a>
                <a href="#contact" className="btn-secondary-colorful">Let's Connect</a>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="tech-orbit">
                <div className="orbit-center">
                  <Cpu className="center-icon" />
                </div>
                <div className="orbit-item orbit-1">
                  <Monitor className="orbit-icon" />
                </div>
                <div className="orbit-item orbit-2">
                  <Database className="orbit-icon" />
                </div>
                <div className="orbit-item orbit-3">
                  <Cloud className="orbit-icon" />
                </div>
                <div className="orbit-item orbit-4">
                  <Globe className="orbit-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="colorful-about-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">About Me</div>
            <h2 className="section-title">Crafting Digital Experiences</h2>
            <p className="section-subtitle">Passionate about creating innovative solutions that make a difference</p>
          </div>
          
          <div className="about-grid">
            <div className="about-content">
              <div className="about-card">
                <div className="card-icon-wrapper">
                  <Briefcase className="card-icon" />
                </div>
                <h3 className="card-title">Professional Experience</h3>
                <p className="card-text">
                  Currently working as Software Engineer 1 at Linkfields Innovations, 
                  developing scalable SaaS solutions and enterprise applications.
                </p>
              </div>
              
              <div className="about-card">
                <div className="card-icon-wrapper">
                  <GraduationCap className="card-icon" />
                </div>
                <h3 className="card-title">Education</h3>
                <p className="card-text">
                  {data.education.degree} from {data.education.institution} 
                  with CGPA {data.education.cgpa}.
                </p>
              </div>
              
              <div className="about-card">
                <div className="card-icon-wrapper">
                  <Award className="card-icon" />
                </div>
                <h3 className="card-title">Achievements</h3>
                <p className="card-text">
                  Finalist in tech hackathons, top 5% on HackerRank, 
                  and multiple certifications in cloud and development.
                </p>
              </div>
            </div>

            <div className="skills-showcase">
              <div className="skills-header">
                <h3>Technical Expertise</h3>
              </div>
              
              <div className="skill-categories">
                <div className="skill-category-colorful">
                  <div className="category-header">
                    <Monitor className="category-icon frontend-icon" />
                    <span>Frontend</span>
                  </div>
                  <div className="skill-items">
                    {data.skills.frontend.slice(0, 6).map((skill, idx) => (
                      <span key={idx} className="skill-chip frontend-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="skill-category-colorful">
                  <div className="category-header">
                    <Database className="category-icon backend-icon" />
                    <span>Backend</span>
                  </div>
                  <div className="skill-items">
                    {data.skills.backend.slice(0, 6).map((skill, idx) => (
                      <span key={idx} className="skill-chip backend-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="skill-category-colorful">
                  <div className="category-header">
                    <Cloud className="category-icon cloud-icon" />
                    <span>Cloud & DevOps</span>
                  </div>
                  <div className="skill-items">
                    {data.skills.cloud.slice(0, 6).map((skill, idx) => (
                      <span key={idx} className="skill-chip cloud-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="colorful-experience-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Professional Work</div>
            <h2 className="section-title">Production Projects</h2>
            <p className="section-subtitle">Real-world applications built at Linkfields Innovations</p>
          </div>

          <div className="projects-grid-colorful">
            {data.experience[0].projects.map((project, idx) => (
              <div key={idx} className="project-card-colorful">
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.name} className="project-image" />
                  <div className="project-gradient-overlay"></div>
                  <div className="project-actions">
                    <a href={project.link} className="project-link-btn">
                      <ExternalLink className="link-icon" />
                      <span>View Project</span>
                    </a>
                  </div>
                </div>
                
                <div className="project-content-colorful">
                  <div className="project-header">
                    <h3 className="project-name">{project.name}</h3>
                    <div className="company-tag">Linkfields</div>
                  </div>
                  
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="tech-stack">
                    {project.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="impact-metrics">
                    {project.achievements.slice(0, 2).map((achievement, achIdx) => (
                      <div key={achIdx} className="metric-item">
                        <div className="metric-indicator"></div>
                        <span className="metric-text">{achievement}</span>
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
      <section id="projects" className="colorful-projects-toggle">
        <div className="container">
          <div className="toggle-wrapper">
            <button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="toggle-btn-colorful"
            >
              <span>{showAllProjects ? 'Hide Academic Projects' : 'Show All Projects'}</span>
              <ChevronDown className={`toggle-chevron ${showAllProjects ? 'rotated' : ''}`} />
            </button>
          </div>

          {showAllProjects && (
            <div className="academic-projects-section">
              <div className="section-header">
                <div className="section-tag">Academic Work</div>
                <h2 className="section-title">Education Projects</h2>
                <p className="section-subtitle">Learning and development projects during my academic journey</p>
              </div>
              
              <div className="academic-projects-grid">
                {data.educationProjects.map((project, idx) => (
                  <div key={idx} className="academic-project-card">
                    <div className="academic-project-header">
                      <div className="project-icon-wrapper">
                        <Code className="project-icon" />
                      </div>
                      <div className="project-meta">
                        <h3 className="project-title">{project.name}</h3>
                        <span className="project-duration">{project.duration}</span>
                      </div>
                    </div>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.map((tech, techIdx) => (
                        <span key={techIdx} className="tech-tag-academic">{tech}</span>
                      ))}
                    </div>
                    
                    <div className="project-highlights">
                      {project.achievements.slice(0, 2).map((achievement, achIdx) => (
                        <div key={achIdx} className="highlight-item">
                          <div className="highlight-dot"></div>
                          <span className="highlight-text">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="colorful-contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-header">
                <h2 className="contact-title">Let's Build Something Amazing</h2>
                <p className="contact-subtitle">
                  Ready to turn your ideas into reality? Let's collaborate and create 
                  innovative solutions together.
                </p>
              </div>
              
              <div className="contact-methods-colorful">
                <a href={`mailto:${data.personal.email}`} className="contact-item-colorful">
                  <div className="contact-icon-wrapper email-icon">
                    <Mail className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">{data.personal.email}</span>
                  </div>
                </a>
                
                <a href={`tel:${data.personal.phone}`} className="contact-item-colorful">
                  <div className="contact-icon-wrapper phone-icon">
                    <Phone className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Phone</span>
                    <span className="contact-value">{data.personal.phone}</span>
                  </div>
                </a>
                
                <a href={data.personal.linkedin} className="contact-item-colorful">
                  <div className="contact-icon-wrapper linkedin-icon">
                    <Linkedin className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">LinkedIn</span>
                    <span className="contact-value">Connect with me</span>
                  </div>
                </a>
                
                <a href={data.personal.github} className="contact-item-colorful">
                  <div className="contact-icon-wrapper github-icon">
                    <Github className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">GitHub</span>
                    <span className="contact-value">View my code</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="colorful-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Code className="footer-brand-icon" />
              <div className="footer-brand-text">
                <span className="footer-name">{data.personal.name}</span>
                <span className="footer-role">{data.personal.title}</span>
              </div>
            </div>
            
            <div className="footer-social">
              <a href={data.personal.github} className="social-link github-link">
                <Github className="social-icon" />
              </a>
              <a href={data.personal.linkedin} className="social-link linkedin-link">
                <Linkedin className="social-icon" />
              </a>
              <a href={`mailto:${data.personal.email}`} className="social-link email-link">
                <Mail className="social-icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 {data.personal.name}. Crafted with passion and code.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ColorfulPortfolio;