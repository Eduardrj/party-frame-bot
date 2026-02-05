import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockEvents = [
  {
    id: "1",
    name: "Casamento Ana & Pedro",
    date: "15 Fev 2026",
    photoCount: 247,
    guestCount: 89,
    status: "active" as const,
  },
  {
    id: "2",
    name: "Aniversário 30 anos - Julia",
    date: "22 Fev 2026",
    photoCount: 0,
    guestCount: 0,
    status: "upcoming" as const,
  },
  {
    id: "3",
    name: "Confraternização TechCo",
    date: "28 Jan 2026",
    photoCount: 156,
    guestCount: 42,
    status: "finished" as const,
  },
  {
    id: "4",
    name: "Formatura Medicina UFMG",
    date: "10 Jan 2026",
    photoCount: 312,
    guestCount: 78,
    status: "finished" as const,
  },
];

const Events = () => {
  return (
    <Layout>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between animate-fade-in">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Eventos
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie seus eventos e molduras
          </p>
        </div>
        <Link to="/eventos/novo">
          <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity">
            <Plus className="mr-2 h-4 w-4" />
            Novo Evento
          </Button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-9 bg-card border-border"
          />
        </div>
        <Button variant="outline" size="icon" className="border-border bg-card">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {mockEvents.map((event, index) => (
          <div
            key={event.id}
            className="animate-fade-in"
            style={{ animationDelay: `${0.15 + index * 0.05}s` }}
          >
            <EventCard {...event} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Events;
