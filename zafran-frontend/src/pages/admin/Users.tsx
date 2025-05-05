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
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    address: "",
    ville: "",
    role: "client",
    statu: "active"
  });

  const users = usersResponse?.data || [];
  const filteredUsers = users.filter(user => 
    (user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
        nom: currentUser.nom,
        prenom: currentUser.prenom,
        email: currentUser.email,
        telephone: currentUser.telephone,
        address: currentUser.address,
        ville: currentUser.ville,
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
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        address: "",
        ville: "",
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
                  <label htmlFor="nom">Nom</label>
                  <Input 
                    id="nom" 
                    value={newUser.nom} 
                    onChange={e => setNewUser({...newUser, nom: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="prenom">Prénom</label>
                  <Input 
                    id="prenom" 
                    value={newUser.prenom} 
                    onChange={e => setNewUser({...newUser, prenom: e.target.value})}
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
                  <label htmlFor="telephone">Téléphone</label>
                  <Input 
                    id="telephone" 
                    value={newUser.telephone} 
                    onChange={e => setNewUser({...newUser, telephone: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="address">Adresse</label>
                  <Input 
                    id="address" 
                    value={newUser.address} 
                    onChange={e => setNewUser({...newUser, address: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="ville">Ville</label>
                  <Input 
                    id="ville" 
                    value={newUser.ville} 
                    onChange={e => setNewUser({...newUser, ville: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="role">Rôle</label>
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
              <TableHead>Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.documentId}>
                <TableCell>{user.nom || "-"}</TableCell>
                <TableCell>{user.prenom || "-"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telephone || "-"}</TableCell>
                <TableCell>{user.ville || "-"}</TableCell>
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
                <label htmlFor="edit-nom">Nom</label>
                <Input 
                  id="edit-nom" 
                  value={currentUser?.nom || ""} 
                  onChange={e => setCurrentUser(currentUser ? {...currentUser, nom: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-prenom">Prénom</label>
                <Input 
                  id="edit-prenom" 
                  value={currentUser?.prenom || ""} 
                  onChange={e => setCurrentUser(currentUser ? {...currentUser, prenom: e.target.value} : null)}
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
                <label htmlFor="edit-telephone">Téléphone</label>
                <Input 
                  id="edit-telephone" 
                  value={currentUser?.telephone || ""} 
                  onChange={e => setCurrentUser(currentUser ? {...currentUser, telephone: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-address">Adresse</label>
                <Input 
                  id="edit-address" 
                  value={currentUser?.address || ""} 
                  onChange={e => setCurrentUser(currentUser ? {...currentUser, address: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-ville">Ville</label>
                <Input 
                  id="edit-ville" 
                  value={currentUser?.ville || ""} 
                  onChange={e => setCurrentUser(currentUser ? {...currentUser, ville: e.target.value} : null)}
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
