# FitHub — Guide de déploiement

## 1. GitHub — Pousser le code

```bash
# Dans le dossier fithub :
git init
git add .
git commit -m "Initial commit — FitHub v1"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/fithub.git
git push -u origin main
```

## 2. Supabase — Créer la base de données

1. Va sur https://supabase.com → New project → nomme-le `fithub`
2. Settings → API → copie :
   - `Project URL` → sera `VITE_SUPABASE_URL`
   - `anon public` key → sera `VITE_SUPABASE_ANON`
3. SQL Editor → colle le schéma SQL qui se trouve dans `src/lib/supabase.js` (entre les commentaires `/*` et `*/`) → Run

## 3. Vercel — Déployer l'app

1. Va sur https://vercel.com → "Add New Project"
2. Importe ton repo GitHub `fithub`
3. Framework Preset : **Vite**
4. Environment Variables — ajoute ces 2 variables :
   - `VITE_SUPABASE_URL` = ta Project URL Supabase
   - `VITE_SUPABASE_ANON` = ta anon key Supabase
   - `VITE_ANTHROPIC_KEY` = ta clé API Anthropic (pour les recettes IA)
5. Clique Deploy → ton app sera en ligne en 2 minutes !

## 4. Clé API Anthropic (pour les recettes IA)

1. Va sur https://console.anthropic.com → API Keys → Create Key
2. Ajoute-la dans Vercel comme `VITE_ANTHROPIC_KEY`

## Modifier l'app facilement

Chaque fichier = un module indépendant :
- `src/pages/NutritionPage.jsx` → module nutrition
- `src/pages/CoursesPage.jsx` → liste de courses
- `src/components/dashboard/Dashboard.jsx` → dashboard central
- `src/lib/store.js` → données globales

Pour modifier : décris ce que tu veux changer → je génère le code → tu copies-colles → git push → Vercel redéploie automatiquement.

## Structure du projet

```
fithub/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   ├── supabase.js      (client DB + schéma SQL)
    │   └── store.js         (état global Zustand)
    ├── components/
    │   ├── shared/
    │   │   ├── UI.jsx       (composants réutilisables)
    │   │   └── Sidebar.jsx  (navigation)
    │   └── dashboard/
    │       └── Dashboard.jsx
    └── pages/
        ├── MusculationPage.jsx
        ├── NutritionPage.jsx
        ├── RecettesPage.jsx
        ├── PlanningPage.jsx
        ├── CoursesPage.jsx
        ├── SantePage.jsx
        └── ProfilPage.jsx
```
