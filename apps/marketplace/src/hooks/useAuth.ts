'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
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

  return { user, idToken, loading, error };
};
