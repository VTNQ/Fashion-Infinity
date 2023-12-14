<?php

namespace App\Http\Controllers;
use App\Mail\ResetPassword;
use App\Models\Account;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class Forgotpassword extends Controller
{
    public function CheckEmail(Request $request){
      

        // Assuming you have the user's name and token from your logic
        

        // Send the email
        try {
            $userName = Account::where('Email',$request->input('Email'))->first(); // Replace with your logic
            if($userName){
                $otp = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
                Account::where('Email',$request->input('Email'))->update(['otp' => $otp]);
                return response()->json(['message' => 'Send Successfully', 'Account' => $userName]);
            }else{
                return response()->json(['error'=>'Email not found',404]);
            }
          
        } catch (\Exception $e) {
            // Handle exceptions, log errors, etc.
            return response()->json(['message' => 'Error sending password reset email'], 500);
        }
    }
}
