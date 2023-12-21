<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category_Product extends Model
{
    protected $table='category_product';
    protected $fillable=['id_Category','id_Product','size','Color','id_Picture'];
    public $timestamps=false;
}
