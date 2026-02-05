import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Key, FolderOpen } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display text-3xl font-bold text-foreground">Configurações</h1>
        <p className="mt-1 text-muted-foreground">
          Configure as integrações do sistema
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* WhatsApp API */}
        <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-card" style={{ animationDelay: "0.1s" }}>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <MessageSquare className="h-4.5 w-4.5 text-foreground" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">WhatsApp Cloud API</h2>
              <p className="text-xs text-muted-foreground">Configuração do webhook e token de acesso</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-foreground">Phone Number ID</Label>
              <Input placeholder="Ex: 123456789012345" className="mt-1.5 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-foreground">Access Token</Label>
              <Input type="password" placeholder="Bearer token..." className="mt-1.5 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-foreground">Webhook Verify Token</Label>
              <Input placeholder="Seu token de verificação" className="mt-1.5 bg-secondary border-border" />
            </div>
          </div>
        </div>

        {/* Google Drive */}
        <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-card" style={{ animationDelay: "0.2s" }}>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <FolderOpen className="h-4.5 w-4.5 text-foreground" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Google Drive</h2>
              <p className="text-xs text-muted-foreground">Service Account para armazenamento de fotos</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-foreground">Service Account Email</Label>
              <Input placeholder="nome@projeto.iam.gserviceaccount.com" className="mt-1.5 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-foreground">Private Key (JSON)</Label>
              <Input type="password" placeholder="Chave privada do Service Account" className="mt-1.5 bg-secondary border-border" />
            </div>
          </div>
        </div>

        {/* API Key */}
        <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-card" style={{ animationDelay: "0.3s" }}>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <Key className="h-4.5 w-4.5 text-foreground" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Webhook URL</h2>
              <p className="text-xs text-muted-foreground">Endpoint para receber mensagens do WhatsApp</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-3 font-mono text-sm text-muted-foreground">
            <span className="flex-1 truncate">https://seu-backend.com/webhook/whatsapp</span>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              Copiar
            </Button>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity">
            Salvar Configurações
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
