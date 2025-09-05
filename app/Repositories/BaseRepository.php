<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class BaseRepository implements RepositoryInterface
{

    protected $model;

    public function setModel($model)
    {
        $this->model = $model instanceof Model ? $model : new $model;
        return $this;
    }

    public function getById($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $record = $this->model->find($id);
        $record->update($data);
        $record->refresh();
        return $record;
    }

    public function delete($id)
    {
        $record = $this->model->find($id);
        return $record->delete();
    }

}