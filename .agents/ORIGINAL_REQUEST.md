# Original User Request

## Initial Request — 2026-09-01T18:10:22Z

# Teamwork Project Prompt — Launched

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: [none — teamwork routes from the description]

Wykonaj kompleksowy audyt SEO strony Luma Breathwork w oparciu o Google Search Console oraz zaimplementuj optymalizacje on-page, techniczne (w tym Schema.org i prerendering) oraz treściowe, zachowując istniejący design i styl wizualny.

Working directory: `c:/Users/m.byrtus/Documents/Projects/zzz_other/Luma-new-LP`
Integrity mode: development

## Requirements

### R1. Audyt Google Search Console i Raport Analityczny
Pobierz i przeanalizuj aktualne dane z Google Search Console dla domeny projektu (zapytania, pozycje, CTR, wyświetlenia, stan indeksacji, błędy oraz sitemapy). Zapisz ustrukturyzowany raport z wnioskami, priorytetowymi słowami kluczowymi i zidentyfikowanymi brakami SEO.

### R2. Optymalizacja Techniczna i Semantyczna HTML
Zoptymalizuj strukturę kodu HTML i metadane: tytuły (`<title>`), meta opisy (`meta description`), tagi Open Graph / Twitter Cards, strukturę nagłówków (H1–H3) oraz atrybuty alt dla grafik. Dodaj lub zaktualizuj poprawne znaczniki danych ustrukturyzowanych Schema.org (JSON-LD) dla aplikacji, organizacji i strony produktu.

### R3. Optymalizacja Skryptów Prerenderingu i SSG
Upewnij się, że generowany statyczny kod HTML (prerender / SSG) zawiera pełną, zoptymalizowaną treść i metadane widoczne dla crawlerów wyszukiwarek bez konieczności wykonywania JavaScriptu po stronie klienta.

### R4. Ulepszenie Treści i Słów Kluczowych
Dostosuj i nasyć treści landing page kluczowymi frazami wyszukiwanymi przez użytkowników (na podstawie analizy GSC), dbając o naturalny język, czytelność oraz zachowanie dotychczasowej tożsamości wizualnej i układu strony.

## Acceptance Criteria

### GSC & Analityka
- [ ] Utworzony został raport z danymi GSC i listą docelowych słów kluczowych w repozytorium (np. w `scratch/` lub `docs/`).

### On-Page & Schema.org
- [ ] Wszystkie strony/widoki posiadają unikalne `<title>`, `<meta name="description">` oraz znaczniki Open Graph.
- [ ] Kod HTML zawiera poprawny semantycznie blok JSON-LD Schema.org, który waliduje się bez błędów składniowych.
- [ ] Obrazy i ikony posiadają odpowiednie atrybuty `alt` lub `aria-hidden` dla elementów czysto dekoracyjnych.

### Build & Prerender
- [ ] Polecenie `npm run build` wykonuje się pomyślnie bez błędów TypeScript (`tsc --noEmit`) i błędów Vite.
- [ ] Wygenerowane pliki w katalogu `dist/` zawierają wyrenderowane w statycznym HTML zoptymalizowane meta tagi, nagłówki oraz treść.

---
*Task has been successfully delegated to teamwork_preview.*
