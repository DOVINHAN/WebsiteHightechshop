<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     if ($request->user()->hasVerifiedEmail()) {
    //         return redirect()->intended(route('dashboard', absolute: false));
    //     }

    //     $request->user()->sendEmailVerificationNotification();

    //     return back()->with('status', 'verification-link-sent');
    // }
    public function store(Request $request): JsonResponse
    {
        // Kiểm tra nếu người dùng đã xác minh email
        if ($request->user()->hasVerifiedEmail()) {
            // Trả về phản hồi JSON với trạng thái thành công và URL điều hướng
            return response()->json([
                'status' => 'success',
                'message' => __('Email đã được xác minh.'),
            ]);
        }

        // Gửi thông báo xác minh email nếu chưa được xác minh
        $request->user()->sendEmailVerificationNotification();

        // Trả về phản hồi JSON với trạng thái gửi lại link xác minh
        return response()->json([
            'status' => 'pending',
            'message' => __('Đã gửi liên kết xác minh email. Vui lòng kiểm tra email của bạn.')
        ]);
    }
}
