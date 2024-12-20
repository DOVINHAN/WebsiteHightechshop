<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Address;
use App\Http\Resources\Address as AddressResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    // Display a listing of addresses of the currently authenticated user
    public function index()
    {
        $user = auth()->user(); // Lấy thông tin người dùng đang đăng nhập
        $addresses = Address::where('user_id', $user->id)->get(); // Lọc địa chỉ theo user_id của người dùng hiện tại
        return response()->json($addresses);
    }

    // Store a newly created address in the database
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'address' => 'required',
            'phone' => 'required',
        ]);

        $user = auth()->user(); // Lấy thông tin người dùng đang đăng nhập
        $validatedData['user_id'] = $user->id; // Thêm user_id vào dữ liệu để lưu

        $address = Address::create($validatedData); // Tạo địa chỉ mới
        return response()->json($address, 201); // Trả về địa chỉ đã tạo
    }

    // Display the specified address
    public function show($id)
    {
        $user = auth()->user(); // Lấy thông tin người dùng đang đăng nhập
        $address = Address::where('id', $id)->where('user_id', $user->id)->first(); // Lọc địa chỉ của người dùng hiện tại

        if (!$address) {
            return response()->json(['error' => 'Address not found or unauthorized'], 404); // Nếu không tìm thấy địa chỉ hoặc không phải của người dùng
        }

        return response()->json($address); // Trả về địa chỉ
    }

    // Update the specified address in the database
    public function update(Request $request, $id)
    {
        $user = auth()->user(); // Lấy thông tin người dùng đang đăng nhập
        $address = Address::where('id', $id)->where('user_id', $user->id)->first(); // Lọc địa chỉ của người dùng hiện tại

        if (!$address) {
            return response()->json(['error' => 'Address not found or unauthorized'], 404); // Nếu không tìm thấy địa chỉ hoặc không phải của người dùng
        }

        // Validate the incoming data
        $validatedData = $request->validate([
            'address' => 'required',
            'phone' => 'required',
        ]);

        $address->update($validatedData); // Cập nhật địa chỉ
        return response()->json($address); // Trả về địa chỉ đã cập nhật
    }

    // Remove the specified address from the database
    public function destroy($id)
    {
        $user = auth()->user();
        $address = Address::where('id', $id)->where('user_id', $user->id)->first(); // Lọc địa chỉ của người dùng hiện tại

        if (!$address) {
            return response()->json(['error' => 'Address not found or unauthorized'], 404); // Nếu không tìm thấy địa chỉ hoặc không phải của người dùng
        }

        $address->delete(); // Xóa địa chỉ
        return response()->json(['message' => 'Address deleted successfully']); // Trả về thông báo xóa thành công
    }
}
