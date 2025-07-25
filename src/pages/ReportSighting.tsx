import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Camera, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportSighting = () => {
  const navigate = useNavigate();
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [notes, setNotes] = useState("");
  const [currentTime] = useState(new Date().toLocaleTimeString());
  
  const popularSpecies = [
    "Lion", "Leopard", "Elephant", "Buffalo", "Rhino",
    "Cheetah", "Zebra", "Giraffe", "Hippo", "Wildebeest"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Sighting reported:", { selectedSpecies, notes });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="bg-card shadow-earth p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            className="touch-target"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Report Sighting</h1>
            <p className="text-xs text-muted-foreground">Share wildlife observations</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Species Selection */}
          <div className="space-y-3">
            <Label htmlFor="species" className="text-base font-medium">
              Species Spotted *
            </Label>
            <Input
              id="species"
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              placeholder="Start typing species name..."
              className="mobile-input"
              required
            />
            
            {/* Popular Species Quick Select */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Popular species:</p>
              <div className="flex flex-wrap gap-2">
                {popularSpecies.map((species) => (
                  <Badge
                    key={species}
                    variant={selectedSpecies === species ? "default" : "secondary"}
                    className="cursor-pointer touch-target px-3 py-1"
                    onClick={() => setSelectedSpecies(species)}
                  >
                    {species}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">Current Location</span>
            </div>
            <p className="text-sm text-muted-foreground">
              GPS coordinates will be captured automatically
            </p>
            <div className="text-xs text-primary mt-1">
              -1.2921° S, 34.7516° E (Maasai Mara)
            </div>
          </div>

          {/* Timestamp */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium">Time Spotted</span>
            </div>
            <p className="text-sm text-foreground">{currentTime}</p>
          </div>

          {/* Behavior/Notes */}
          <div className="space-y-3">
            <Label htmlFor="notes" className="text-base font-medium">
              Behavior & Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the animal's behavior, group size, condition..."
              className="min-h-[100px] text-base"
            />
          </div>

          {/* Priority Indicators */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Animal Status</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="touch-target justify-start"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Normal Behavior
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="touch-target justify-start border-destructive text-destructive"
              >
                <div className="w-3 h-3 bg-destructive rounded-full mr-2"></div>
                Fighting/Eating
              </Button>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Add Photo (Optional)</Label>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full touch-target justify-start"
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full touch-target gradient-safari text-primary-foreground text-base font-semibold"
            disabled={!selectedSpecies.trim()}
          >
            Report Sighting
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReportSighting;