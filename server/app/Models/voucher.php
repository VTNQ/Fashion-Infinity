<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class voucher extends Model
{
    protected $table='voucher';
    protected $primaryKey = 'ID';
    protected $fillable = ['voucherCode','value','startDate','endDate','quantity','status','nameVoucher','minPrice'];
    public $timestamps=false;

    public function getStatusAttribute()
    {
        $today = Carbon::now();

        if ($today->lt(Carbon::parse($this->startDate))) {
            return 'waiting';
        } elseif ($today->gt(Carbon::parse($this->endDate))) {
            return 'expired';
        } else {
            return 'active';
        }
    }
}
