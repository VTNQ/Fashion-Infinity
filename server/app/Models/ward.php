<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ward extends Model
{
    protected $table='ward';
    protected $fillable=['Name','type','ID_district'];
    public $timestamps=false;
}
