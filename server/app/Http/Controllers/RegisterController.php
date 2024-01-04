<?php

namespace App\Http\Controllers;

use App\Mail\AccountInfo;
use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Psy\Util\Str;

class RegisterController extends Controller
{
    public function registerGoogle(Request $request)
    {
    $min = 1;
    $max = 100;

    // Generate a random integer
    $randomNumber = random_int($min, $max);

    try {
        $existingAccount = Account::where('Email', $request->input('Email'))->first();

        if ($existingAccount) {
            return response()->json(['error' => 'Google account already exists'], 422);
        }

        $user = Account::create([
            'Username' => $request->input("Username"),
            'Email' => $request->input("Email"),
            'Password' => md5($request->input("Password")), // You may want to generate a unique password for Google users
            'Accounttype' => 1,
           
        ]);
        $token='';
        Mail::to($request->input("Email"))->send(new AccountInfo($request->input("Username"), $token,$request->input("Password")));
        return response()->json(['message' => 'Register successful', 'Account' => $user]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
    }
}


    public function register(Request $request)
    {

        $min = 1;
        $max = 100;

        // Generate a random integer
        $randomNumber = random_int($min, $max);

        try {
            $existingAccount = Account::where('Username', $request->input('Username'))->orWhere('Email', $request->input('Email'))->first();

            if ($existingAccount) {
                return response()->json(['errorAll' => 'Username or Password or Email already exists'], 422);
            }

            $user = Account::create([
                'Username' => $request->input("Username"),
                'Email' => $request->input("Email"),
                'Password' => md5($request->input("Password")),
                'Accounttype' => 1,
        

            ]);
            $token='';
            Mail::to($request->input("Email"))->send(new AccountInfo($request->input("Username"), $token,$request->input("Password")));
            return response()->json(['message' => 'Register successful', 'Account' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }


    }
    public function registerAdmin(Request $request)
    {

        $min = 1;
        $max = 100;

        
        $randomNumber = random_int($min, $max);

        try {
            $existingAccount = Account::where('Username', $request->input('Username'))->orWhere('Email', $request->input('Email'))->first();

            if ($existingAccount) {
                return response()->json(['errorAll' => 'Username or Email already exists'], 422);
            }

            $user = Account::create([
                'Username' => $request->input("Username"),
                'Email' => $request->input("Email"),
                // 'Password' => md5($request->input("Password")),
                'Password' => $request->input("Password"),
                'Accounttype' => 0,
        

            ]);
            $token='';
            Mail::to($request->input("Email"))->send(new AccountInfo($request->input("Username"), $token,$request->input("Password")));
            return response()->json(['message' => 'Register successful', 'Account' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }

        
    }
}

