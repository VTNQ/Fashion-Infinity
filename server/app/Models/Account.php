<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
   protected $table='Account';
   protected $fillable=['ID','Username',"Email",'Password','Accounttype','Hashcode','is_online','FullName','PostCode','id_city','Address','id_district','id_ward','Phone'];
   public $timestamps=false;
}
