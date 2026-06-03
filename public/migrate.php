<?php
/**
 * Script de migration pour Hostinger (sans accès SSH)
 * Accès: https://begrosgroupe.seedcompany.online/migrate.php
 *
 * ⚠️ IMPORTANT: Supprimez ce fichier après la première exécution!
 */

// Racine du projet = un niveau au-dessus de public/
$basePath = dirname(__DIR__);

// Charge l'autoloader Composer
require $basePath . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once $basePath . '/bootstrap/app.php';

// Récupère le kernel console
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);

try {
    echo "<h1>🚀 Exécution des migrations...</h1>";
    echo "<pre style='background:#f4f4f4;padding:15px;border-radius:5px;font-family:monospace;'>";

    ob_start();
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
    echo htmlspecialchars(ob_get_clean());

    echo "\n✅ Migrations OK!";
    echo "\n\n<strong>Étape suivante:</strong>";
    echo "\n→ Visitez: https://begrosgroupe.seedcompany.online/setup-production";
    echo "\n→ Puis supprimez ce fichier via File Manager Hostinger.";
    echo "</pre>";

} catch (\Exception $e) {
    echo "<h1>❌ Erreur migrations</h1>";
    echo "<pre style='background:#ffebee;padding:15px;border-radius:5px;color:#c62828;'>";
    echo "Erreur: " . htmlspecialchars($e->getMessage());
    echo "\n\nTrace:\n" . htmlspecialchars($e->getTraceAsString());
    echo "</pre>";
    exit(1);
}
?>
