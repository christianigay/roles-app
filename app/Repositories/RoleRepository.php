<?php
namespace App\Repositories;

use App\Models\Role;
use App\Models\User;

class RoleRepository extends BaseRepository
{
    protected $query;

    public function __construct()
    {
        $this->setModel(Role::class);
    }

    public function fetchAll()
    {
        $this->query = User::query();
        $this->sortBy();
        return $this->returnData();
    }

    public function sortBy()
    {
        if(Request()->sort_by){
            $filters = explode('/', Request()->sort_by);
            [$sortKey, $sortType] = $filters;
            $this->query->orderBy($sortKey, $sortType);
        }else{
            $this->query->orderBy('created_at', 'desc');
        }
    }

    private function returnData()
    {
        $perPage = Request()->per_page;
        return $perPage
            ? $this->query->paginate($perPage)
            : $this->query->paginate($this->query->count());
    }

}