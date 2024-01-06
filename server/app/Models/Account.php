<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
   protected $table='Account';
   protected $fillable=['ID','Username',"Email",'Password','Accounttype','Hashcode','is_online'];
   public $timestamps=false;
}
