import React from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { Loader2 } from 'lucide-react';

const ContactForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  } = useContactForm();

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input 
            type="text" 
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea 
            className={`form-textarea ${errors.message ? 'error' : ''}`}
            rows="4" 
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            disabled={isSubmitting}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        
        <button 
          type="submit" 
          className="btn-primary-colorful contact-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="loading-icon" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;