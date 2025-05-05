import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useUsers, createUser, updateUser, deleteUser, User } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

const Users = () => {
  const queryClient = useQueryClient();
  const { data: usersResponse, isLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "client",
    statu: "active"
  });

  const users = usersResponse?.data || [];
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = async (documentId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await deleteUser(documentId);
        await queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success("Utilisateur supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'utilisateur");
      }
    }
  };

  const handleUpdateUser = async () => {
    if (!currentUser) return;
    
    try {
      const userData = {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        statu: currentUser.statu,
        dateCreated: currentUser.dateCreated
      };
      
      await updateUser(currentUser.documentId, userData);
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsEditDialogOpen(false);
      toast.success("Utilisateur mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  const handleAddUser = async () => {
    try {
      await createUser(newUser);
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setNewUser({
        name: "",
        email: "",
        role: "client",
        statu: "active"
      });
      setIsAddDialogOpen(false);
      toast.success("Utilisateur ajouté avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'utilisateur");
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Ajouter un utilisateur</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Nom complet</label>
                  <Input 
                    id="name" 
                    value={newUser.name} 
                    onChange={e => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={newUser.email} 
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="role">Role</label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({...newUser, role: value as "admin" | "client"})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="status">Statut</label>
                  <Select 
                    value={newUser.statu} 
                    onValueChange={(value) => setNewUser({...newUser, statu: value as "active" | "inactive"})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddUser}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input
            placeholder="Rechercher des utilisateurs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.documentId}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "admin" ? (
                    <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                      Administrateur
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      Client
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {user.statu === "active" ? (
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      Actif
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                      Inactif
                    </span>
                  )}
                </TableCell>
                <TableCell>{user.dateCreated || user.createdAt.split('T')[0]}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                      Modifier
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.documentId)}>
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name">Nom complet</label>
                <Input 
                  id="edit-name" 
                  value={currentUser?.name} 
                  onChange={e => setCurrentUser(currentUser ? {...currentUser, name: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-email">Email</label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={currentUser?.email} 
                  onChange={e => setCurrentUser(currentUser ? {...currentUser, email: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-role">Rôle</label>
                <Select 
                  value={currentUser?.role} 
                  onValueChange={(value) => setCurrentUser(currentUser ? {...currentUser, role: value as "admin" | "client"} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-status">Statut</label>
                <Select 
                  value={currentUser?.statu} 
                  onValueChange={(value) => setCurrentUser(currentUser ? {...currentUser, statu: value as "active" | "inactive"} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleUpdateUser}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
