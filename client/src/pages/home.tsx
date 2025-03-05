import { Card, CardContent } from "@/components/ui/card";
import TravelForm from "@/components/travel-form";
import { MdFlight, MdHotel, MdLocalActivity } from "react-icons/md";

const FEATURES = [
  {
    icon: MdFlight,
    title: "Smart Travel Planning",
    description: "AI-powered recommendations tailored to your preferences"
  },
  {
    icon: MdHotel,
    title: "Accommodation Insights",
    description: "Curated stays matching your style and budget"
  },
  {
    icon: MdLocalActivity,
    title: "Local Experiences",
    description: "Discover unique activities and hidden gems"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary/90 to-blue-600 bg-clip-text text-transparent">
                AI Travel Advisor
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get personalized travel recommendations powered by AI. We'll help you
                plan the perfect trip based on your preferences.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:px-6">
            <Card className="backdrop-blur-sm bg-card/95 shadow-xl">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">Plan Your Journey</h2>
                  <p className="text-muted-foreground">Fill in your preferences below</p>
                </div>
                <TravelForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}