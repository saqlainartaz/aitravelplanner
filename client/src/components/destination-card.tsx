import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <Card>
      <CardHeader>
        <CardTitle>{place.name}</CardTitle>
        <CardDescription>
          Estimated Cost: ${place.estimatedCost.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{place.description}</p>
        <div className="flex flex-wrap gap-2">
          {place.activities.map((activity, i) => (
            <Badge key={i} variant="secondary">
              {activity}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
