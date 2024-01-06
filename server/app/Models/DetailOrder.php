<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailOrder extends Model
{
    protected $table='detailorder';
    protected $fillable=['id_order','id_product','Quality'];
    public $timestamps=false;

}
