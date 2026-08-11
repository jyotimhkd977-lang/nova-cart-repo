import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    toast.success('Account created — welcome to NovaCart!');
    navigate('/account/profile');
  };

  return (
    <div className="nc-auth">
      <div className="nc-auth__card neo-raised">
        <h1>Create your account</h1>
        <p>Join NovaCart for a smoother way to shop</p>

        <form onSubmit={submit}>
          <label className="nc-auth__field">
            <FaUser />
            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="nc-auth__field">
            <FaEnvelope />
            <input type="email" required placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="nc-auth__field">
            <FaLock />
            <input type="password" required placeholder="Create password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          <p className="nc-auth__terms">By signing up, you agree to NovaCart's Terms of Service and Privacy Policy.</p>
          <button type="submit" className="fk-btn fk-btn--accent" style={{ width: '100%', justifyContent: 'center' }}>Create Account</button>
        </form>

        <div className="nc-auth__divider"><span>or continue with</span></div>
        <div className="nc-auth__social">
          <button><FaGoogle /> Google</button>
          <button><FaFacebookF /> Facebook</button>
        </div>

        <p className="nc-auth__switch">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}
