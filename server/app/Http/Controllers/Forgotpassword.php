<?php

namespace App\Http\Controllers;

use App\Mail\reset;
use App\Mail\ResetPassword;
use App\Models\Account;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class Forgotpassword extends Controller
{
    public static $resetEmail='';
   
    public function CheckEmail(Request $request)
    {
        try {
            $otp = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
            $token = '';
            
            $email=$request->input("Email");
    
            $updatedRows = Account::where('Email',$email)->update(['otp' => $otp]);
    
            if ($updatedRows > 0) {
             
                Mail::to($request->input("Email"))
                    ->send(new reset($request->input("Email"), $token, $otp));
                return response()->json(['message' => 'Password reset email sent successfully', 'otp' => $otp]);
            } else {
                return response()->json(['error' => 'Email not found or OTP not updated'], 404);
            }
        } catch (\Exception $e) {
            // Handle exceptions, log errors, etc.
            return response()->json(['message' => 'Error sending password reset email', 'error' => $e->getMessage()], 500);
        }
    }
     public function otp(Request $request)
    {
        try{
           
         
            $user = Account::where( 'otp', $request->input('otp'))->first();
              

                if($user){
                 
                        Account::where('otp',$request->input('otp'))->update(['otp'=>null]);
                        return response()->json(['message' => 'Password reset email sent successfully', 'user' => $user]);
                   
                }else{
                    return response()->json(['error' => 'Email not found or OTP not updated'], 404);
                }
        }catch(\Exception $e){
            return response()->json(['message' => 'Error sending password reset email', 'error' => $e->getMessage()], 500);
        }
       
    }
}
