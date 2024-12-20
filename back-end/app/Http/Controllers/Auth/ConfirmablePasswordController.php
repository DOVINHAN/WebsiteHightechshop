<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function show(): View
    {
        return view('auth.confirm-password');
    }

    /**
     * Confirm the user's password.
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     if (! Auth::guard('web')->validate([
    //         'email' => $request->user()->email,
    //         'password' => $request->password,
    //     ])) {
    //         throw ValidationException::withMessages([
    //             'password' => __('auth.password'),
    //         ]);
    //     }

    //     $request->session()->put('auth.password_confirmed_at', time());

    //     return redirect()->intended(route('dashboard', absolute: false));
    // }
    public function store(Request $request)
    {
        // Validate the user's credentials
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            // Return a JSON response with an error message
            return response()->json([
                'status' => 'error',
                'message' => __('auth.password')
            ], 422); // Unprocessable Entity
        }

        // Store the password confirmation timestamp in the session
        $request->session()->put('auth.password_confirmed_at', time());

        // Return a JSON response indicating success, along with the URL for redirection
        return response()->json([
            'status' => 'success',
            'redirect_url' => route('dashboard', absolute: false)
        ]);
    }
}
