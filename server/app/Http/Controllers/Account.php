<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Account as ModelsAccount;

class Account extends Controller {
    public function getCustomer(){
        try {
            $customers = ModelsAccount::where('Accounttype',1)->get();
            return response()->json($customers,200);
        } catch (\Exeption $e) {
            return response()->json(['error'=>'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
    public function getAdmin(){
        try {
            $admins = ModelsAccount::where('Accounttype',0)->get();
            return response()->json($admins,200);
        } catch (\Exeption $e) {
            return response()->json(['error'=>'Internal Server Error','message' => $e->getMessage()]);
        }
    }
    // public function UpdateUsernameAdmin(Request $request,$ID){
    //     try{
    //         $exists = ModelsAccount::where("ID", $request->input('UpdateNameAdmin'))->first();
    //         if ($exists) {
    //             return response()->json(['exists' => true, 'message' => 'Admin already exists']);
    //         }else{
    //             $updatedRows = ModelsAccount::where('ID', $ID)->update(['Username' => $request->input('UpdateNameAdmin'),'Password'=>md5($request->input("UpdateAdminPassword"))]);
                
    //         if ($updatedRows > 0) {
    //             return response()->json(['message' => 'Admin updated successfully']);
    //         }
    //         }
            
          
            
        
            
    //     }catch(\Exception $e){
    //         return response()->json(['error' => 'Failed to update category'], 500);
    //     }
    // }
    public function UpdateUsernameAdmin(Request $request, $ID) {
        try {
            // Cập nhật chỉ mật khẩu cho admin dựa trên ID
            $updatedRows = ModelsAccount::where('ID', $ID)
                ->update(['Password' => md5($request->input('UpdateAdminPassword'))]);
                $admins = ModelsAccount::where('ID', $ID)->get();

            if ($updatedRows > 0) {
                return response()->json(['message' => 'Admin password updated successfully']);
            } else {
                return response()->json(['message' => 'No admin found with provided ID'], 404);
            }
            Mail::to($request->input("Email"))->send(new ResetAccount($request->input("Username"),$request->input("UpdateAdminPassword")));
            return response()->json(['message' => 'Register successful', 'Account' => $updatedRows]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update admin', 'message' => $e->getMessage()], 500);
        }
    }
}



?>