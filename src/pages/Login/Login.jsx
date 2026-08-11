import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    toast.success('Welcome back to NovaCart!');
    navigate('/account/profile');
  };

  return (
    <div className="nc-auth">
      <div className="nc-auth__card neo-raised">
        <h1>Welcome back</h1>
        <p>Log in to continue shopping with NovaCart</p>

        <form onSubmit={submit}>
          <label className="nc-auth__field">
            <FaEnvelope />
            <input type="email" required placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="nc-auth__field">
            <FaLock />
            <input type="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          <div className="nc-auth__row">
            <label className="nc-auth__check"><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="fk-btn fk-btn--accent" style={{ width: '100%', justifyContent: 'center' }}>Log In</button>
        </form>

        <div className="nc-auth__divider"><span>or continue with</span></div>
        <div className="nc-auth__social">
          <button><FaGoogle /> Google</button>
          <button><FaFacebookF /> Facebook</button>
        </div>

        <p className="nc-auth__switch">Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
}
