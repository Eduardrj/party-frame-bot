import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Users,
  Calendar,
  Image,
  ExternalLink,
  Copy,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";
import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockPhotos = Array.from({ length: 8 }, (_, i) => ({
  id: `photo-${i + 1}`,
  timestamp: `${14 + Math.floor(i / 3)}:${String((i * 17) % 60).padStart(2, "0")}`,
  phone: `+55 11 9${String(8000 + i * 111).slice(0, 4)}-${String(1000 + i * 321).slice(0, 4)}`,
  status: i < 6 ? "processed" : "processing",
}));

const EventDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const copyWhatsApp = () => {
    navigator.clipboard.writeText("+55 11 91234-5678");
    toast({ title: "Número copiado!", description: "Compartilhe com seus convidados." });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <Link
          to="/eventos"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Eventos
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Casamento Ana & Pedro
              </h1>
              <span className="rounded-full border border-primary/30 bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                Ativo
              </span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                15 Fev 2026
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                +55 11 91234-5678
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-border" onClick={copyWhatsApp}>
              <Copy className="mr-2 h-4 w-4" />
              Copiar Número
            </Button>
            <Button variant="outline" className="border-border">
              <ExternalLink className="mr-2 h-4 w-4" />
              Abrir Drive
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <StatsCard label="Fotos Recebidas" value={247} icon={Camera} variant="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <StatsCard label="Com Moldura" value={241} icon={Image} variant="default" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <StatsCard label="Convidados" value={89} icon={Users} variant="default" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <StatsCard label="Processando" value={6} icon={Clock} variant="accent" />
        </div>
      </div>

      {/* Frame Preview */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Moldura do Evento
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-secondary border border-border">
              <Image className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-foreground font-medium">moldura-casamento-ana-pedro.png</p>
              <p className="mt-1 text-xs text-muted-foreground">1080 × 1080px · PNG com transparência</p>
              <Button variant="outline" size="sm" className="mt-3 border-border">
                Alterar Moldura
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Photos */}
      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
          Fotos Recentes
        </h2>
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Horário
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Telefone
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPhotos.map((photo) => (
                <tr key={photo.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 text-sm text-foreground">{photo.timestamp}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground font-mono">{photo.phone}</td>
                  <td className="px-5 py-3">
                    {photo.status === "processed" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Processada
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                        <Clock className="h-3.5 w-3.5" />
                        Processando
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
