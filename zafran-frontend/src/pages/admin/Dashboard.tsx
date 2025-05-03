
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  // Mock data for charts
  const visitsData = [
    { name: "Jan", visits: 400 },
    { name: "Fév", visits: 300 },
    { name: "Mar", visits: 600 },
    { name: "Avr", visits: 800 },
    { name: "Mai", visits: 500 },
    { name: "Jun", visits: 900 },
  ];

  const ordersData = [
    { name: "Jan", commandes: 40 },
    { name: "Fév", commandes: 30 },
    { name: "Mar", commandes: 45 },
    { name: "Avr", commandes: 60 },
    { name: "Mai", commandes: 75 },
    { name: "Jun", commandes: 85 },
  ];

  const servicesData = [
    { name: "Traiteur", value: 40 },
    { name: "Chef à domicile", value: 30 },
    { name: "Cours de cuisine", value: 20 },
    { name: "Événements", value: 10 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Visites totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3,500</div>
            <p className="text-xs text-muted-foreground">+14% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">335</div>
            <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+18% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques de visites</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer className="h-[300px]" config={{ visits: { color: '#8B5CF6' } }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    name="Visites" 
                    stroke="#8B5CF6" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Commandes mensuelles</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer className="h-[300px]" config={{ commandes: { color: '#F97316' } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="commandes" name="Commandes" fill="#F97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services les plus demandés</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer className="h-[300px]" config={{ value: { color: '#0EA5E9' } }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={servicesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" name="Réservations" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
