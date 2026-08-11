import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ title, links }) {
  return (
    <aside className="nc-sidebar neo-raised">
      {title && <h4>{title}</h4>}
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            {l.icon} <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
