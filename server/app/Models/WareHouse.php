<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WareHouse extends Model
{
    protected $table='warehouse';
    protected $fillable=['IDAccount'];
    public $timestamps=false;
}
