import { useState } from "react";
import { ArrowLeft, Upload, Calendar, MessageSquare, Image } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState(
    "Sua foto da festa ficou pronta! Salve e compartilhe com quem quiser 🎉"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Evento criado!",
      description: `${name} foi adicionado com sucesso.`,
    });
    navigate("/eventos");
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
        <h1 className="font-display text-3xl font-bold text-foreground">
          Novo Evento
        </h1>
        <p className="mt-1 text-muted-foreground">
          Configure um novo evento para receber fotos via WhatsApp
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* Basic Info */}
        <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-card" style={{ animationDelay: "0.1s" }}>
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Informações Básicas
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-foreground">Nome do Evento</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Casamento Ana & Pedro"
                className="mt-1.5 bg-secondary border-border"
                required
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-foreground">Data do Evento</Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Config */}
        <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-card" style={{ animationDelay: "0.2s" }}>
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Configuração WhatsApp
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="whatsapp" className="text-foreground">Número WhatsApp</Label>
              <div className="relative mt-1.5">
                <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+55 11 99999-9999"
                  className="pl-9 bg-secondary border-border"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Número que receberá as fotos dos convidados
              </p>
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground">Mensagem de Retorno</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 bg-secondary border-border"
                rows={3}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Mensagem enviada junto com a foto com moldura
              </p>
            </div>
          </div>
        </div>

        {/* Frame Upload */}
        <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-card" style={{ animationDelay: "0.3s" }}>
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Moldura do Evento
          </h2>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 p-10 transition-colors hover:border-primary/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Image className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              Arraste a moldura PNG ou clique para selecionar
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG com transparência, recomendado 1080×1080px
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 border-border"
            >
              <Upload className="mr-2 h-4 w-4" />
              Selecionar Arquivo
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button type="submit" className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity">
            Criar Evento
          </Button>
          <Link to="/eventos">
            <Button type="button" variant="outline" className="border-border">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default CreateEvent;
