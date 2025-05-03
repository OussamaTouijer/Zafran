
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
  DialogFooter, 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  date: string;
  amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Hassan Jouahri",
    customerEmail: "hassan@example.com",
    serviceName: "Service Traiteur Prestige",
    date: "2025-05-15",
    amount: 720,
    status: "confirmed",
  },
  {
    id: "ORD-002",
    customerName: "Leila Bennani",
    customerEmail: "leila@example.com",
    serviceName: "Chef à Domicile",
    date: "2025-05-20",
    amount: 300,
    status: "pending",
  },
  {
    id: "ORD-003",
    customerName: "Omar El Fassi",
    customerEmail: "omar@example.com",
    serviceName: "Organisation d'Événements",
    date: "2025-06-10",
    amount: 5500,
    status: "completed",
  },
  {
    id: "ORD-004",
    customerName: "Nadia Sabri",
    customerEmail: "nadia@example.com",
    serviceName: "Cours de Cuisine Gourmande",
    date: "2025-05-12",
    amount: 225,
    status: "cancelled",
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  
  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (status: "pending" | "confirmed" | "completed" | "cancelled") => {
    if (!currentOrder) return;
    
    const updatedOrder = { ...currentOrder, status };
    setOrders(orders.map(order => 
      order.id === currentOrder.id ? updatedOrder : order
    ));
    setCurrentOrder(updatedOrder);
    toast.success(`Statut de la commande mis à jour: ${status}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  // Count orders by status
  const orderCounts = {
    total: orders.length,
    pending: orders.filter(order => order.status === 'pending').length,
    confirmed: orders.filter(order => order.status === 'confirmed').length,
    completed: orders.filter(order => order.status === 'completed').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length,
  };

  // Calculate total revenue
  const totalRevenue = orders
    .filter(order => order.status !== 'cancelled')
    .reduce((total, order) => total + order.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des commandes</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCounts.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{orderCounts.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderCounts.completed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue} €</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input
            placeholder="Rechercher des commandes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell>{order.serviceName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.amount} €</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                    Gérer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Détails de la commande {currentOrder?.id}</DialogTitle>
          </DialogHeader>
          {currentOrder && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{currentOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{currentOrder.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p>{currentOrder.serviceName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{currentOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Montant</p>
                  <p className="font-bold">{currentOrder.amount} €</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut actuel</p>
                  <p className={`inline-block px-2 py-1 mt-1 rounded-full text-xs font-medium ${getStatusColor(currentOrder.status)}`}>
                    {getStatusLabel(currentOrder.status)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Modifier le statut</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={currentOrder.status === "pending" ? "default" : "outline"} 
                    onClick={() => handleUpdateStatus("pending")}
                  >
                    En attente
                  </Button>
                  <Button 
                    size="sm" 
                    variant={currentOrder.status === "confirmed" ? "default" : "outline"} 
                    onClick={() => handleUpdateStatus("confirmed")}
                  >
                    Confirmée
                  </Button>
                  <Button 
                    size="sm" 
                    variant={currentOrder.status === "completed" ? "default" : "outline"} 
                    onClick={() => handleUpdateStatus("completed")}
                  >
                    Terminée
                  </Button>
                  <Button 
                    size="sm" 
                    variant={currentOrder.status === "cancelled" ? "destructive" : "outline"} 
                    onClick={() => handleUpdateStatus("cancelled")}
                  >
                    Annulée
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
