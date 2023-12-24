<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table='product';
    protected $primaryKey = 'ID';
    protected $fillable = ['Name','content','id_provider','Price'];
    public $timestamps=false;
}
