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
        }
        .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #001A4D;
            margin-bottom: 5px;
        }
        .value {
            background: white;
            padding: 10px;
            border-left: 4px solid #FF6B00;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>✉️ Nouveau Message de Contact</h2>
            <p>Un client a envoyé un message via le formulaire de contact</p>
        </div>

        <div class="content">
            <div class="field">
                <div class="label">Sujet</div>
                <div class="value">{{ $subject }}</div>
            </div>

            <div class="field">
                <div class="label">Nom</div>
                <div class="value">{{ $name }}</div>
            </div>

            <div class="field">
                <div class="label">Email</div>
                <div class="value">
                    <a href="mailto:{{ $email }}">{{ $email }}</a>
                </div>
            </div>

            @if($phone)
            <div class="field">
                <div class="label">Téléphone</div>
                <div class="value">{{ $phone }}</div>
            </div>
            @endif

            <div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">{{ $message }}</div>
            </div>
        </div>

        <div class="footer">
            <p>Message reçu de {{ config('app.name') }} - {{ date('d/m/Y à H:i') }}</p>
        </div>
    </div>
</body>
</html>
