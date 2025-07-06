import React, { useState, useEffect } from 'react';
import '../../styles/style.css';

const ContactUs = () => {
  const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;
  const [appear, setAppear] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setFormData({ user_name: '', user_email: '', message: '' });
        setStatusMessage({ text: "Message received. I'll get back to you soon.", type: 'success' });
        setShowPopup(true);
      } else if (result.details) {
        const detailText = result.details.map((d: any) => d.message).join(', ');
        setStatusMessage({ text: `${detailText}`, type: 'error' });
        setShowPopup(true);
      } else {
        setStatusMessage({ text: `${result.error || 'Unknown error'}`, type: 'error' });
        setShowPopup(true);
      }

    } catch (error) {
      setStatusMessage({ text: 'Message failed to send! Please send message again in a few minutes', type: 'error' });
      setShowPopup(true);
      // console.error('FAILED...', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setAppear(true), 100);
    return() => clearTimeout(timer);
  }, []);

  const Popup = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--bg-color)] backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] flex flex-col">
        <div className={`font-bold text-lg md:text-xl xl:text-2xl mb-2 ${statusMessage?.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {statusMessage?.type === 'success' ? 'Success' : 'Failed'}
        </div>
        <div className="mb-6 md:mb-4 text-base md:text-lg xl:text-xl">{statusMessage?.text}</div>
        <button
          className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--hover-color)] active:shadow-xl active:bg-[var(--secondary-color)] self-end"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <form className="flex flex-col items-center" onSubmit={sendEmail}>
        <div className="w-full md:w-[80%] space-y-4">
          <div className={`form ${ appear? `opacity-100 translate-y-0` : `opacity-0 translate-y-40` }`}>
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
          <div className={`form ${ appear? `opacity-100 translate-y-0` : `opacity-0 translate-y-30` }`}>
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
          <div className={`form ${ appear? `opacity-100 translate-y-0` : `opacity-0 translate-y-10` }`}>
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
            className="
              rounded-full bg-[var(--primary-color)] font-semibold text-white 
              w-[33%] md:w-[25%] py-2 px-4 md:py-3 md:px-8
              hover:bg-[var(--hover-color)] hover:shadow-lg transition
              active:bg-[var(--secondary-color)] active:shadow-md disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </div>

      {/* {statusMessage && (
        <div className={`mt-6 text-center font-semibold ${statusMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {statusMessage.text}
        </div>
      )} */}

      </form>

      {showPopup && statusMessage && <Popup />}

    </>
  );
};

export default ContactUs;
