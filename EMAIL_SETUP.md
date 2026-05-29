# Configuration des Emails - Begro's Group

## 🧪 Pour Tester en Local

### Option 1 : Mode Log (Gratuit, Inmédiat)
Les emails sont sauvegardés dans les logs au lieu d'être envoyés.

```env
MAIL_MAILER=log
```

Les emails apparaîtront dans `storage/logs/laravel.log`

### Option 2 : Mailtrap (Gratuit, Recommandé pour les tests)

1. **S'inscrire sur Mailtrap** (gratuit)
   - Va sur https://mailtrap.io
   - Crée un compte gratuit
   - Crée une nouvelle "Inbox" (test inbox)

2. **Récupère tes credentials**
   - Dans l'inbox, clique sur "SMTP Settings"
   - Tu verras quelque chose comme :
     ```
     Host: smtp.mailtrap.io
     Port: 465
     Username: abc123xyz
     Password: xyz123abc
     ```

3. **Mets à jour le `.env`**
   ```env
   MAIL_MAILER=smtp
   MAIL_SCHEME=tls
   MAIL_HOST=smtp.mailtrap.io
   MAIL_PORT=465
   MAIL_USERNAME=your_username_here
   MAIL_PASSWORD=your_password_here
   MAIL_FROM_ADDRESS="Ops@begros-group.com"
   MAIL_FROM_NAME="Begro's Group"
   OPS_EMAIL="nyassaxavier@gmail.com"
   ```

4. **Teste le formulaire de contact**
   - Va sur http://localhost:8000
   - Remplis le formulaire de contact
   - Clique "Envoyer le message"
   - Les emails apparaîtront dans ton inbox Mailtrap

### Option 3 : Gmail (Gratuit, pour production)

1. **Active 2FA sur ton compte Google**
   - Va sur https://myaccount.google.com/security

2. **Crée un App Password**
   - https://myaccount.google.com/apppasswords
   - Sélectionne "Mail" et "Windows Computer"
   - Google génère un mot de passe spécial

3. **Mets à jour le `.env`**
   ```env
   MAIL_MAILER=smtp
   MAIL_SCHEME=tls
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=nyassaxavier@gmail.com
   MAIL_PASSWORD=your_app_password_here
   MAIL_FROM_ADDRESS="Ops@begros-group.com"
   MAIL_FROM_NAME="Begro's Group"
   OPS_EMAIL="nyassaxavier@gmail.com"
   ```

## 🚀 Pour la Production sur Hostinger

### Configuration Hostinger
1. Connecte-toi à ton compte Hostinger
2. Va dans **cPanel** → **Email Accounts**
3. Crée un compte email : `ops@yourdomain.com`
4. Note le hostname SMTP fourni par Hostinger

### Mets à jour le `.env` en production
```env
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.hostinger.com (ou le hostname donné par Hostinger)
MAIL_PORT=587
MAIL_USERNAME=ops@yourdomain.com
MAIL_PASSWORD=your_email_password
MAIL_FROM_ADDRESS="ops@yourdomain.com"
MAIL_FROM_NAME="Begro's Group"
OPS_EMAIL="your_personal_email@gmail.com"
```

## ✅ Vérification

Après la configuration, teste le formulaire de contact et vérifie que tu reçois bien les emails.

## 📝 Commandes Utiles

Vérifier les logs des emails (mode log):
```bash
tail -f storage/logs/laravel.log
```

Tester l'envoi d'email via Artisan:
```bash
php artisan tinker
```
Puis:
```php
Mail::raw('Test', function ($mail) { $mail->to('test@example.com'); });
```

---

**Besoin d'aide ?** Contacte le support de Hostinger ou Mailtrap.
