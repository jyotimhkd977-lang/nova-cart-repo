import { FaBullseye, FaLeaf, FaUsers, FaRocket } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './About.css';

const values = [
  { icon: <FaBullseye />, title: 'Purposeful Design', text: 'Every screen is built around what shoppers actually need, not decoration for its own sake.' },
  { icon: <FaLeaf />, title: 'Sustainable Sourcing', text: 'We partner with brands that care about their materials and their footprint.' },
  { icon: <FaUsers />, title: 'Community First', text: 'Feedback from real shoppers shapes every feature we ship.' },
  { icon: <FaRocket />, title: 'Always Improving', text: 'New arrivals, better UX, faster checkout — every week.' },
];

export default function About() {
  return (
    <div className="container nc-about">
      <Breadcrumb items={[{ label: 'About' }]} />
      <div className="nc-about__hero">
        <h1>We're building a softer way to shop online</h1>
        <p>NovaCart started with a simple question: why does online shopping feel so cluttered? We set out to design a store that feels calm, fast and genuinely helpful — from browsing to checkout.</p>
      </div>

      <div className="nc-about__values">
        {values.map((v) => (
          <div key={v.title} className="nc-about__value neo-raised">
            <div className="nc-about__value-icon">{v.icon}</div>
            <h4>{v.title}</h4>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <div className="nc-about__stats neo-raised">
        <div><strong>2021</strong><span>Founded</span></div>
        <div><strong>12k+</strong><span>Products Listed</span></div>
        <div><strong>500k+</strong><span>Happy Customers</span></div>
        <div><strong>40+</strong><span>Countries Shipped To</span></div>
      </div>
    </div>
  );
}
