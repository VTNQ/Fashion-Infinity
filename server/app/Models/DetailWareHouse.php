<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailWareHouse extends Model
{
    protected $table='detail_warehouse';
    protected $fillable=['ID_WareHouse','ID_Product','Quality','CreateTime'];
    public $timestamps=false;
}
