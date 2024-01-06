<?php

namespace App\Http\Controllers;

use App\Models\voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VoucherController extends Controller{


    public function createVoucher(Request $request) {
        
        $existingVoucher = Voucher::where('voucherCode', $request->input('voucherCode'))->first();
    
        if ($existingVoucher) {
            
            return response()->json(['message' => 'Voucher code already exists'], 409); // Mã lỗi 409 Conflict
        }
    
        try {
            
            $voucher = Voucher::create([
                'nameVoucher' => $request->input('nameVoucher'),
                'voucherCode' => $request->input('voucherCode'),
                'value' => $request->input('valuePercentage'),
                'startDate' => $request->input('startDate'),
                'endDate' => $request->input('endDate'),
                'quantity' => $request->input('quantity'),
                
            ]);
    
        
            return response()->json(['message' => 'Voucher created successfully', 'voucher' => $voucher]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to create voucher', 'error' => $e->getMessage()], 500);
        }
    }

    public function checkVoucher(Request $request) {
        try {
            $code = $request->input('voucherCode');
            $voucher = voucher::where('voucherCode', $code)->first();

            if (!$voucher) {
                return response()->json(['isValid' => false, 'message' => 'Mã voucher không tồn tại.']);
            }


            $today = now();

           
            if ($voucher->startDate <= $today && $voucher->endDate >= $today && $voucher->quantity > 0) {
                
                return response()->json(['isValid' => true, 'discountValue' => $voucher->value, 'message' => 'Mã voucher hợp lệ.']);
            } else {
                
                return response()->json(['isValid' => false, 'message' => 'Mã voucher không hợp lệ hoặc đã hết hạn.']);
            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['isValid' => false, 'message' => 'Có lỗi xảy ra khi kiểm tra mã voucher.'], 500);
        }
    }

    
}
?>