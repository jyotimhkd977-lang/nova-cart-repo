import { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaTruck, FaUndo, FaCreditCard } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Help.css';

const faqs = [
  { q: 'How do I track my order?', a: 'Go to Account > Orders to see real-time tracking for every order you\'ve placed with NovaCart.' },
  { q: 'What is your return policy?', a: 'Most items can be returned within 7 days of delivery, provided they\'re unused and in original packaging.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days. Express delivery arrives within 1-2 business days.' },
  { q: 'Can I change my delivery address after ordering?', a: 'You can update your address within 1 hour of placing an order by contacting support.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, and cash on delivery for eligible orders.' },
  { q: 'Do you ship internationally?', a: 'Yes, NovaCart currently ships to over 40 countries with rates calculated at checkout.' },
];

const topics = [
  { icon: <FaTruck />, title: 'Shipping', text: 'Delivery times, tracking, and costs' },
  { icon: <FaUndo />, title: 'Returns', text: 'How to return or exchange an item' },
  { icon: <FaCreditCard />, title: 'Payments', text: 'Billing, refunds, and payment methods' },
];

export default function Help() {
  const [open, setOpen] = useState(0);

  return (
    <div className="container nc-help">
      <Breadcrumb items={[{ label: 'Help' }]} />
      <div className="nc-page-header"><h1>Help Center</h1><p>Find answers to common questions or reach out to our team</p></div>

      <div className="nc-help__topics">
        {topics.map((t) => (
          <div key={t.title} className="nc-help__topic neo-raised">
            <div className="nc-help__topic-icon">{t.icon}</div>
            <div><h4>{t.title}</h4><p>{t.text}</p></div>
          </div>
        ))}
      </div>

      <h3 className="nc-help__faqtitle"><FaQuestionCircle /> Frequently Asked Questions</h3>
      <div className="nc-help__faqs">
        {faqs.map((f, i) => (
          <div key={f.q} className={`nc-help__faq neo-raised ${open === i ? 'is-open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <FaChevronDown className="nc-help__chevron" />
            </button>
            {open === i && <p>{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
