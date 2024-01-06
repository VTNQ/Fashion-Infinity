<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class city extends Model
{
    protected $table='city';
    protected $fillable=['Name','type'];
    public $timestamps=false;
}
