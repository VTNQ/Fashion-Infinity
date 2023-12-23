<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class providermodel extends Model
{
    protected $table='provider';
    protected $fillable=['ID','Name','Address'];
    public $timestamps=false;
}
