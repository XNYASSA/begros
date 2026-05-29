<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            $opsEmail = config('mail.ops_email', 'nyassaxavier@gmail.com');

            // Send raw email to ops
            Mail::raw('Message from: ' . $validated['name'] . "\n\nSubject: " . $validated['subject'] . "\n\nMessage:\n" . $validated['message'], function ($mail) use ($validated, $opsEmail) {
                $mail->to($opsEmail)
                     ->from(config('mail.from.address'))
                     ->subject('Contact: ' . $validated['subject'])
                     ->replyTo($validated['email'], $validated['name']);
            });

            // Send confirmation to user
            Mail::raw('Merci pour votre message. Nous vous recontacterons bientôt.', function ($mail) use ($validated) {
                $mail->to($validated['email'])
                     ->from(config('mail.from.address'))
                     ->subject('Confirmation - Begro\'s Group');
            });

            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.',
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'envoi d\'email: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
            ], 500);
        }
    }
}
