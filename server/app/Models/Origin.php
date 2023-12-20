<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Origin extends Model
{
    protected $table='origin';
    protected $fillable=['ID','Name','Address'];
    public $timestamps=false;
}
