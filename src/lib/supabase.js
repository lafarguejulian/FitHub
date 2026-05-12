import { createClient } from '@supabase/supabase-js'

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
// Remplace ces valeurs par les tiennes sur https://supabase.com
// Settings > API > Project URL & anon key
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://TON_PROJECT.supabase.co'
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON || 'TON_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

// ─── SCHÉMA SQL À COLLER DANS SUPABASE > SQL EDITOR ─────────────────────────
/*
-- Table utilisateur (profil)
create table profiles (
  id uuid references auth.users primary key,
  prenom text,
  poids_kg numeric,
  objectif text default 'prise_muscle',
  calories_objectif int default 2400,
  proteines_g int default 160,
  glucides_g int default 240,
  lipides_g int default 70,
  created_at timestamptz default now()
);

-- Séances muscu
create table seances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  nom text,
  cycle int,
  semaine int,
  date date default current_date,
  duree_sec int,
  series_total int,
  reps_total int,
  volume_kg numeric,
  skipped text[], -- noms des exos passés
  remplacés jsonb, -- [{orig, rep}]
  created_at timestamptz default now()
);

-- Séries détail
create table series_log (
  id uuid primary key default gen_random_uuid(),
  seance_id uuid references seances,
  exercice text,
  serie_num int,
  reps int,
  charge_kg numeric,
  repos_sec int,
  created_at timestamptz default now()
);

-- Nutrition journalière
create table nutrition_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  date date default current_date,
  calories int,
  proteines_g numeric,
  glucides_g numeric,
  lipides_g numeric,
  source text default 'manuel', -- 'yazio_csv' | 'manuel'
  created_at timestamptz default now()
);

-- Repas
create table repas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  date date default current_date,
  moment text, -- 'petit_dej' | 'dejeuner' | 'collation' | 'diner'
  nom text,
  calories int,
  proteines_g numeric,
  glucides_g numeric,
  lipides_g numeric,
  created_at timestamptz default now()
);

-- Recettes sauvegardées
create table recettes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  nom text,
  ingredients jsonb,
  macros jsonb,
  temps_prep_min int,
  created_at timestamptz default now()
);

-- Planning semaine
create table planning_semaine (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  semaine_debut date,
  jours jsonb, -- {lundi: {dej: recette_id, diner: recette_id}, ...}
  created_at timestamptz default now()
);

-- Santé (import Apple Health)
create table sante_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  date date default current_date,
  pas int,
  sommeil_min int,
  fc_repos int,
  hrv_ms numeric,
  poids_kg numeric,
  calories_actives int,
  created_at timestamptz default now()
);

-- RLS (sécurité : chaque user ne voit que ses données)
alter table profiles enable row level security;
alter table seances enable row level security;
alter table series_log enable row level security;
alter table nutrition_log enable row level security;
alter table repas enable row level security;
alter table recettes enable row level security;
alter table planning_semaine enable row level security;
alter table sante_log enable row level security;

create policy "own data" on profiles for all using (auth.uid() = id);
create policy "own data" on seances for all using (auth.uid() = user_id);
create policy "own data" on series_log for all
  using (seance_id in (select id from seances where user_id = auth.uid()));
create policy "own data" on nutrition_log for all using (auth.uid() = user_id);
create policy "own data" on repas for all using (auth.uid() = user_id);
create policy "own data" on recettes for all using (auth.uid() = user_id);
create policy "own data" on planning_semaine for all using (auth.uid() = user_id);
create policy "own data" on sante_log for all using (auth.uid() = user_id);
*/
