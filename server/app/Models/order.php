<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    protected $table='order';
    protected $fillable=['Start_Order','status','FullName','Postcode','id_Account','TotalPrice','id_city','id_ward','id_district','Phone','payments','order_code','Address'];
    public $timestamps=false;
}
