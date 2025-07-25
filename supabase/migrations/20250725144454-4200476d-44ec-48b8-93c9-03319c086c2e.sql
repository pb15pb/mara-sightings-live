-- Create wildlife_sightings table
CREATE TABLE public.wildlife_sightings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_name TEXT NOT NULL,
  reporter_surname TEXT NOT NULL,
  species TEXT NOT NULL,
  notes TEXT,
  animal_status TEXT NOT NULL CHECK (animal_status IN ('normal', 'urgent')),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location_description TEXT,
  sighting_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.wildlife_sightings ENABLE ROW LEVEL SECURITY;

-- Create policies for wildlife sightings
-- Allow everyone to view sightings (public data)
CREATE POLICY "Wildlife sightings are viewable by everyone" 
ON public.wildlife_sightings 
FOR SELECT 
USING (true);

-- Allow anyone to create sightings (public reporting)
CREATE POLICY "Anyone can create wildlife sightings" 
ON public.wildlife_sightings 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_wildlife_sightings_updated_at
BEFORE UPDATE ON public.wildlife_sightings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();