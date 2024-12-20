<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    // Hiển thị danh sách hình ảnh
    public function index()
    {
        $images = Image::all();
        return response()->json($images);
    }

    // Tạo một hình ảnh mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required',
        ]);

        $image = Image::create($request->all());
        return response()->json($image, 201);
    }

    // Hiển thị chi tiết một hình ảnh
    public function show($id)
    {
        $image = Image::findOrFail($id);
        return response()->json($image);
    }

    // Cập nhật một hình ảnh
    public function update(Request $request, $id)
    {
        $image = Image::findOrFail($id);
        $request->validate([
            'name' => 'string|max:255',
            'image' => 'string',
        ]);

        $image->update($request->all());
        return response()->json($image);
    }

    // Xóa một hình ảnh
    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();
        return response()->json(['message' => 'Image deleted successfully.']);
    }
}
