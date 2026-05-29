# Guide de Déploiement - Begro's Group sur Hostinger

## ✅ Avant le Déploiement

- [ ] Tester le site en local : `php artisan serve` + `npm run dev`
- [ ] Tester le formulaire de contact
- [ ] Vérifier que tous les liens de navigation fonctionnent
- [ ] Tester le Hero Slider
- [ ] Vérifier les GlowCards
- [ ] Tester le modal des services

## 🚀 Étapes de Déploiement

### 1. Pousser sur GitHub
```bash
git add -A
git commit -m "Préparation pour déploiement"
git push origin main
```

### 2. Accéder à Hostinger

**Via cPanel :**
1. Va sur ton espace Hostinger
2. Clique sur **cPanel**
3. Cherche **File Manager** ou **Terminal**

**Via SSH (Terminal) :**
```bash
ssh user@your_domain.com
cd /home/user/public_html
```

### 3. Cloner le Repository GitHub

```bash
git clone https://github.com/XNYASSA/begros.git .
```

### 4. Installer les Dépendances

```bash
composer install
npm install --legacy-peer-deps
```

### 5. Configurer le .env pour Production

```bash
cp .env.example .env
```

Édite le `.env` avec :
```env
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:RFzYtzdRYkIbPPUESchVq6tfcqYiArdu0ganecncg+w=

APP_URL=https://begrosgroupe.seedcompany.online

DB_CONNECTION=sqlite
# Ou configure la base de données si fournie par Hostinger

MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=ops@begrosgroupe.com
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS="ops@begrosgroupe.com"
MAIL_FROM_NAME="Begro's Group"
OPS_EMAIL="nyassaxavier@gmail.com"
```

### 6. Générer la Clé d'Application

```bash
php artisan key:generate
```

### 7. Compiler les Assets

```bash
npm run build
```

### 8. Exécuter les Migrations (si nécessaire)

```bash
php artisan migrate
```

### 9. Configurer les Permissions

```bash
chmod -R 775 storage bootstrap/cache
chmod -R 755 public
```

### 10. Configurer le Web Server (Apache/.htaccess)

Assure-toi que `.htaccess` existe dans `/public`

Si ce n'est pas le cas, crée-le avec :
```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

## 🧪 Tester en Production

1. Va sur **https://begrosgroupe.seedcompany.online**
2. Teste toutes les sections
3. Teste le formulaire de contact
4. Vérifie que tu reçois l'email sur nyassaxavier@gmail.com

## 🛠️ Troubleshooting

### Erreur 500
- Vérifier le fichier `storage/logs/laravel.log`
- Assurer que les permissions sont correctes
- Vérifier que la clé APP_KEY est correcte

### Formulaire de contact ne fonctionne pas
- Vérifier les credentials SMTP
- Vérifier le fichier `storage/logs/laravel.log`
- S'assurer que MAIL_MAILER n'est pas en "log"

### Assets CSS/JS ne chargent pas
- Vérifier que `npm run build` a été exécuté
- Vérifier le fichier public/hot (supprimer si présent)
- Faire un hard refresh du navigateur (Ctrl+Shift+R)

### Base de données SQLite non accessible
- Copier le fichier `database/database.sqlite` sur le serveur
- Assurer les permissions : `chmod 666 database/database.sqlite`

## ✅ Checklist Final

- [ ] Site accessible sur https://begrosgroupe.seedcompany.online
- [ ] Hero Slider fonctionne
- [ ] GlowCards réactifs
- [ ] Formulaire de contact envoie les emails
- [ ] Email reçu sur nyassaxavier@gmail.com
- [ ] Tous les liens de navigation fonctionnent
- [ ] Modal des services fonctionne
- [ ] Responsif sur mobile
- [ ] Pas d'erreurs dans la console
- [ ] Pas d'erreurs dans storage/logs/laravel.log

## 📞 Besoin d'Aide ?

Contacte le support Hostinger pour toute question relative aux permissions, SSH, ou configuration du serveur.

---

**Bon déploiement ! 🚀**
