<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Varient;

class CartController extends Controller
{
    // Thêm sản phẩm vào giỏ hàng
    public function addToCart(Request $request, $varient_id)
    {
        // Lấy chi tiết variant sản phẩm từ DB
        $variant = Varient::with('product')->findOrFail($varient_id);

        // Lấy giỏ hàng từ session (hoặc khởi tạo nếu chưa có)
        $cart = session()->get('cart', []);

        // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
        if (isset($cart[$varient_id])) {
            // Tăng số lượng nếu đã tồn tại
            $cart[$varient_id]['quantity'] += 1;
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            $cart[$varient_id] = [
                'name' => $variant->product->name,
                'color' => $variant->color,
                'configure' => $variant->configure,
                'price' => $variant->price,
                'quantity' => 1,
                'image' => $variant->image_id,
            ];
        }

        // Lưu lại giỏ hàng vào session
        session()->put('cart', $cart);

        // Phản hồi hoặc redirect
        return response()->json([
            'message' => 'Sản phẩm đã được thêm vào giỏ hàng thành công!',
            'cart' => $cart
        ]);
    }

    // Hiển thị giỏ hàng
    public function viewCart()
    {
        $cart = session()->get('cart', []);
        return view('cart.index', compact('cart'));
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeFromCart($varient_id)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$varient_id])) {
            unset($cart[$varient_id]);
            session()->put('cart', $cart);
        }

        return response()->json([
            'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng!',
            'cart' => $cart
        ]);
    }

    public function checkout(Request $request)
{
    // Kiểm tra giỏ hàng
    $cart = session()->get('cart', []);
    if (empty($cart)) {
        return redirect()->route('cart.view')->with('error', 'Giỏ hàng trống!');
    }

    // Tính tổng giá tiền
    $totalPrice = array_reduce($cart, function ($carry, $item) {
        return $carry + ($item['price'] * $item['quantity']);
    }, 0);

    // Tạo hóa đơn
    $order = Order::create([
        'customer_name' => $request->customer_name,
        'customer_email' => $request->customer_email,
        'customer_address' => $request->customer_address,
        'customer_phone' => $request->customer_phone,
        'total_price' => $totalPrice,
    ]);

    // Lưu chi tiết hóa đơn
    foreach ($cart as $varient_id => $details) {
        OrderDetail::create([
            'order_id' => $order->id,
            'varient_id' => $varient_id,
            'quantity' => $details['quantity'],
            'price' => $details['price'],
        ]);
    }

    // Xóa giỏ hàng khỏi session
    session()->forget('cart');

    return redirect()->route('cart.view')->with('success', 'Đơn hàng đã được tạo thành công!');
}
}
