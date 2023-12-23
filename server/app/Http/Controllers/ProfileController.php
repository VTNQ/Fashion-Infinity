<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

use function Ramsey\Uuid\v1;

class ProfileController extends Controller
{
    //
   public function ProfileInformation($ID){
    $user=Account::where("ID",$ID)->where("Accounttype",0)->first();
    if($user){
        return response()->json(['user'=>$user],200);
    }else{
        return response()->json(['message'=>'User not found'],404);
    }
   }
   public function Updateprofile(Request $request, $ID)
{
    try {
        $Exits=Account::where('Username', $request->input('Username'))->first();
        if($Exits){
            return response()->json(['error' => 'UserName is exists'], 500);
        }else{
            if ($request->hasFile('Avatar')) {
                $imageName = time() . '_' . $request->file('Avatar')->getClientOriginalName();
                $localPath = 'images/' . $imageName;
                $request->file('Avatar')->move(public_path('images'), $imageName);
               
                
                    $updaterows = Account::where("ID", $ID)->update([
                        'Username' => $request->input('Username'),
                        'Email' => $request->input('Email'),
                        'Avatar' => $localPath,
                    ]);
                    if ($updaterows > 0) {
                        return response()->json(['message' => 'Update Profile Success']);
                    }
                
            } else {
                return response()->json(['error' => 'Avatar file not provided'], 400);
            }
        }
     
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to update profile', 'message' => $e->getMessage()], 500);
    }
}


}
