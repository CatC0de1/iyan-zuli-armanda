import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null); // Explicit type for the ref

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Type guard to ensure form.current is not null
    if (form.current) {
      const formData = new FormData(form.current);
      const user_name = formData.get("user_name")?.toString();
      const user_email = formData.get("user_email")?.toString();
      const message = formData.get("message")?.toString();
      emailjs
        .sendForm('service_slrdlkp', 'template_4cl1i2y', form.current, {
          publicKey: 'KfuiBZGsjeoCLtSxj',
        })
        .then(
          () => {
            form.current?.reset();
            alert('Message Sent Succesfully! Just Wait For Our Response😊');
          },
          (error) => {
            alert('Message Failed to Send! Please Check Your Connection!');
            console.log('FAILED...', error.text);
          }
        );
    }
  };

  return (
    <form className="flex flex-col items-center" ref={form} onSubmit={sendEmail}>
      <div className="w-full md:w-[80%]">
        <div className="form">
          <label htmlFor="name" className="label">Name</label>
          <input type="text" id="name" name="user_name" className="input" required />
        </div>
        <div className="form">
          <label htmlFor="email" className="label">Email</label>
          <input type="email" id="email" name="user_email" className="input" required />
        </div>
        <div className="form">
          <label htmlFor="message" className="label">Message</label>
          <textarea id="message" name="message" className="h-32 input" required></textarea>
        </div>
      </div>
      <div className="flex justify-end w-full md:w-[80%]">
        <button
          className="rounded-full bg-(--primary-color) font-semibold text-white 
          w-[33%] md:w-[25%] py-2 px-4 md:py-3 md:px-8
          hover:bg-(--hover-color) hover:shadow-lg transition duration-500"
          type="submit"
          id="sendButton"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactUs;