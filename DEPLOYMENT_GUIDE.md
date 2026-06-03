# 🚀 Guide de Déploiement — Begro's Group sur Hostinger
## URL cible : https://begrosgroupe.seedcompany.online

---

## ⚡ RÉSUMÉ RAPIDE

| Problème fréquent         | Cause                              | Solution                          |
|---------------------------|------------------------------------|-----------------------------------|
| Écran blanc / erreur 500  | `public/hot` présent               | Supprimer `public/hot`            |
| CSS/JS ne chargent pas    | Document root mal configuré        | Pointer subdomain vers `/public`  |
| Erreur base de données    | Migrations non exécutées           | Visiter `/migrate.php`            |
| Emails non envoyés        | `MAIL_MAILER=log` dans .env        | Configurer SMTP dans .env         |

---

## 📋 PRÉ-REQUIS VÉRIFIÉS EN LOCAL

Avant tout upload, vérifier localement :

```bash
# 1. Supprimer public/hot (OBLIGATOIRE)
del public\hot

# 2. Compiler les assets pour production
npm run build

# 3. Vérifier que public/build/manifest.json existe
```

✅ Ces étapes sont déjà faites — `public/hot` supprimé, assets buildés.

---

## 🔧 ÉTAPE 1 — Configurer le Sous-domaine sur Hostinger

**Dans hPanel Hostinger :**

1. Va dans **Domaines → Sous-domaines** (ou "Subdomains")
2. Trouve `begrosgroupe.seedcompany.online`
3. Clique **Modifier** (Edit)
4. **Change le Document Root** vers :
   ```
   public_html/begrosgroupe/public
   ```
   *(ou le chemin équivalent selon ta structure de dossiers)*
5. **Sauvegarde**

> ⚠️ C'est l'étape la plus critique. Sans ça, Apache servira les fichiers PHP bruts
> au lieu de laisser Laravel gérer les routes.

---

## 📁 ÉTAPE 2 — Préparer l'Archive à Uploader

### Sur ta machine locale, crée un ZIP du projet :

**Fichiers à INCLURE :**
```
app/
bootstrap/
config/
database/          ← inclure database.sqlite
public/            ← inclure build/, images/, .htaccess
resources/
routes/
storage/           ← vider les logs mais garder la structure
vendor/            ← si Hostinger a PHP 8.3, sinon voir note
.htaccess          ← fichier racine (pour fallback)
artisan
composer.json
composer.lock
```

**Fichiers à EXCLURE du ZIP :**
```
.git/
node_modules/
.env              ← NE PAS uploader (on créera .env manuellement)
public/hot        ← déjà supprimé
tests/
```

### Commande PowerShell pour créer le ZIP (optionnel) :
```powershell
# Dans le dossier du projet
Compress-Archive -Path app,bootstrap,config,database,public,resources,routes,storage,vendor,artisan,composer.json,composer.lock,.htaccess -DestinationPath begros-deploy.zip
```

---

## 📤 ÉTAPE 3 — Uploader sur Hostinger

**Via hPanel File Manager :**

1. Va dans **File Manager**
2. Navigue vers `public_html/` (ou le chemin de ton sous-domaine)
3. Crée un dossier : `begrosgroupe/`
4. Entre dans `begrosgroupe/`
5. Clique **Upload** → Upload le ZIP
6. Une fois uploadé, **Extract** (extraire) le ZIP
7. Vérifie que la structure est :
   ```
   public_html/begrosgroupe/
   ├── app/
   ├── bootstrap/
   ├── config/
   ├── database/
   │   └── database.sqlite
   ├── public/           ← le Document Root pointe ici
   │   ├── .htaccess
   │   ├── index.php
   │   ├── migrate.php   ← script de migration web
   │   └── build/
   ├── resources/
   ├── routes/
   ├── storage/
   ├── vendor/
   └── .htaccess         ← fichier racine (fallback)
   ```

---

## ⚙️ ÉTAPE 4 — Créer le fichier .env sur Hostinger

**Dans File Manager, crée un nouveau fichier `.env`** dans `begrosgroupe/` avec :

```env
APP_NAME="Begro's Group"
APP_ENV=production
APP_KEY=base64:p5cK0XVyut/lrRWJMyo2/JAsyGT25p9TtGrmCF8tm/I=
APP_DEBUG=false
APP_URL=https://begrosgroupe.seedcompany.online

APP_LOCALE=en
APP_FALLBACK_LOCALE=en

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=error

DB_CONNECTION=sqlite

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_PATH=/
SESSION_DOMAIN=null

QUEUE_CONNECTION=sync
CACHE_STORE=file
FILESYSTEM_DISK=local

MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=ops@begrosgroupe.com
MAIL_PASSWORD=TON_MOT_DE_PASSE_EMAIL
MAIL_FROM_ADDRESS="ops@begrosgroupe.com"
MAIL_FROM_NAME="Begro's Group"
OPS_EMAIL="nyassaxavier@gmail.com"
```

