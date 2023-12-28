<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    
    public function LoginGoogle(Request $request){
        try {
            $existingAccount = Account::where('Email', $request->input('Email'))->first();
        
           if($existingAccount){
            return response()->json(['message' => 'Login successful', 'Account' => $existingAccount]);
           }else{
            return response()->json(['errorMessage' => 'Account is not Exists'], 401);
           }
          
        }catch(\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    public function Login(Request $request) {
        try {
            $existingAccount = Account::where('Email', $request->input('Email'))
                                      ->where('Password', md5($request->input('Password')))
                                      ->first();
    
            if ($existingAccount) {
                
                $isSuperAdmin = $existingAccount->Accounttype == 2;
                $isAdmin = $existingAccount->Accounttype == 0;
                $user=$existingAccount->Accounttype==1;
                $response = [
                    'message' => 'Login successful',
                    'Username' => $existingAccount->Username,
                    'Account' => $existingAccount,
                    'isSuperAdmin' => $isSuperAdmin,
                    'isAdmin' => $isAdmin,
                    'user'=>$user
                ];
    
                return response()->json($response);
            } else {
                return response()->json(['errorMessage' => 'Invalid email or password'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    
   
}
