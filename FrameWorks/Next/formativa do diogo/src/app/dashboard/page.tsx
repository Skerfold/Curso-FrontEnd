"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardAdmin from "@/app/components/DashboardAdmin";
import DashboardGerente from "@/app/components/DashboardGerente";
import DashboardTecnico from "@/app/components/DashboardTecnico";

export default function DashboardPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      router.push("/login");
    } else {
      setUserRole(role);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const renderDashboard = () => {
    if (userRole?.toLowerCase() === "admin") {
      return <DashboardAdmin />;
    } else if (userRole === "gerente") {
      return <DashboardGerente />;
    } else if (userRole === "tecnico") {
      return <DashboardTecnico />;
    }
  };

  return (
    <div>
      <header>
        <h1>Dashboard Principal</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        {renderDashboard()}
      </main>
    </div>
  );
}
