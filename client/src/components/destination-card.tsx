import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdAttachMoney } from "react-icons/md";

interface Place {
  name: string;
  description: string;
  activities: string[];
  estimatedCost: number;
}

interface DestinationCardProps {
  place: Place;
}

export default function DestinationCard({ place }: DestinationCardProps) {
  return (
    <Card className="backdrop-blur-sm bg-card/95">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{place.name}</CardTitle>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MdAttachMoney className="h-5 w-5" />
            <span>{place.estimatedCost.toLocaleString()}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {place.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {place.activities.map((activity, i) => (
            <Badge 
              key={i} 
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {activity}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}