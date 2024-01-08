<?php

namespace App\Http\Controllers;

use App\Models\voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    
        
            return response()->json(['success' => true,'message' => 'Voucher created successfully', 'voucher' => $voucher]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['success' => false,'message' => 'Failed to create voucher', 'error' => $e->getMessage()], 500);
        }
    }
    public function createVoucherFreeship(Request $request) {
        
        $existingVoucher = Voucher::where('voucherCode', $request->input('voucherCode'))->first();
    
        if ($existingVoucher) {
            
            return response()->json(['message' => 'Voucher code already exists'], 409); // Mã lỗi 409 Conflict
        }
    
        try {
            
            $voucher = Voucher::create([
                
                'voucherCode' => $request->input('voucherCode'),
                
                'startDate' => $request->input('startDate'),
                'endDate' => $request->input('endDate'),
                'quantity' => $request->input('quantity'),
                'minPrice' => $request->input('minPrice')
                
            ]);
    
        
            return response()->json(['success' => true,'message' => 'Voucher created successfully', 'voucher' => $voucher]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['success' => false,'message' => 'Failed to create voucher', 'error' => $e->getMessage()], 500);
        }
    }
    public function VoucherFreeship() {
        try {
            $voucher = Voucher::where('quantity', '>', 0)
                ->whereDate("startDate", "<=", now())
                ->whereDate("endDate", ">=", now())
                ->where('voucherCode', 'LIKE', 'FSH%') // Add this line for voucher codes starting with "FSH"
                ->get();
    
            return response()->json($voucher, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update category'], 500);
        }
    }
    public function VoucherCheck(){
        try{
            $voucher = voucher::where('quantity',">",0)->whereDate("startDate","<=",Carbon::now())->whereDate("endDate",">=",Carbon::now())->get();
           
              
                return response()->json($voucher,200);
            
        }catch(\Exception $e){
            return response()->json(['error' => 'Failed to update category'], 500);
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
    public function getVoucher() {
        try {
            $vouchers = DB::table('voucher')->get(); // Sử dụng get() thay vì all()
    
            if($vouchers->isEmpty()) { // Kiểm tra xem collection có rỗng không
                return response()->json(['success' => false, 'message' => 'Không có voucher nào.'], 404); // Nên trả về mã trạng thái HTTP thích hợp
            }
    
            return response()->json(['success' => true, 'data' => $vouchers]); // Trả về dữ liệu thành công
    
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra khi lấy dữ liệu.'], 500); // Trả về lỗi server
        }
    }
    public function deleteVoucher(Request $request, $voucherCode){
        try {
            $vouchers = Voucher::where('voucherCode', $voucherCode)->delete();
    
            if ($vouchers) {
                
                return response()->json(['success' => true,'message' => 'Voucher deleted succesfull'], 200); 
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['success'=>false,'message'=>'co loi khi xoa du lieu'],500);
        }
    }
    

    
}
?>