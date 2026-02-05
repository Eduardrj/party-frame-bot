import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { Image } from "lucide-react";

const Photos = () => {
  return (
    <Layout>
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display text-3xl font-bold text-foreground">Fotos</h1>
        <p className="mt-1 text-muted-foreground">
          Galeria de todas as fotos processadas
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <EmptyState
          icon={Image}
          title="Galeria em breve"
          description="A galeria de fotos será disponibilizada quando o backend estiver conectado. Por enquanto, as fotos ficam salvas no Google Drive do evento."
        />
      </div>
    </Layout>
  );
};

export default Photos;
