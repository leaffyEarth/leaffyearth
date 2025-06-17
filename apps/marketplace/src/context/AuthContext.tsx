'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  idToken: string | null;
  loading: boolean;
  error: Error | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  idToken: null,
  loading: true,
  error: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setIdToken(token);
        } catch (err) {
          setError(err as Error);
        }
      } else {
        setIdToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, idToken, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
