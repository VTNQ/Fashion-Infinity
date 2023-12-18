<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    protected $table='picture';
    protected $fillable=['ID','link',"status"];
    public $timestamps=false;
}
