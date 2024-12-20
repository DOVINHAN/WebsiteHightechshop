<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    // public function __invoke(Request $request): RedirectResponse|View
    // {
    //     return $request->user()->hasVerifiedEmail()
    //                 ? redirect()->intended(route('dashboard', absolute: false))
    //                 : view('auth.verify-email');
    // }

    public function __invoke(Request $request): JsonResponse
{
    // Kiểm tra nếu người dùng đã xác minh email
    if ($request->user()->hasVerifiedEmail()) {
        // Trả về phản hồi JSON thành công với URL điều hướng
        return response()->json([
            'status' => 'success',
        ]);
    }

    // Nếu email chưa được xác minh, gửi liên kết xác minh
    return response()->json([
        'status' => 'pending',
        'message' => __('Vui lòng xác minh email của bạn để tiếp tục.')
    ]);
}
}
