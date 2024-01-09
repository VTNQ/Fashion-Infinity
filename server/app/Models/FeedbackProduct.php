<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackProduct extends Model
{
    protected $table='feedback_product';
    protected $fillable=['id_Account','id_Product','Content','Create_time','start'];
    public $timestamps=false;
}
