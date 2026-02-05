import { Camera, Image, PartyPopper, Users, ArrowRight, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import EventCard from "@/components/EventCard";
import { Link } from "react-router-dom";

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
];

const Index = () => {
  return (
    <Layout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Visão geral do seu sistema de fotos para festas
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: "0.1s" }}>
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <StatsCard
            label="Total de Fotos"
            value={403}
            icon={Camera}
            variant="primary"
            trend="+23 hoje"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <StatsCard
            label="Eventos Criados"
            value={3}
            icon={PartyPopper}
            variant="default"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <StatsCard
            label="Convidados Ativos"
            value={131}
            icon={Users}
            variant="default"
            trend="+12 esta semana"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <StatsCard
            label="Molduras Ativas"
            value={2}
            icon={Image}
            variant="accent"
          />
        </div>
      </div>

      {/* Active Event Banner */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card p-6 shadow-card animate-pulse-glow">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-accent/5 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  Evento Ativo Agora
                </p>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Casamento Ana & Pedro
                </h2>
                <p className="text-sm text-muted-foreground">
                  WhatsApp conectado · 247 fotos processadas
                </p>
              </div>
            </div>
            <Link
              to="/eventos/1"
              className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              Ver detalhes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Eventos Recentes
          </h2>
          <Link
            to="/eventos"
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Ver todos
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {mockEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
