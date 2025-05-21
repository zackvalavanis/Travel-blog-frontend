import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

// Correct type for context value
interface UserContextType {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

// Create the context with default values
export const UserContext = createContext<UserContextType>({
  name: '',
  setName: () => { }, // just a placeholder, never actually used
});

// Create a provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>('');

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}
