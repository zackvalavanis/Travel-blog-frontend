import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserContextType {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  name: '',
  setName: () => { },
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setNameState] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setNameState(storedName);
    }
    setLoading(false);
  }, []);

  const setName: Dispatch<SetStateAction<string>> = (value) => {
    const newName = typeof value === 'function' ? value(name) : value;
    setNameState(newName);
    localStorage.setItem('name', newName);
  };

  return (
    <UserContext.Provider value={{ name, setName, loading }}>
      {children}
    </UserContext.Provider>
  );
}
