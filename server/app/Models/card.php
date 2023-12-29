<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class card extends Model
{
    protected $table='card';
    protected $fillable=['id_Account'];
    public $timestamps=false;
}
