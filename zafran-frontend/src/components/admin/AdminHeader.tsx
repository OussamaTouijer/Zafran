
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const AdminHeader = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold">Zafran Administration</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Connecté en tant que {user?.name || "Admin"}
        </span>
        <Button variant="outline" size="sm" onClick={logout}>
          Déconnexion
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
