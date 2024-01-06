<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table='blog';
    protected $fillable=['Blog_tittle','Blog_desc','Blog_content','Blog_meta_desc','Blog_meta_keyword','Blog_category','Blog_status','Blog_image'];
    public $timestamps=false;
}
