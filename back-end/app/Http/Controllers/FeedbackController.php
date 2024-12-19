<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Feedback;
use App\Http\Resources\Feedback as FeedbackResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feedbacks = Feedback::with(['user', 'product'])->latest()->get();
        return response()->json($feedbacks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       // Kiểm tra dữ liệu yêu cầu
       $request->validate([
        'product_id' => 'required|exists:products,id',
        'content' => 'required|string|max:1000',
    ]);

    // Lưu feedback mới
    $feedback = Feedback::create([
        'user_id' => Auth::id(),
        'product_id' => $request->product_id,
        'content' => $request->content,
    ]);

    return response()->json([
        'message' => 'Feedback added successfully!',
        'feedback' => $feedback
    ], 201); // HTTP 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json($feedback->load(['user', 'product']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Kiểm tra dữ liệu yêu cầu
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        // Cập nhật nội dung feedback
        $feedback->update([
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => 'Feedback updated successfully!',
            'feedback' => $feedback
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $fb, string $id)
    {
        $feedback->delete();
        return response()->json([
            'message' => 'Feedback deleted successfully!',
        ]);
    }
}
