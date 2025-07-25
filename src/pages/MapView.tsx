import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Settings, Search } from "lucide-react";

const MapView = () => {
  const [mapboxToken, setMapboxToken] = useState("");

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card shadow-earth p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-safari rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">CharlesFind</h1>
              <p className="text-xs text-muted-foreground">Maasai Mara Wildlife Tracker</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="touch-target">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 bg-card border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search species or location..." 
            className="mobile-input pl-10"
          />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="flex-1 bg-muted/30 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Interactive Map</h2>
          <p className="text-muted-foreground text-sm">
            To enable the interactive map, please enter your Mapbox public token below:
          </p>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Enter Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="mobile-input"
            />
            <Button 
              className="w-full touch-target gradient-safari text-primary-foreground"
              disabled={!mapboxToken.trim()}
            >
              Initialize Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get your token at{" "}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card border-t border-border p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">127</div>
            <div className="text-xs text-muted-foreground">Today's Sightings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">23</div>
            <div className="text-xs text-muted-foreground">Active Guides</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary-foreground">8</div>
            <div className="text-xs text-muted-foreground">Species Spotted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;