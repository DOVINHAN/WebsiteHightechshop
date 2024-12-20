<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        foreach($user as &$usr) {
            unset($usr->password);
        }
        $arr = ['status' => true,
                 'message' => 'Users list',
                 'data' => UserResource::collection($user)
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
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'role' => 'required',
        ]);
        if($validator->fails()){
            $arr = ['success' => false,
                    'message' => 'Error',
                    'data' => $validator->errors()
            ];
            return response()->json($arr, 404);
        }
        $user = User::create($input);
        $arr = ['status' => true,
                'message' => 'User added',
                'data' => new UserResource($user)
        ];
        return response()->json($arr,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if(is_null($user)){
            $arr = ['success' => false,
                    'message' => 'Not found',
                    'data' => []
            ];
            return response()->json($arr, 404);
        }
        foreach($user as &$usr) {
            unset($usr->password);
        }
        $arr = ['status' => true,
                'message' => 'Item info',
                'data' => new UserResource($user)
        ];
        return response()->json($arr, 200);
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
    public function update(Request $request, User $user)
    {
       //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, string $id)
    {
        $user = User::find($id);
        if (is_null($user)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $user->delete();
        $arr = ['status' => true,
                'message' => 'User deleted',
                'data' => []
        ];
        return response()->json($arr);
    }

    /**
     * Search.
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
        ]);

        $keyword = $validated['keyword'];

        $user = User::where('name', 'like', '%' . $keyword . '%')
            ->orWhere('email', 'like', '%' . $keyword . '%')
            ->get();

        return response()->json($user);
    }

    public function showUserAddress(string $id)
{
    // Tìm người dùng theo ID và eager load địa chỉ
    $user = User::with('address')->find($id);

    if (is_null($user)) {
        $arr = [
            'success' => false,
            'message' => 'Not found',
            'data' => []
        ];
        return response()->json($arr, 404);
    }

    // Xóa password trước khi trả về dữ liệu
    unset($user->password);

    // Tạo phản hồi bao gồm thông tin người dùng và địa chỉ
    $arr = [
        'status' => true,
        'message' => 'Item info',
        'data' => new UserResource($user)
    ];

    return response()->json($arr, 200);
}

}
