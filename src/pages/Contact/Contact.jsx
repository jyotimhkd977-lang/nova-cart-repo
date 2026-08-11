import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    toast.success('Message sent — we\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container nc-contact">
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <div className="nc-page-header"><h1>Get in Touch</h1><p>Questions, feedback, or just want to say hi? We'd love to hear from you.</p></div>

      <div className="nc-contact__grid">
        <div className="nc-contact__info">
          <div className="nc-contact__card neo-raised">
            <FaEnvelope />
            <div><h4>Email</h4><p>support@novacart.com</p></div>
          </div>
          <div className="nc-contact__card neo-raised">
            <FaPhone />
            <div><h4>Phone</h4><p>+1 (555) 012-3456</p></div>
          </div>
          <div className="nc-contact__card neo-raised">
            <FaMapMarkerAlt />
            <div><h4>Office</h4><p>Salt Lake, Kolkata, WB</p></div>
          </div>
        </div>

        <form className="nc-contact__form neo-raised" onSubmit={submit}>
          <input placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Your email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <textarea placeholder="Your message" rows="5" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button type="submit" className="fk-btn fk-btn--accent">Send Message</button>
        </form>
      </div>
    </div>
  );
}
