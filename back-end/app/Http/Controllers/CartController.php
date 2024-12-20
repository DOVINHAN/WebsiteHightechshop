<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    // // Add product to cart
    // public function addToCart(Request $request, $id)
    // {
    //     // Get product by id
    //     $product = Product::find($id);

    //     if (!$product) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Product not found'
    //         ], 404);
    //     }

    //     // Create a cart session if not already set
    //     if (!Session::has('cart')) {
    //         Session::put('cart', []);
    //     }

    //     $cart = Session::get('cart');

    //     // Check if the product already exists in the cart
    //     if (isset($cart[$id])) {
    //         $cart[$id]['quantity'] += $request->quantity;
    //     } else {
    //         $cart[$id] = [
    //             'id' => $product->id,
    //             'name' => $product->name,
    //             'size' => $product->sizes,
    //             'color' => $product->colors,
    //             'quantity' => $request->quantity,
    //             'price' => $product->price,
    //         ];
    //     }

    //     // Update the session cart
    //     Session::put('cart', $cart);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Product added to cart successfully',
    //         'cart' => $cart
    //     ]);
    // }
    public function addToCart(Request $request)
{
    // Kiểm tra xem mảng sản phẩm có được gửi tới hay không
    $products = $request->input('products', []);

    if (empty($products)) {
        return response()->json([
            'success' => false,
            'message' => 'No products provided to add to cart'
        ], 400);
    }

    // Tạo giỏ hàng nếu chưa có
    if (!Session::has('cart')) {
        Session::put('cart', []);
    }

    $cart = Session::get('cart');

    // Lặp qua các sản phẩm và thêm vào giỏ hàng
    foreach ($products as $productData) {
        $product = Product::find($productData['id']);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product with ID ' . $productData['id'] . ' not found'
            ], 404);
        }

        $quantity = $productData['quantity'] ?? 1; // Mặc định là 1 nếu không có quantity

        // Kiểm tra nếu sản phẩm đã có trong giỏ hàng, nếu có thì cộng dồn số lượng
        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $quantity;
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            $cart[$product->id] = [
                'id' => $product->id,
                'name' => $product->name,
                'sizes' => $product->sizes,
                'colors' => $product->colors,
                'quantity' => $quantity,
                'price' => $product->price,
                'discount_price' => $product->discount_price ?? 0, // Lưu giá giảm giá nếu có
            ];
        }
    }

    // Cập nhật giỏ hàng vào session
    Session::put('cart', $cart);

    return response()->json([
        'success' => true,
        'message' => 'Products added to cart successfully',
        'cart' => $cart
    ]);
}


    // View the cart
    public function viewCart()
    {
        $cart = Session::get('cart', []);

        return response()->json([
            'success' => true,
            'cart' => $cart
        ]);
    }

    // Remove item from cart
    public function removeFromCart($id)
    {
        $cart = Session::get('cart', []);

        if (!isset($cart[$id])) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found in cart'
            ], 404);
        }

        unset($cart[$id]);

        // Update the session cart
        Session::put('cart', $cart);

        return response()->json([
            'success' => true,
            'message' => 'Product removed from cart successfully',
            'cart' => $cart
        ]);
    }

    // Clear the entire cart
    public function clearCart()
    {
        Session::forget('cart');

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared successfully'
        ]);
    }

    public function checkout(Request $request)
    {
        // Kiểm tra người dùng đã đăng nhập chưa
        if (!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn cần đăng nhập để thanh toán.'
            ], 401);
        }

        // Lấy thông tin người dùng đã đăng nhập
        $user = auth()->user();

        // Lấy thông tin địa chỉ và số điện thoại từ bảng address qua quan hệ
        $address = $user->address; // Mối quan hệ đã được định nghĩa trong model User

        // Kiểm tra nếu không có thông tin địa chỉ
        if (!$address) {
            return response()->json([
                'success' => false,
                'message' => 'Không có thông tin địa chỉ cho người dùng này.'
            ], 400);
        }

         // Lấy số điện thoại từ bảng address
        $phone = $address->phone;

        // Kiểm tra giỏ hàng
        $cart = Session::get('cart', []);
        if (empty($cart)) {
            return response()->json([
                'success' => false,
                'message' => 'Giỏ hàng của bạn hiện tại đang trống.'
            ], 400);
        }

        // Tính tổng giá trị giỏ hàng
        $totalPrice = 0;
        foreach ($cart as $item) {
            // Nếu sản phẩm có discount_price, sử dụng discount_price, nếu không thì dùng price
            $priceToUse = $item['discount_price'] > 0 ? $item['discount_price'] : $item['price'];
            $totalPrice += $item['quantity'] * $priceToUse;
        }

        // Lưu thông tin đơn hàng vào bảng `order`
        $order = new Order();
        $order->name = $user->name;           // Lấy tên người dùng từ thông tin đăng nhập
        $order->address = $address->address;  // Lấy địa chỉ từ bảng `address`
        $order->phone = $address->phone;     // Lấy số điện thoại từ bảng `address`
        $order->payment = $request->payment;  // Phương thức thanh toán từ form ReactJS
        $order->total_price = $totalPrice;
        $order->user_id = $user->id;          // ID người dùng đã đăng nhập
        $order->save();

        // Lưu thông tin chi tiết đơn hàng vào bảng `orderdetail`
        foreach ($cart as $item) {
        $orderDetail = new OrderDetail();
        $orderDetail->order_id = $order->id; // Gán ID đơn hàng
        $orderDetail->product_id = $item['id']; // Gán ID sản phẩm
        $orderDetail->price = $item['discount_price'] > 0 ? $item['discount_price'] : $item['price']; // Giá sản phẩm
        $orderDetail->quantity = $item['quantity']; // Số lượng sản phẩm
        $orderDetail->save(); // Lưu chi tiết đơn hàng

        // Cập nhật số lượng tồn kho của sản phẩm
        $product = Product::find($item['id']);
        if ($product) {
            $product->quantity -= $item['quantity']; // Trừ đi số lượng đã bán
            $product->save(); // Lưu lại sản phẩm với số lượng mới
        }
    }


        // Xóa giỏ hàng sau khi thanh toán
        Session::forget('cart');

        return response()->json([
            'success' => true,
            'message' => 'Thanh toán thành công!',
            'order' => $order
        ]);
    }
}
