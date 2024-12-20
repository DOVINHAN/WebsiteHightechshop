<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\Categories;
use App\Http\Resources\Product as ProductResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::paginate(8);
        $arr = ['status' => true,
                 'message' => 'Product List',
                 'data' => ProductResource::collection($product)
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
        $input = $request->all();
        $validator = Validator::make($input,[
            'name' => 'required',
            'sizes' => 'nullable|strings',
            'colors' => 'nullable|string',
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'price' => 'required',
            'discount_price' => 'nullable|required',
            'cate_id' => 'required|integer',
            'image_id' => 'required|integer',
        ]);
        if($validator->fails()){
            $arr = ['success' => false,
                    'message' => 'Error',
                    'data' => $validator->errors()
            ];
            return response()->json($arr);
        }
        $product = Product::create($input);
        $arr = ['status' => true,
                'message' => 'Product added',
                'data' => new ProductResource($product)
        ];
        return response()->json($arr);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product, string $id)
    {
        $product = Product::find($id);
        if(is_null($product)){
            $arr = ['success' => false,
                    'message' => 'Not found',
                    'data' => []
            ];
            return response()->json($arr);
        }
        $arr = ['status' => true,
                'message' => 'Item info',
                'data' => new ProductResource($product)
        ];
        return response()->json($arr);
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
    public function update(Request $request, Product $product, string $id)
    {
        $product = Product::find($id);
        if (is_null($product)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $product->update($request->all());
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, string $id)
    {
        $product = Product::find($id);
        if (is_null($product)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $product->delete();
        $arr = ['status' => true,
                'message' => 'Product deleted',
                'data' => []
        ];
        return response()->json($arr);
    }

    public function getByCategory(Product $product ,Categories $cate,  string $id)
    {
        // Lấy danh mục với id là $categoryId
        $cate = Categories::findOrFail($id);

        // Lấy sản phẩm của danh mục này
        $product = $cate->product; // Sử dụng relationship đã khai báo

        // Trả về JSON với danh mục và các sản phẩm
        return response()->json([
            'categories' => $cate,
        ]);
    }

    public function search(Request $request)
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
        ]);

        $keyword = $validated['keyword'];

        $product = Product::where('name', 'like', '%' . $keyword . '%')
            ->orWhere('description', 'like', '%' . $keyword . '%')
            ->orWhere('sizes', 'like', '%' . $keyword . '%')
            ->orWhere('colors', 'like', '%' . $keyword . '%')
            ->get();

        return response()->json($product);
    }

    public function showByDiscount(Request $request)
    {
        // Get products with a discount and paginate 8 per page
        $product = Product::getDiscountedProducts();

        // Return the products as a JSON response
        return response()->json($product);
    }
}
