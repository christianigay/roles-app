<?php
namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
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
        
    }

}