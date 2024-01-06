<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category_post extends Model
{
    protected $table='category_post';
    protected $fillable=['Name','status','Content'];
    public $timestamps=false;
}
