<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAddRequest;
use App\Models\User;
use App\Repositories\RepositoryInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $repo;

    public function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo->setModel(User::class);
    }
    
    public function index() 
    {
        $users = User::all(['id', 'name', 'email']);
        return response()->json($users);
    }

    public function store(UserAddRequest $request)
    {
        $data = $request->validated();
        $result = $this->repo->create($data);
        return response()->json(['result' => $result], 201);
    }
}
