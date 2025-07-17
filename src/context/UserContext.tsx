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
  profileImage: string;
  setProfileImage: Dispatch<SetStateAction<string>>;
  loading: boolean;
  location: { lat: number | null; lon: number | null };
  setLocation: Dispatch<SetStateAction<{ lat: number | null; lon: number | null }>>;
  requestLocation: () => Promise<{ lat: number | null; lon: number | null }>;
}

export const UserContext = createContext<UserContextType>({
  id: undefined,
  setUserId: () => { },
  name: '',
  setName: () => { },
  profileImage: '',
  setProfileImage: () => { },
  loading: true,
  location: { lat: null, lon: null },
  setLocation: () => { },
  requestLocation: async () => ({ lat: null, lon: null }),
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [id, setUserId] = useState<number>()
  const [name, setNameState] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null })

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

  const requestLocation = (): Promise<{ lat: number | null; lon: number | null }> => {
    console.log("📍 Requesting location...");

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.log("🚫 Geolocation not supported");
        resolve({ lat: null, lon: null });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          console.log("✅ Got location:", coords);  // ✅ Add this
          setLocation(coords);
          resolve(coords);
        },
        (error) => {
          console.error("❌ Geolocation error:", error.code, error.message);  // ✅ Add this
          resolve({ lat: null, lon: null });
        },
        {
          timeout: 10000,
          maximumAge: 0,
          enableHighAccuracy: true,
        }
      );
    });
  };

  return (
    <UserContext.Provider value={{ id, setUserId, name, setName, profileImage, setProfileImage, loading, location, setLocation, requestLocation }}>
      {children}
    </UserContext.Provider>
  );
}
