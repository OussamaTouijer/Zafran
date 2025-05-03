
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: "active" | "inactive";
  imageUrl?: string;
}

const mockServices: Service[] = [
  {
    id: "1",
    title: "Service Traiteur Prestige",
    description: "Notre service traiteur haut de gamme s'adapte à tous vos événements professionnels ou privés.",
    price: 45,
    category: "Traiteur",
    status: "active",
    imageUrl: "/uploads/traiteur_dc7b607104.png"
  },
  {
    id: "2",
    title: "Chef à Domicile",
    description: "Offrez-vous les services d'un chef professionnel à domicile.",
    price: 150,
    category: "Traiteur",
    status: "active",
    imageUrl: "/uploads/chef_a_domicile_72677e2772.png"
  },
  {
    id: "3",
    title: "Organisation d'Événements",
    description: "De la conception à la réalisation, nous prenons en charge l'organisation complète de vos événements.",
    price: 1200,
    category: "Événements",
    status: "active",
    imageUrl: "/uploads/organisationevenements_2256132b73.png"
  },
  {
    id: "4",
    title: "Cours de Cuisine Gourmande",
    description: "Apprenez à cuisiner comme un chef avec nos cours thématiques.",
    price: 75,
    category: "Cours",
    status: "inactive",
    imageUrl: "/uploads/cours_cuisine_a60b4b3a42.png"
  }
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    title: "",
    description: "",
    price: 0,
    category: "Traiteur",
    status: "active"
  });

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      setServices(services.filter(service => service.id !== serviceId));
      toast.success("Service supprimé avec succès");
    }
  };

  const handleUpdateService = () => {
    if (!currentService) return;
    
    setServices(services.map(service => 
      service.id === currentService.id ? currentService : service
    ));
    setIsEditDialogOpen(false);
    toast.success("Service mis à jour avec succès");
  };

  const handleAddService = () => {
    const service: Service = {
      id: Math.random().toString(36).substr(2, 9),
      title: newService.title || "",
      description: newService.description || "",
      price: newService.price || 0,
      category: newService.category || "Traiteur",
      status: newService.status as "active" | "inactive" || "active",
    };
    
    setServices([...services, service]);
    setNewService({
      title: "",
      description: "",
      price: 0,
      category: "Traiteur",
      status: "active"
    });
    setIsAddDialogOpen(false);
    toast.success("Service ajouté avec succès");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des services</h1>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Ajouter un service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="title">Titre</label>
                  <Input 
                    id="title" 
                    value={newService.title} 
                    onChange={e => setNewService({...newService, title: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Textarea 
                    id="description" 
                    value={newService.description} 
                    onChange={e => setNewService({...newService, description: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="price">Prix (€)</label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={newService.price} 
                    onChange={e => setNewService({...newService, price: Number(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="category">Catégorie</label>
                  <Select 
                    value={newService.category} 
                    onValueChange={(value) => setNewService({...newService, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Traiteur">Traiteur</SelectItem>
                      <SelectItem value="Événements">Événements</SelectItem>
                      <SelectItem value="Cours">Cours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="status">Statut</label>
                  <Select 
                    value={newService.status} 
                    onValueChange={(value) => setNewService({...newService, status: value as "active" | "inactive"})}
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
              <Button onClick={handleAddService}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input
            placeholder="Rechercher des services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  {service.imageUrl && (
                    <img 
                      src={`http://localhost:1337${service.imageUrl}`} 
                      alt={service.title} 
                      className="w-16 h-12 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{service.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{service.price} €</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>
                  {service.status === "active" ? (
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      Actif
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                      Inactif
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                      Modifier
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service.id)}>
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
            <DialogTitle>Modifier le service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="edit-title">Titre</label>
                <Input 
                  id="edit-title" 
                  value={currentService?.title} 
                  onChange={e => setCurrentService(currentService ? {...currentService, title: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-description">Description</label>
                <Textarea 
                  id="edit-description" 
                  value={currentService?.description} 
                  onChange={e => setCurrentService(currentService ? {...currentService, description: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-price">Prix (€)</label>
                <Input 
                  id="edit-price" 
                  type="number" 
                  value={currentService?.price} 
                  onChange={e => setCurrentService(currentService ? {...currentService, price: Number(e.target.value)} : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-category">Catégorie</label>
                <Select 
                  value={currentService?.category} 
                  onValueChange={(value) => setCurrentService(currentService ? {...currentService, category: value} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Traiteur">Traiteur</SelectItem>
                    <SelectItem value="Événements">Événements</SelectItem>
                    <SelectItem value="Cours">Cours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-status">Statut</label>
                <Select 
                  value={currentService?.status} 
                  onValueChange={(value) => setCurrentService(currentService ? {...currentService, status: value as "active" | "inactive"} : null)}
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
            <Button onClick={handleUpdateService}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
