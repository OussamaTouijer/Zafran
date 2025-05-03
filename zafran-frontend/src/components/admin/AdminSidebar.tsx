
import { NavLink } from "react-router-dom";
import { BarChart, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";

const AdminSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="py-4 flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <img src="/src/assets/zafran-logo.png" alt="Zafran" className="h-10 w-auto" />
            <h1 className="font-bold text-lg">Admin</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin" className={({ isActive }) => 
                  cn("flex items-center", isActive ? "text-primary" : "")
                } end>
                  <BarChart className="mr-2 h-5 w-5" />
                  <span>Tableau de bord</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/users" className={({ isActive }) => 
                  cn("flex items-center", isActive ? "text-primary" : "")
                }>
                  <Users className="mr-2 h-5 w-5" />
                  <span>Utilisateurs</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/services" className={({ isActive }) => 
                  cn("flex items-center", isActive ? "text-primary" : "")
                }>
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Services</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/admin/orders" className={({ isActive }) => 
                  cn("flex items-center", isActive ? "text-primary" : "")
                }>
                  <BarChart className="mr-2 h-5 w-5" />
                  <span>Commandes</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AdminSidebar;
