import { Card, CardContent } from "@/components/ui/card";
import TravelForm from "@/components/travel-form";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a",
  "https://images.unsplash.com/photo-1554366347-897a5113f6ab",
  "https://images.unsplash.com/photo-1606944331341-72bf6523ff5e"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AI Travel Advisor
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Get personalized travel recommendations powered by AI. We'll help you
              plan the perfect trip and send the details right to your inbox.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {HERO_IMAGES.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Travel destination"
                  className="rounded-lg object-cover w-full h-32"
                />
              ))}
            </div>
          </div>
          <Card className="p-6">
            <CardContent>
              <TravelForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
