# Paredes.tn — Spécification technique

## Résumé

Site e-commerce pour la vente des produits Paredes en Tunisie (distributeur exclusif).  
Domaine : **paredes.tn** | Langue : **Français** | Devise : **TND**  
Facebook : [Paredes Tunisie](https://www.facebook.com/profile.php?id=100075623007069)

---

## Stack technique

| Composant | Technologie | Hébergement |
|-----------|------------|-------------|
| Backend + Admin | Medusa.js v2 | VPS (Docker Compose) |
| Base de données | PostgreSQL 16 | VPS (Docker Compose) |
| Cache | Redis 7 | VPS (Docker Compose) |
| Storefront | Next.js 15 (starter Medusa) | Netlify |

---

## 1. Backend — Medusa.js sur le VPS

### Infrastructure Docker Compose

Trois services :
- **medusa** : Backend Node.js (port 9000), admin dashboard (port 9000/app)
- **postgres** : PostgreSQL 16
- **redis** : Redis 7

Fichiers :
```
/root/paredes/backend/
├── Dockerfile
├── docker-compose.yml
├── medusa-config.ts
└── .env
```

### Restart automatique

```yaml
restart: unless-stopped
```
sur tous les services. Docker redémarre automatiquement les containers en cas de crash ou reboot du serveur.

### Configuration Medusa

- **Région** : Tunisie, devise TND
- **Paiement** : Provider "system" (manuel) = paiement à la livraison
- **Livraison** : Flat rate shipping (tarif unique pour toute la Tunisie)
- **Admin** : Accessible via `https://admin.paredes.tn` ou `http://<ip-vps>:9000/app`

### Données à saisir via l'admin

Les produits, collections, et bundles seront créés via le dashboard admin de Medusa. Pas de seed script — c'est plus simple pour ~10 produits.

- **Collections** : selon les catégories importées (ex: Essuyage, Hygiène, Entretien...)
- **Produits** : ~10 produits avec photos, descriptions en français, prix en TND
- **Offres/Bundles** : Gérés soit comme des produits groupés, soit via les promotions Medusa (réductions, achetez X obtenez Y)

---

## 2. Storefront — Next.js sur Netlify

### Base

Fork du starter officiel [medusajs/nextjs-starter-medusa](https://github.com/medusajs/nextjs-starter-medusa), personnalisé pour Paredes.

### Design

Inspiré de paredes.fr :
- **Couleur primaire** : Bleu acier `#688dc3`
- **Couleur accent** : Vert teal `#00c39c`
- **Fonds** : Blanc, crème clair `#fff7ec`, cyan pâle `#f1fbfc`
- **Texte** : Gris foncé `#5b6770`
- **Style** : Clean, professionnel, sobre — adapté à une marque d'hygiène pro

### Pages

| Page | Description |
|------|-------------|
| **Accueil** | Hero banner Paredes + produits vedettes + section offres/bundles |
| **Catalogue** | Grille de produits avec filtres par collection |
| **Fiche produit** | Photo, description, prix TND, bouton "Ajouter au panier" |
| **Panier** | Récapitulatif + lien vers checkout |
| **Checkout** | Adresse de livraison + confirmation (paiement à la livraison, pas de formulaire CB) |
| **Confirmation** | Résumé de commande + message "paiement à la livraison" + "nous vous appellerons pour confirmer" |

### Localisation

- Toute l'interface en français (labels, boutons, messages)
- Devise affichée : `XX,XX TND`
- Pas de sélecteur de langue (mono-langue)

### Checkout simplifié

Le checkout ne demande que :
1. Nom complet
2. Numéro de téléphone tunisien (format +216 XX XXX XXX, validation côté client)
3. Adresse de livraison (ville, adresse, code postal)
4. Confirmation de commande

Pas d'étape de paiement en ligne. Un bandeau clair indique : **"Paiement à la livraison"**.

### Flux de validation des commandes

Chaque commande passe par un workflow de vérification manuelle :

1. **Client passe commande** → statut : `pending` (en attente)
2. **Vous recevez la commande** dans le dashboard admin Medusa (liste des commandes avec nom, téléphone, adresse, montant)
3. **Vous appelez le client** au numéro fourni pour vérifier la légitimité
4. **Si légitime** → vous passez la commande en `confirmed` (confirmée) depuis l'admin
5. **Si suspect/injoignable** → vous annulez la commande (`canceled`)
6. **Commande expédiée** → statut `shipped` (expédiée)
7. **Commande livrée** → statut `delivered` (livrée)

Medusa gère nativement les statuts de commande et les fulfillments depuis le dashboard admin. Pas besoin de code custom — tout se fait via l'interface admin :
- Vue liste de toutes les commandes avec filtres par statut
- Détail de chaque commande (produits, adresse, téléphone)
- Actions : confirmer, expédier, annuler, rembourser
- Historique des changements de statut

### Déploiement Netlify

- Le dossier `/root/paredes/storefront/` est un repo Git (ou sous-dossier du mono-repo)
- CI/CD : push sur `main` → build + deploy automatique sur Netlify
- Variable d'environnement : `NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.paredes.tn`

---

## 3. Réseau / DNS

| Sous-domaine | Pointe vers |
|-------------|-------------|
| `paredes.tn` / `www.paredes.tn` | Netlify (storefront) |
| `api.paredes.tn` | VPS (Medusa backend, port 9000) |
| `admin.paredes.tn` | VPS (Medusa admin, port 9000/app) |

Un reverse proxy (Caddy ou Nginx) sur le VPS pour :
- Terminer le SSL (Let's Encrypt) pour `api.paredes.tn` et `admin.paredes.tn`
- Proxier vers le container Medusa

---

## 4. Structure du repo

```
/root/paredes/
├── SPEC.md              ← ce fichier
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml   (inclut postgres, redis, medusa, caddy)
│   ├── medusa-config.ts
│   ├── .env
│   └── src/
└── storefront/
    ├── package.json
    ├── next.config.js
    ├── .env.local
    └── src/
```

Le repo Git est à la racine (`/root/paredes/`). Netlify est configuré avec le build directory `storefront/`.

---

## 5. Ce qui est hors scope

- Paiement en ligne (pas de CB, pas de passerelle)
- Multi-langue (français uniquement)
- Comptes clients (optionnel, le starter le supporte déjà mais pas prioritaire)
- Gestion de stock avancée
- App mobile
- Analytics (peut être ajouté plus tard avec un simple script)

---

## 6. Étapes d'implémentation

1. **Init repo Git** à `/root/paredes/`
2. **Backend** : Setup Medusa v2 avec Docker Compose (medusa + postgres + redis + caddy)
3. **Storefront** : Fork du starter Next.js, personnalisation design + français + checkout COD
4. **Déploiement** : Backend sur VPS, storefront sur Netlify, DNS configuré
5. **Contenu** : Ajout des produits via l'admin Medusa

---

## Pour valider

Merci de relire et confirmer :
- [ ] Stack OK (Medusa + Next.js + Docker + Netlify)
- [ ] Paiement à la livraison uniquement — OK
- [ ] Design inspiré de paredes.fr — OK
- [ ] Checkout simplifié (nom, tel, adresse) — OK
- [ ] Scope limité (pas de CB, pas de multi-langue, pas de stock) — OK
