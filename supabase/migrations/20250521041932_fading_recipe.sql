/*
  # Create destinations and packages tables

  1. New Tables
    - `destinations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `country` (text)
      - `image` (text)
      - `description` (text)
      - `long_description` (text)
      - `rating` (numeric)
      - `continent` (text)
      - `activities` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `packages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `destination_id` (uuid, foreign key)
      - `image` (text)
      - `description` (text)
      - `duration` (text)
      - `group_size` (text)
      - `price` (numeric)
      - `discount` (numeric)
      - `start_date` (date)
      - `activities` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  long_description text,
  rating numeric CHECK (rating >= 0 AND rating <= 5),
  continent text NOT NULL,
  activities text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  image text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  group_size text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  discount numeric DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
  start_date date NOT NULL,
  activities text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policies for destinations
CREATE POLICY "Allow public read access" ON destinations
  FOR SELECT USING (true);

CREATE POLICY "Allow admin insert" ON destinations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));

CREATE POLICY "Allow admin update" ON destinations
  FOR UPDATE TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));

CREATE POLICY "Allow admin delete" ON destinations
  FOR DELETE TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));

-- Create policies for packages
CREATE POLICY "Allow public read access" ON packages
  FOR SELECT USING (true);

CREATE POLICY "Allow admin insert" ON packages
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));

CREATE POLICY "Allow admin update" ON packages
  FOR UPDATE TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));

CREATE POLICY "Allow admin delete" ON packages
  FOR DELETE TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));