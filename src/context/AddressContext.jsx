import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';

const AddressContext = createContext(null);

const defaultAddresses = [
  { id: 1, label: 'Home', name: 'Alex Morgan', phone: '+91 98765 43210', line1: '221B, Baker Street', city: 'Bhubaneswar', state: 'Odisha', pincode: '751001', isDefault: true },
  { id: 2, label: 'Office', name: 'Alex Morgan', phone: '+91 98765 43210', line1: '4th Floor, Infocity Tower', city: 'Bhubaneswar', state: 'Odisha', pincode: '751024', isDefault: false },
];

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useLocalStorage('novacart_addresses', defaultAddresses);
  const [selectedId, setSelectedId] = useLocalStorage('novacart_selected_address', 1);

  const addAddress = (addr) => {
    const id = Date.now();
    const isFirst = addresses.length === 0;
    setAddresses((prev) => [...prev, { ...addr, id, isDefault: isFirst }]);
    setSelectedId(id);
    toast.success('New address added');
    return id;
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.info('Address removed');
  };

  const setDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const selectedAddress = addresses.find((a) => a.id === selectedId) || addresses[0];

  return (
    <AddressContext.Provider value={{ addresses, addAddress, removeAddress, setDefault, selectedId, setSelectedId, selectedAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddresses = () => useContext(AddressContext);
