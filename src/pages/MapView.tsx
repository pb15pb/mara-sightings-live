import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Settings, Search } from "lucide-react";

const MapView = () => {

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
            Map integration temporarily disabled while fixing compatibility issues.
          </p>
          
          {/* Mock Sightings Display */}
          <div className="bg-card rounded-lg p-4 mt-6 space-y-3 text-left">
            <h3 className="font-semibold text-center mb-3">Recent Sightings</h3>
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="text-sm">
                <strong>Lion</strong> - Reported by John K. (2 hours ago)
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-red-50 rounded">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="text-sm">
                <strong>Elephant</strong> - Fighting/Eating - Mary S. (3 hours ago)
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="text-sm">
                <strong>Cheetah</strong> - Reported by David M. (5 hours ago)
              </div>
            </div>
          </div>
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