> 🔑 Remplace `TON_MOT_DE_PASSE_EMAIL` par le vrai mot de passe du compte
> `ops@begrosgroupe.com` sur Hostinger Email.

---

## 🗄️ ÉTAPE 5 — Exécuter les Migrations

1. Ouvre ton navigateur
2. Va sur : **https://begrosgroupe.seedcompany.online/migrate.php**
3. Tu dois voir : `✅ Migrations OK!`
4. **Immédiatement après**, supprime `migrate.php` via File Manager

---

## 🔐 ÉTAPE 6 — Configurer les Permissions

**Dans File Manager ou via Terminal Hostinger :**

```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
chmod 664 database/database.sqlite
chmod -R 755 public
```

**Via File Manager :**
- Clic droit sur `storage/` → Change Permissions → `775`
- Clic droit sur `bootstrap/cache/` → Change Permissions → `775`
- Clic droit sur `database/database.sqlite` → Change Permissions → `664`

---

## ✅ ÉTAPE 7 — Activer le Cache Laravel

Va sur : **https://begrosgroupe.seedcompany.online/setup-production**

Cette route Laravel va automatiquement :
- Créer le lien symbolique storage
- Mettre en cache la config, les routes et les vues

Tu dois voir : `{"success":true,"message":"Configuration de production réussie!"}`

> ⚠️ Supprime ensuite cette route de `routes/web.php` pour sécuriser le site.

---

## 🧪 ÉTAPE 8 — Vérifications Finales

| Test | URL / Action | Résultat attendu |
|------|-------------|-----------------|
| Page d'accueil | https://begrosgroupe.seedcompany.online/ | Site visible |
| Hero Slider | Scroll sur la page | Animation OK |
| Carte Afrique | Section carte | Avion animé |
| Formulaire contact | Remplir et envoyer | Email reçu sur nyassaxavier@gmail.com |
| Mobile | Resize navigateur | Design responsive |

---

## 🛠️ TROUBLESHOOTING

### ❌ Erreur 500
```
- Vérifier storage/logs/laravel.log (via File Manager)
- Vérifier que .env existe et contient APP_KEY
- Vérifier que storage/ et bootstrap/cache/ ont les permissions 775
```

### ❌ CSS/JS ne chargent pas (page sans style)
```
- Vérifier que public/build/manifest.json existe
- Vérifier que public/hot N'EXISTE PAS
- Vérifier que le Document Root du subdomain pointe vers /public
- Faire Ctrl+Shift+R (hard refresh)
```

### ❌ Page blanche sans erreur
```
- Mettre APP_DEBUG=true temporairement dans .env
- Recharger la page pour voir l'erreur
- Remettre APP_DEBUG=false après diagnostic
```

### ❌ Erreur "No such file: database.sqlite"
```
- Créer le fichier via File Manager : database/database.sqlite (vide)
- Ou uploader le fichier database.sqlite existant
- Lancer les migrations : /migrate.php
```

### ❌ Emails non reçus
```
- Vérifier que MAIL_MAILER=smtp (pas "log")
- Vérifier les credentials SMTP dans .env
- Tester avec le formulaire de contact
- Consulter storage/logs/laravel.log
```

### ❌ Erreur "Class not found" / Vendor
```
- vendor/ n'a pas été uploadé
- Si Hostinger a un Terminal : composer install --no-dev --optimize-autoloader
- Sinon : uploader le dossier vendor/ depuis la machine locale
```

---

## 📦 ALTERNATIVE — Déploiement via GitHub (si SSH disponible)

Si ton plan Hostinger inclut le SSH ou le Terminal :

```bash
# 1. Se connecter en SSH
ssh u123456789@seedcompany.online

# 2. Aller dans le dossier
cd public_html/

# 3. Cloner le repo
git clone https://github.com/XNYASSA/begros.git begrosgroupe
cd begrosgroupe

# 4. Installer les dépendances PHP
composer install --no-dev --optimize-autoloader

# 5. Configurer .env (copier et éditer)
cp .env.production .env
nano .env  # ou vim .env

# 6. Migrer
php artisan migrate --force

# 7. Optimiser
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 8. Permissions
chmod -R 775 storage bootstrap/cache
chmod 664 database/database.sqlite
```

---

## 🔄 Mises à Jour Futures

Pour mettre à jour le site après des modifications :

```bash
# Local : builder les assets
npm run build

# Commit et push
git add -A
git commit -m "Update"
git push origin main
```

**Sur Hostinger (si SSH) :**
```bash
cd public_html/begrosgroupe
git pull origin main
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**Sur Hostinger (sans SSH) :**
- Uploader uniquement les fichiers modifiés via File Manager
- Toujours uploader `public/build/` après `npm run build`

---

*Dernière mise à jour : Juin 2026*
