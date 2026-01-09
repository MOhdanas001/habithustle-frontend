"use client";

import Navbar from "./Navbar";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export default function AuthNavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading,refetch } = useUser();
  useEffect(() => {
    refetch();
  }, []); 

  if (loading) return null;

  return (
    <>
      {user ? <Navbar /> : ''}
      {children}
    </>
  );
}
