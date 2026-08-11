import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Account.css';

export default function Profile() {
  const [form, setForm] = useState({ name: 'Alex Morgan', email: 'alex.morgan@example.com', phone: '+91 98765 43210' });

  const save = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  return (
    <div className="nc-acc-page">
      <h2>Profile</h2>
      <p className="nc-acc-page__sub">Manage your personal information</p>

      <div className="nc-profile__avatar">
        <img src="https://picsum.photos/seed/novacart-user/120/120" alt="Profile" />
        <button aria-label="Change photo"><FaCamera /></button>
      </div>

      <form className="nc-acc-form" onSubmit={save}>
        <div className="nc-acc-form__row">
          <label>
            <span>Full Name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            <span>Phone Number</span>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
        </div>
        <label>
          <span>Email Address</span>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <button type="submit" className="fk-btn fk-btn--accent">Save Changes</button>
      </form>
    </div>
  );
}
