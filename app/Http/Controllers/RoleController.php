<?php

namespace App\Http\Controllers;

use App\Repositories\RoleRepository;

class RoleController extends Controller
{
    protected $repo;

    public function __construct(RoleRepository $roleRepo)
    {
        $this->repo = $roleRepo;
    }

    public function index()
    {
        return $this->repo->fetchAll();
    }
    
}
