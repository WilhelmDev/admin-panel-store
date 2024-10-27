import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import useFirebase from '@/hooks/useFirebase';
import routes from '@/utils/routes';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { app } = useFirebase()
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(routes.login);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return <>{children}</>;
};

export default ProtectedRoute;