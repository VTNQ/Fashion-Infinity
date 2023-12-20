<?php

namespace App\Http\Controllers;

use App\Models\Origin;
use Illuminate\Http\Request;

class OriginController extends Controller
{
    public function AddOrigin(Request $request){
        $isorigin=Origin::where("Name",$request->input('NameOrigin'))->first();
        
        try{
            if($isorigin){
                return response()->json(['errorcategory' => 'Origin is Exists'], 422);
            }
            $Origin=Origin::create(['Name'=>$request->input('NameOrigin'),'Address'=>$request->input('Address')]);
            return response()->json(['message' => 'Add Successfully', 'Origin'=>$Origin]);
           
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
