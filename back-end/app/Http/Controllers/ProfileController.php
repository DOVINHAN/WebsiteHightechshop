<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $user = $request->user();

        // Điền thông tin người dùng với dữ liệu đã xác thực
        $user->fill($request->validated());

        // Kiểm tra nếu email có thay đổi (dirty)
        if ($user->isDirty('email')) {
            // Đặt giá trị email_verified_at là null nếu email bị thay đổi
            $user->email_verified_at = null;
        }

        // Lưu dữ liệu người dùng đã được cập nhật
        $user->save();

        // Trả về phản hồi JSON với trạng thái cập nhật và dữ liệu người dùng đã thay đổi
        return response()->json([
            'status' => 'profile-updated',
            'user' => $user,
        ]);
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
