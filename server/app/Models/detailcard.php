<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class detailcard extends Model
{
    protected $table='detailcard';
    protected $fillable=['id_card','id_product','Quality','status'];
    public $timestamps=false;
}
