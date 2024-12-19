<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Image as ImageResource;
use Illuminate\Support\Collection;

class ImageController extends Controller
{
    // Hiển thị danh sách hình ảnh
    public function index()
    {
        $images = Image::all();
        return response()->json($images);
    }

    // Hiển thị chi tiết hình ảnh
    public function show($id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response()->json($image);
    }

    // Lưu hình ảnh mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Xử lý file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('images', 'public'); // Lưu vào thư mục storage/app/public/images

            // Tạo bản ghi trong database
            $image = new Image();
            $image->name = $request->name;
            $image->path = $path;
            $image->save();

            return response()->json(['message' => 'Image uploaded successfully', 'image' => $image], 201);
        }

        return response()->json(['message' => 'File upload failed'], 400);
    }

    // Cập nhật hình ảnh
    public function update(Request $request, $id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->has('name')) {
            $image->name = $request->name;
        }

        // Xử lý cập nhật file mới
        if ($request->hasFile('file')) {
            // Xóa file cũ
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }

            // Lưu file mới
            $file = $request->file('file');
            $path = $file->store('images', 'public');
            $image->path = $path;
        }

        $image->save();

        return response()->json(['message' => 'Image updated successfully', 'image' => $image]);
    }

    // Xóa hình ảnh
    public function destroy($id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        // Xóa file
        if (Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        // Xóa bản ghi
        $image->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }
}
