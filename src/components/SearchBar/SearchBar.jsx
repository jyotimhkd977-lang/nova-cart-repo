import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

export default function SearchBar({ initialValue = '', onSearch, placeholder = 'Search NovaCart...' }) {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form className="nc-searchbar neo-pressed" onSubmit={submit}>
      <FaSearch />
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
      <button type="submit">Search</button>
    </form>
  );
}
