# Setup – Aldin Website

## Schritt 1: Neon Datenbank erstellen

1. Gehe zu [neon.tech](https://neon.tech) und erstelle einen kostenlosen Account
2. Erstelle ein neues Projekt (z.B. "aldin-website")
3. Kopiere die **Connection String** (sieht aus wie: `postgresql://user:pass@...`)

## Schritt 2: `.env.local` erstellen

Kopiere `.env.example` als `.env.local` und fuell die Werte aus:

```bash
cp .env.example .env.local
```

Dann in `.env.local` eintragen:

```
DATABASE_URL="deine-neon-connection-string"
JWT_SECRET="openssl rand -base64 32"  # beliebiger langer geheimer String
NEXT_PUBLIC_WA_NUMBER="4915712345678"  # Aldins Handynummer ohne + und ohne fuehrende 0
ADMIN_EMAIL="aldin@example.com"
ADMIN_PASSWORD="sicheres-passwort"
```

**JWT_SECRET generieren** (im Terminal):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Schritt 3: Abhaengigkeiten installieren

```bash
npm install
```

## Schritt 4: Datenbank einrichten + Admin erstellen

```bash
npm run seed
```

Das Skript erstellt alle Tabellen und den Admin-Benutzer.

## Schritt 5: Lokal testen

```bash
npm run dev
```

Oeffne [http://localhost:3000](http://localhost:3000)

Admin-Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Schritt 6: Auf Vercel deployen

1. Lade den Projektordner auf GitHub hoch (neues Repo erstellen)
2. Gehe zu [vercel.com](https://vercel.com) und verbinde dein GitHub-Repo
3. In den Vercel-Projekteinstellungen unter **Environment Variables** alle Variablen aus `.env.local` eintragen
4. Deploy

**Wichtig fuer Vercel:** Die Neon-Datenbank laeuft separat – Vercel verbindet sich per `DATABASE_URL` damit. Alle Daten bleiben erhalten.

## Struktur des Projekts

```
src/
  app/
    page.tsx                          → Startseite
    lebenslauf-erstellen/
      page.tsx                        → Hauptseite (rankt fuer "Lebenslauf erstellen")
      [city]/page.tsx                 → 10 Stadtseiten
    bewerbungscoach/
      page.tsx                        → Hauptseite (rankt fuer "Bewerbungscoach")
      [city]/page.tsx                 → 10 Stadtseiten
    blog/
      page.tsx                        → Blog-Uebersicht
      [slug]/page.tsx                 → Einzelner Blogbeitrag
    admin/
      login/page.tsx                  → Admin-Login
      page.tsx                        → Dashboard
      produkte/page.tsx               → Produkte verwalten
      blog/page.tsx                   → Blog verwalten
    api/
      auth/login/route.ts             → POST Login
      auth/logout/route.ts            → POST Logout
      products/route.ts               → GET/POST/PATCH/DELETE Produkte
      blog/route.ts                   → GET/POST/PATCH/DELETE Blog
```

## Haeufige Fragen

**Wie aendere ich das Admin-Passwort?**  
In `.env.local` ADMIN_PASSWORD aendern und `npm run seed` erneut ausfuehren.

**Wie aendere ich die WhatsApp-Nummer?**  
In `.env.local` (lokal) und in den Vercel Environment Variables `NEXT_PUBLIC_WA_NUMBER` aendern. Dann neues Deployment triggern.

**Wie fuege ich einen neuen Blog-Beitrag hinzu?**  
Unter `/admin/blog` einloggen → "Neuer Beitrag" → Markdown schreiben → "Veroeffentlichen" anhaaken → Speichern.

**Wie fuege ich ein neues Produkt hinzu?**  
Unter `/admin/produkte` einloggen → Formular ausfullen → "Produkt hinzufuegen".
