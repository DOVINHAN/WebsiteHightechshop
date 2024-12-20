<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Http\Resources\Order as OrderResource;
use Illuminate\Support\Collection;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order = Order::paginate(8);
        $arr = ['status' => true,
                 'message' => 'Order List',
                 'data' => OrderResource::collection($order)
        ];
        return response()->json($arr);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order, string $id)
    {
        $order = Order::find($id);
        if (is_null($order)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $order->delete();
        $arr = ['status' => true,
                'message' => 'Order deleted',
                'data' => []
        ];
        return response()->json($arr);
    }

    public function orderDetails($id)
{
    // Kiểm tra xem người dùng có đăng nhập không
    if (!auth()->check()) {
        return response()->json([
            'success' => false,
            'message' => 'Bạn cần đăng nhập để xem chi tiết đơn hàng.'
        ], 401);
    }

    // Lấy đơn hàng theo ID
    $order = Order::with('orderDetails.product')->find($id);

    // Kiểm tra nếu không tìm thấy đơn hàng
    if (!$order) {
        return response()->json([
            'success' => false,
            'message' => 'Đơn hàng không tồn tại.'
        ], 404);
    }

    // Kiểm tra xem đơn hàng có thuộc về người dùng đang đăng nhập không
    if ($order->user_id !== auth()->user()->id) {
        return response()->json([
            'success' => false,
            'message' => 'Bạn không có quyền xem đơn hàng này.'
        ], 403);
    }

    // Trả về thông tin chi tiết đơn hàng
    return response()->json([
        'success' => true,
        'order' => $order
    ]);
}

}
