import { Calendar, Image, MoreVertical, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  photoCount: number;
  guestCount: number;
  status: "active" | "upcoming" | "finished";
  framePreview?: string;
}

const statusStyles = {
  active: "bg-primary/15 text-primary border-primary/30",
  upcoming: "bg-accent/15 text-accent border-accent/30",
  finished: "bg-muted text-muted-foreground border-border",
};

const statusLabels = {
  active: "Ativo",
  upcoming: "Em breve",
  finished: "Finalizado",
};

const EventCard = ({ id, name, date, photoCount, guestCount, status, framePreview }: EventCardProps) => {
  return (
    <Link
      to={`/eventos/${id}`}
      className="group block rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/20 hover:shadow-glow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {/* Frame preview */}
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary">
            {framePreview ? (
              <img src={framePreview} alt="Moldura" className="h-full w-full rounded-lg object-cover" />
            ) : (
              <Image className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{date}</span>
            </div>
          </div>
        </div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-5 border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Image className="h-3.5 w-3.5" />
          <span>{photoCount} fotos</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{guestCount} convidados</span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
