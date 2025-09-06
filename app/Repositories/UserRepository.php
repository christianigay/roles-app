<?php
namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{

    protected $query;

    public function __construct()
    {
        $this->setModel(User::class);
    }

    public function saveRoles(User $user, array $roleIds)
    {
        return $user->roles()->sync($roleIds);
    }

    public function search()
    {
        $this->query = User::query();
        $this->searchByRoles();
        $this->sortBy();
        return $this->returnData();
    }

    private function searchByRoles()
    {
        if(Request()->roles) {
            $this->query->whereHas('roles', function($query){
                $ids = explode(',', Request()->roles);
                $query->whereIn('roles.id', $ids);
            });
        }
    }

    private function sortBy()
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