import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/style.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setStatusMessage(null);

    try {
      await emailjs.send('service_slrdlkp', 'template_4cl1i2y', formData, {
        publicKey: 'KfuiBZGsjeoCLtSxj',
      });
      setFormData({ user_name: '', user_email: '', message: '' });
      setStatusMessage({ text: '✅ Message Sent Successfully! We will respond soon. 😊', type: 'success' });
    } catch (error) {
      setStatusMessage({ text: '❌ Message Failed to Send! Please check your connection.', type: 'error' });
      console.error('FAILED...', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col items-center" onSubmit={sendEmail}>
      <div className="w-full md:w-[80%] space-y-4">
        <div className="form">
          <label htmlFor="name" className="label">Name</label>
          <input 
            type="text" 
            id="name" 
            name="user_name" 
            className="input" 
            value={formData.user_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form">
          <label htmlFor="email" className="label">Email</label>
          <input 
            type="email" 
            id="email" 
            name="user_email" 
            className="input" 
            value={formData.user_email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form">
          <label htmlFor="message" className="label">Message</label>
          <textarea 
            id="message" 
            name="message" 
            className="h-32 input" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>

      <div className="flex justify-end w-full md:w-[80%]">
        <button
          className="rounded-full bg-[var(--primary-color)] font-semibold text-white 
          w-[33%] md:w-[25%] py-2 px-4 md:py-3 md:px-8
          hover:bg-[var(--hover-color)] hover:shadow-lg transition
          active:bg-[var(--secondary-color)] active:shadow-md disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>

      </div>

      {statusMessage && (
        <div className={`mt-6 text-center font-semibold ${statusMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {statusMessage.text}
        </div>
      )}

    </form>
  );
};

export default ContactUs;
