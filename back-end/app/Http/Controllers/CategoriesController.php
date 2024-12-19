<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Categories;
use App\Http\Resources\Categories as CategoriesResource;
use Illuminate\Support\Collection;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cate = Categories::all();
        $arr = ['status' => true,
                 'message' => 'Categories List',
                 'data' => CategoriesResource::collection($cate)
        ];
        return response()->json($arr, 200);
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
            'name'=> 'required',
        ]);
        if($validator->fails()){
            $arr = ['success' => false,
                    'message' => 'Error',
                    'data' => $validator->errors()
            ];
            return response()->json($arr,200);
        }
        $cate = Categories::create($input);
        $arr = ['status' => true,
                'message' => 'Category added',
                'data' => new CategoriesResource($cate)
        ];
        return response()->json($arr,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categories $cate, string $id)
    {
        $cate = Categories::find($id);
        if(is_null($cate)){
            $arr = ['success' => false,
                    'message' => 'Not found',
                    'data' => []
            ];
            return response()->json($arr);
        }
        $arr = ['status' => true,
                'message' => 'Category info',
                'data' => new CategoriesResource($cate)
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
    public function update(Request $request, Categories $cate, string $id)
    {
        $cate = Categories::find($id);
        if (is_null($cate)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $cate->update($request->all());
        return new CategoriesResource($cate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $cate, string $id)
    {
        $cate = Categories::find($id);
        if (is_null($cate)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $cate->delete();
        $arr = ['status' => true,
                'message' => 'Category deleted',
                'data' => []
        ];
        return response()->json($arr);
    }
}
