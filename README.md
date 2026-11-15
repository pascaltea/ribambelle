# Ribambelle

La carte des sorties en famille, filtrées par l'âge des enfants. Suisse et France pour commencer.

## Ce que fait l'app

- Carte OpenStreetMap avec regroupement des spots, recherche par ville ou par nom, bouton « autour de moi »
- Profil famille : les années de naissance filtrent la carte toute seule
- Filtres : âge, catégorie, gratuit, jour de pluie, poussette, durée, saison, équipements, favoris
- Fiche spot : indice de confiance, notes par tranche d'âge, avis des enfants, conseils de parents, itinéraire
- Ajouter un spot, confirmer, noter, signaler
- Passeport à tampons, niveaux, badges, défi de saison
- Français et anglais, thème clair et sombre
- Installable sur l'écran d'accueil et utilisable hors ligne pour les zones déjà consultées

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'app (interface, logique, styles) |
| `spots.json` | Les spots de départ. Ajouter une entrée ici pour en publier un nouveau |
| `sw.js` | Mode hors ligne |
| `manifest.webmanifest`, `icon*` | Installation sur téléphone |

## Limites actuelles

- Les spots de départ sont à confirmer sur place : positions, prix et équipements sont approximatifs.
- Les contributions (spots ajoutés, avis, tampons) sont enregistrées sur l'appareil. Le partage entre familles demande un serveur. La couche de données en haut de `index.html` est prévue pour être remplacée par ce serveur.
- Pas encore de photos.

## Format d'un spot

`id`, `n` nom, `la`/`lo` position, `c` catégorie (`jeux`, `nature`, `baignade`, `animaux`, `musee`, `sport`, `indoor`, `neige`), `co` pays, `r` région, `a0`/`a1` âge mini et maxi, `ai` âge idéal, `fr` gratuit (1 ou 0), `io` (`in`, `out`, `both`), `d` durée (1 = 1 h, 2 = demi-journée, 3 = journée), `tg` équipements (`po` poussette, `wc`, `la` table à langer, `om` ombre, `re` restauration, `pk` parking, `pi` pique-nique), `se` saisons (`p`, `e`, `a`, `h`, vide = toute l'année), `s` résumé.

Fond de carte © contributeurs OpenStreetMap.
