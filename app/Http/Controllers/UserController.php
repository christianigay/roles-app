<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAddRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Repositories\UserRepository;

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

    public function details($id)
    {
        return response()->json($this->repo->getById($id));
    }

    public function store(UserAddRequest $request)
    {
        $data = $request->validated();
        $user = $this->repo->create($data);
        $this->repo->saveRoles($user, $request->roles);
        return response()->json(['result' => $user], 201);
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $data = $request->validated();
        $user = $this->repo->update($id, $data);
        $this->repo->saveRoles($user, $request->roles);
        return response()->json(['result' => $user], 200);
    }
}
