import { Card,CardContent,CardFooter,CardHeader,CardTitle } from "../../../components/ui/Card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Users2, BookOpen, Calendar, Crown } from "lucide-react";
import bienvenue from  "../../../assets/bienvenue.png";
import { useDashboardStats } from "../Home/hooks/useHomeProvider";
import { useHomeProvider } from "../Home/hooks/useHomeProvider";
import {Link} from "react-router-dom";
const data2 = [
  { month: "Jan", count: 150 },
  { month: "Feb", count: 200 },
  { month: "Mar", count: 180 },
  { month: "Apr", count: 220 },
  { month: "May", count: 250 },
  { month: "Jun", count: 280 },
];


const DashboardContent = () => {
     const { data, isLoading } = useDashboardStats();
     console.log("📊 Données du dashboard :", data);

     const { data: user, isLoading: userLoading } = useHomeProvider();
     
  if (isLoading) {
    return <p>Chargement...</p>;
  }
  const statsCards = [
    {
      title: "Utilisateurs",
      label: "Gérer les utilisateurs",
      value: data?.utilisateurs || 0,
      icon: Users2,
      color: "from-[#18CFAB] to-[#18CFAB]/20",
      path: "/admin/utilisateurs",
    },
    {
      title: "Cours",
      label: "Gérer les cours collectifs",
      value: data?.cours || 0,
      icon: BookOpen,
      color: "from-[#FF8080] to-[#FF8080]/20",
      path: "/admin/cours",
    },
    {
      title: "Abonnements",
      label: "Gérer les abonnements",
      value: data?.abonnements || 0,
      icon: Crown,
      color: "from-[#6C72CB] to-[#6C72CB]/20",
      path: "/admin/abonnement",
    },
  ];
  return (
    <div className="px-6 max-w-screen-xl mx-auto space-y-6">
  {/* tout ton contenu ici */}


      <div className="rounded-lg bg-[#1E1F22] p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              Bonjour {user?.prenom} 👋
            </h2>
            <p className="text-gray-400 mt-1">Tu peux gérer tes affaires d'ici.</p>
          </div>
          <img src={bienvenue}  alt="Dashboard illustration" className="h-32" />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {statsCards.map((card) => (
            <Link to={card.path} key={card.title}>

          <Card key={card.title} className="overflow-hidden">
            <CardHeader className="border-b p-6">
              <CardTitle className="text-base font-semibold">{card.title}</CardTitle>
              <p className="text-sm text-gray-500">{card.label}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${card.color} rounded-lg`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
            </Link>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Fréquentation des cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data2}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#60A5FA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#60A5FA"
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Abonnements actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data2}>
                  <defs>
                    <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#F97316"
                    fillOpacity={1}
                    fill="url(#colorSubs)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Avis clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data2}>
                  <defs>
                    <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF8080" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#FF8080" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#FF8080"
                    fillOpacity={1}
                    fill="url(#colorReviews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;