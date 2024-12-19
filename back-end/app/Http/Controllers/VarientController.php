<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Varient;
use App\Http\Resources\Varient as VarientResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class VarientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $varient = Varient::all();
        $arr = ['status' => true,
                 'message' => 'Varient List',
                 'data' => VarientResource::collection($varient)
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
            'color'=> 'required',
            'configure'=> 'required',
            'quantity'=> 'required',
            'price'=> 'required',
            'product_id'=> 'required',
        ]);
        if($validator->fails()){
            $arr = ['success' => false,
                    'message' => 'Error',
                    'data' => $validator->errors()
            ];
            return response()->json($arr);
        }
        $varient = Varient::create($input);
        $arr = ['status' => true,
                'message' => 'Varient added',
                'data' => new VarientResource($varient)
        ];
        return response()->json($arr);
    }

    /**
     * Display the specified resource.
     */
    public function show(Varient $varient, string $id)
    {
        $varient = Varient::find($id);
        if(is_null($varient)){
            $arr = ['success' => false,
                    'message' => 'Not found',
                    'data' => []
            ];
            return response()->json($arr);
        }
        $arr = ['status' => true,
                'message' => 'Item info',
                'data' => new VarientResource($varient)
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
    public function update(Request $request, Varient $varient, string $id)
    {
        $varient = Varient::find($id);
        if (is_null($varient)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $varient->update($request->all());
        return new VarientResource($varient);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Varient $varient, string $id)
    {
        $varient = Varient::find($id);
        if (is_null($varient)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $varient->delete();
        $arr = ['status' => true,
                'message' => 'Varient deleted',
                'data' => []
        ];
        return response()->json($arr);
    }
}
