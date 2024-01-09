<?php

namespace App\Http\Controllers;

use App\Mail\ResetAccount;
use Illuminate\Http\Request;
use App\Models\Account as ModelsAccount;
use Illuminate\Support\Facades\Mail;

class Account extends Controller {
    public function countuser(){
        $user=ModelsAccount::where("Accounttype",1)->count();
        return response()->json(['totaluser' => $user], 200);
    }
    public function getCustomer(){
        try {
            $customers = ModelsAccount::where('Accounttype',1)->get();
            return response()->json($customers,200);
        } catch (\Exception $e) {
            return response()->json(['error'=>'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
    public function getAdmin(){
        try {
            $admins = ModelsAccount::where('Accounttype',0)->get();
            return response()->json($admins,200);
        } catch (\Exception $e) {
            return response()->json(['error'=>'Internal Server Error','message' => $e->getMessage()]);
        }
    }
    
    public function UpdateUsernameAdmin(Request $request, $ID) {
        try {
            // Cập nhật chỉ mật khẩu cho admin dựa trên ID
            $updatedRows = ModelsAccount::where('ID', $ID)
                ->update(['Password' => md5($request->input('UpdateAdminPassword'))]);
                $admins = ModelsAccount::findOrFail($ID);

                if ($updatedRows > 0) {
                    // Gửi email thông báo việc đặt lại mật khẩu
                    // Mail::to($request->input("Email"))->send(new ResetAccount($admins->, $request->input("UpdateAdminPassword")));
        
                    return response()->json(['message' => 'Admin password updated successfully']);
                } else {
                    return response()->json(['message' => 'No admin found with provided ID'], 404);
                }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update admin', 'message' => $e->getMessage()], 500);
        }
    }
}



?>