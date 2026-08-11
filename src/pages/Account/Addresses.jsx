import { useState } from 'react';
import { FaMapMarkerAlt, FaTrash, FaPlus, FaStar } from 'react-icons/fa';
import { useAddresses } from '../../context/AddressContext';
import './Account.css';

export default function Addresses() {
  const { addresses, addAddress, removeAddress, setDefault } = useAddresses();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: 'Home', name: '', phone: '', line1: '', city: '', state: '', pincode: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.line1 || !form.city || !form.state || !form.pincode) return;
    addAddress(form);
    setForm({ label: 'Home', name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
    setShowForm(false);
  };

  return (
    <div className="nc-acc-page">
      <h2>Saved Addresses</h2>
      <p className="nc-acc-page__sub">Manage your delivery addresses</p>

      <div className="nc-addresses">
        {addresses.map((a) => (
          <div key={a.id} className="nc-addresses__card neo-raised">
            <FaMapMarkerAlt className="nc-addresses__icon" />
            <div className="nc-addresses__info">
              <strong>{a.label} — {a.name} {a.isDefault && <span className="nc-addresses__badge">Default</span>}</strong>
              <p>{a.line1}, {a.city}, {a.state} {a.pincode}</p>
              <p>{a.phone}</p>
              {!a.isDefault && (
                <button className="nc-addresses__setdefault" onClick={() => setDefault(a.id)}>
                  <FaStar size={11} /> Set as default
                </button>
              )}
            </div>
            <button onClick={() => removeAddress(a.id)} aria-label="Delete address"><FaTrash /></button>
          </div>
        ))}

        {!showForm ? (
          <button className="nc-addresses__add neo-raised" onClick={() => setShowForm(true)}>
            <FaPlus /> Add New Address
          </button>
        ) : (
          <form className="nc-checkout__addrform neo-raised" onSubmit={submit}>
            <div className="nc-checkout__addrform-row">
              <input placeholder="Label (Home / Office)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
              <input placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="nc-checkout__addrform-row">
              <input placeholder="Phone Number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input placeholder="Pincode" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
            </div>
            <input placeholder="Address Line" required value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
            <div className="nc-checkout__addrform-row">
              <input placeholder="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input placeholder="State" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>
            <div className="nc-checkout__addrform-actions">
              <button type="submit" className="fk-btn fk-btn--primary">Save Address</button>
              <button type="button" className="fk-btn fk-btn--outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
