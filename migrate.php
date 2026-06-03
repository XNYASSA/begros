<?php
/**
 * Script de migration pour Hostinger (sans accès SSH)
 * Accès: https://begrosgroupe.seedcompany.online/migrate.php
 *
 * ⚠️ IMPORTANT: Supprimez ce fichier après la première exécution!
 */

// Détermine le répertoire racine du projet
$basePath = dirname(__FILE__);

// Charge l'autoloader Composer
require $basePath . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once $basePath . '/bootstrap/app.php';

// Récupère l'application
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);

try {
    // Exécute les migrations
    echo "<h1>🚀 Exécution des migrations...</h1>";
    echo "<pre style='background: #f4f4f4; padding: 15px; border-radius: 5px; font-family: monospace;'>";

    // Capture la sortie des commandes
    ob_start();

    // Exécute migrate
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
    $migrateOutput = ob_get_clean();

    echo htmlspecialchars($migrateOutput);

    echo "\n\n✅ Migrations exécutées avec succès!";
    echo "\n\n<strong>Prochaines étapes:</strong>";
    echo "\n1. Visitez: https://begrosgroupe.seedcompany.online/setup-production";
    echo "\n2. Supprimez ce fichier (migrate.php) via FTP";

    echo "</pre>";

} catch (\Exception $e) {
    echo "<h1>❌ Erreur lors des migrations</h1>";
    echo "<pre style='background: #ffebee; padding: 15px; border-radius: 5px; color: #c62828;'>";
    echo "Erreur: " . htmlspecialchars($e->getMessage());
    echo "\n\nTrace:\n";
    echo htmlspecialchars($e->getTraceAsString());
    echo "</pre>";
    exit(1);
}
?>
