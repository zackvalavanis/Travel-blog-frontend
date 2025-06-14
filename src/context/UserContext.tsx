import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserContextType {
  id: number | undefined,
  setUserId: Dispatch<SetStateAction<number | undefined>>
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  id: undefined,
  setUserId: () => { },
  name: '',
  setName: () => { },
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [id, setUserId] = useState<number>()
  const [name, setNameState] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedId = localStorage.getItem('userId');
    if (storedId) setUserId(Number(storedId));

    if (storedName) {
      setNameState(storedName);
    }
    if (storedId) {
      setUserId(parseInt(storedId))
    }
    setLoading(false);
  }, []);

  const setName: Dispatch<SetStateAction<string>> = (value) => {
    const newName = typeof value === 'function' ? value(name) : value;
    setNameState(newName);
    localStorage.setItem('name', newName);
  };

  return (
    <UserContext.Provider value={{ id, setUserId, name, setName, loading }}>
      {children}
    </UserContext.Provider>
  );
}
