<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Http\Resources\Order as OrderResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order = Order::all();
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
}
