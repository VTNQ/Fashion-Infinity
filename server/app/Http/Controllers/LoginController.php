<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{

    public function LoginGoogle(Request $request)
    {
        try {
            $existingAccount = Account::where('Email', $request->input('Email'))->first();

            if ($existingAccount) {
                return response()->json(['message' => 'Login successful', 'Account' => $existingAccount]);
            } else {
                return response()->json(['errorMessage' => 'Account is not Exists'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function updateStatus(Request $request)
    {
        try {
            $userId = $request->input('ID');

            // Update the user status based on user ID
            DB::table('account')
                ->where('ID', $userId)
                ->update(['is_online' => false]);

            return response()->json(['message' => 'User status updated']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    public function showEdit($ID)
    {
        $User = Account::where("ID", $ID)->get();
        return response()->json($User, 200);
    }
    public function EditProfile(Request $request, $ID)
    {
        try {
            $Edit = Account::where("ID", $ID)->update(["Username" => $request->input('Username'), "Email" => $request->input('Email'), 'FullName' => $request->input('FullName'), 'Phone' => $request->input('Phone'), 'Address' => $request->input("Address")]);
            if ($Edit > 0) {
                return response()->json(['message' => 'Category updated successfully']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update category'], 500);
        }
    }
    public function Login(Request $request)
    {
        try {
            $existingAccount = Account::where('Email', $request->input('Email'))
                ->where('Password', md5($request->input('Password')))
                ->first();

            if ($existingAccount) {
                $existingAccount->where("ID", $existingAccount->ID)->update(['is_online' => True]);
                $isSuperAdmin = $existingAccount->Accounttype == 2;
                $isAdmin = $existingAccount->Accounttype == 0;
                $user = $existingAccount->Accounttype == 1;
                $response = [
                    'message' => 'Login successful',
                    'Username' => $existingAccount->Username,
                    'ID' => $existingAccount->ID,
                    'Account' => $existingAccount,
                    'isSuperAdmin' => $isSuperAdmin,
                    'isAdmin' => $isAdmin,
                    'user' => $user
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
