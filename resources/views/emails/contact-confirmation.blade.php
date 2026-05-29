<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(to right, #001A4D, #003DA5);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .cta {
            background: #FF6B00;
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
            text-decoration: none;
            display: inline-block;
        }
        .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }
        .contact-info {
            background: white;
            padding: 15px;
            border-left: 4px solid #FF6B00;
            border-radius: 4px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Merci pour votre message! 🎉</h2>
            <p>Begro's Group</p>
        </div>

        <div class="content">
            <p>Bonjour <strong>{{ $name }}</strong>,</p>

            <p>Nous avons bien reçu votre message. Merci de nous avoir contactés pour en savoir plus sur nos services d'assistance aérienne.</p>

            <p><strong>Détails de votre message :</strong></p>
            <div class="contact-info">
                <p><strong>Sujet:</strong> {{ $subject }}</p>
            </div>

            <p>Notre équipe des opérations 24/7 (Ops Desk) examinera votre demande et vous recontacterons dans les plus brefs délais.</p>

            <p>En attendant, n'hésitez pas à nous contacter directement :</p>
            <div class="contact-info">
                <p>📧 <strong>Email:</strong> <a href="mailto:Ops@begros-group.com">Ops@begros-group.com</a></p>
                <p>📞 <strong>Téléphone:</strong> +237 677-98-89-29</p>
                <p>📍 <strong>Lieu:</strong> Yaoundé, Tsinga - Cameroun</p>
            </div>

            <p>Nous nous réjouissons de servir vos besoins opérationnels en Afrique Centrale.</p>

            <p>Cordialement,<br>
            <strong>L'équipe Begro's Group</strong></p>
        </div>

        <div class="footer">
            <p>Begro's Group - Votre partenaire de confiance pour l'assistance aérienne</p>
            <p>{{ config('app.url') }}</p>
        </div>
    </div>
</body>
</html>
