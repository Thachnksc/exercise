import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  role?: "admin" | "student";
  children: ReactNode;
}

export default function ProtectedRoute({ role, children }: Props) {
  const currentRole = localStorage.getItem("role");

  if (!currentRole) return <Navigate to="/" replace />;
  if (role && role !== currentRole) return <Navigate to="/" replace />;

  return <>{children}</>;
}
