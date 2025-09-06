<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAddRequest;
use App\Models\User;
use App\Repositories\RepositoryInterface;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $repo;

    public function __construct(UserRepository $userRepo)
    {
        $this->repo = $userRepo;
    }
    
    public function index() 
    {
        return $this->repo->search();
    }

    public function store(UserAddRequest $request)
    {
        $data = $request->validated();
        $user = $this->repo->create($data);
        $this->repo->saveRoles($user, $request->roles);
        return response()->json(['result' => $user], 201);
    }
}
