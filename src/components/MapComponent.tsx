import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Simple marker icons without image imports
const createMarkerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${color}; 
        width: 24px; 
        height: 24px; 
        border-radius: 50%; 
        border: 3px solid white; 
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -32],
  });
};

const normalIcon = createMarkerIcon('#22c55e'); // green
const urgentIcon = createMarkerIcon('#ef4444'); // red

interface Sighting {
  id: string;
  species: string;
  lat: number;
  lng: number;
  isUrgent?: boolean;
  time: string;
  reporter: string;
}

interface MapComponentProps {
  sightings?: Sighting[];
}

const MapComponent = ({ sightings = [] }: MapComponentProps) => {
  // Maasai Mara coordinates
  const center: [number, number] = [-1.2921, 34.7516];

  // Mock sightings if none provided
  const mockSightings: Sighting[] = [
    { id: '1', species: 'Lion', lat: -1.2921, lng: 34.7516, isUrgent: true, time: '2 hours ago', reporter: 'John K.' },
    { id: '2', species: 'Elephant', lat: -1.2800, lng: 34.7600, isUrgent: false, time: '3 hours ago', reporter: 'Mary S.' },
    { id: '3', species: 'Cheetah', lat: -1.3000, lng: 34.7400, isUrgent: false, time: '5 hours ago', reporter: 'David M.' },
  ];

  const displaySightings = sightings.length > 0 ? sightings : mockSightings;

  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {displaySightings.map((sighting) => (
        <Marker
          key={sighting.id}
          position={[sighting.lat, sighting.lng]}
          icon={sighting.isUrgent ? urgentIcon : normalIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-foreground">{sighting.species}</h3>
              <p className="text-sm text-muted-foreground">
                Reported by {sighting.reporter}
              </p>
              <p className="text-xs text-muted-foreground">{sighting.time}</p>
              {sighting.isUrgent && (
                <div className="text-xs text-destructive font-medium mt-1">
                  ⚠️ Urgent: Fighting/Eating
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;