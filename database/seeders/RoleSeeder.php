<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['Author', 'Editor', 'Subscriber', 'Administrator'];
        foreach($roles as $name) {
            Role::firstOrCreate(['name' => $name]);
        }
    }
}
