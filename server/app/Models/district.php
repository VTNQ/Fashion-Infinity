<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class district extends Model
{
    protected $table='district';
    protected $fillable=['Name','type','ID_city'];
    public $timestamps=false;
}
