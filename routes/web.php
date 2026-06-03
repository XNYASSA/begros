<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

// Contact form
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

// Test route - vérifie que les données arrivent bien
Route::post('/contact-test', function (\Illuminate\Http\Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'phone' => 'nullable|string|max:20',
        'subject' => 'required|string|max:255',
        'message' => 'required|string|max:5000',
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Test réussi ! Données bien reçues.',
        'data' => $validated,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route de configuration pour production (Hostinger)
Route::get('/setup-production', function () {
    try {
        // Créer le lien symbolique storage
        \Illuminate\Support\Facades\Artisan::call('storage:link');

        // Mettre en cache la configuration
        \Illuminate\Support\Facades\Artisan::call('config:cache');

        // Mettre en cache les routes
        \Illuminate\Support\Facades\Artisan::call('route:cache');

        // Mettre en cache les vues
        \Illuminate\Support\Facades\Artisan::call('view:cache');

        return response()->json([
            'success' => true,
            'message' => 'Configuration de production réussie!',
            'commands' => [
                'storage:link' => 'Créé',
                'config:cache' => 'Caché',
                'route:cache' => 'Caché',
                'view:cache' => 'Caché',
            ],
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur: ' . $e->getMessage(),
        ], 500);
    }
});

require __DIR__.'/auth.php';
