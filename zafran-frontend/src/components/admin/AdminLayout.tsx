
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useAuth } from "@/hooks/useAuth";

const AdminLayout = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <div className="p-8 text-center">Accès non autorisé</div>;
  }
  
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 bg-muted/30 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
