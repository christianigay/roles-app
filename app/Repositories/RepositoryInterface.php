<?php
namespace App\Repositories;

interface RepositoryInterface
{
    public function setModel($model);
    public function getById($id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete($id);
}