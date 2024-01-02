<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    protected $table='order';
    protected $fillable=['Start_Order','status','FullName','Address','city','Postcode','id_Account','TotalPrice','Country','Phone'];
    public $timestamps=false;
}
