// src/app/page.jsx

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page on component mount
    router.push('/auth/login');
  }, [router]);

  return null; // Return null because no UI is needed
};

export default HomePage;
