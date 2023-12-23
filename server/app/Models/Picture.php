<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    protected $table='picture';
    protected $primaryKey = 'ID';
    protected $fillable = ['link', 'status'];
    public $timestamps=false;
}
