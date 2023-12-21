<?php

namespace App\Http\Controllers;


use App\Models\providermodel as ModelsProvider;
use Illuminate\Http\Request;


class ProviderController extends Controller
{
    public function getprovider(){
        try{
            $Origin=ModelsProvider::all();
            return response()->json($Origin,200);
        }catch(\Exception $error){
            return response()->json(['error'=>'Internal Server Error', 'message' => $error->getMessage()]);
        }
    
    }
    public function deleteProvider(Request $request,$ID){
        try{
            $deleteRows=ModelsProvider::where("ID",$ID)->delete();
            if($deleteRows>0){
                return response()->json(['message' => 'Delete successful']);
            }
        }catch(\Exception $error){
            return response()->json(['error' => 'Failed to delete Provider'], 500);
        }
    }
    public function UpdateProvider(Request $request,$ID){
        try{
            $exists=ModelsProvider::where("Name",$request->input("UpdateNameOrigin"))->where('Address',$request->input('UpdateNameAddress'))->first();
            if($exists){
                return response()->json(['exists' => true, 'message' => 'Provider already exists']);
            }else{
                $updateRows=ModelsProvider::where("ID",$ID)->update(['Name'=>$request->input('UpdateNameOrigin'),'Address'=>$request->input('UpdateNameAddress')]);
                if($updateRows>0){
                    return response()->json(['message' => 'Provider updated successfully']);
                }
            }
        }catch(\Exception $error){
            return response()->json(['error' => 'Failed to update Provider'], 500);
        }
    }
    public function AddProvider(Request $request){
        $isorigin=ModelsProvider::where("Name",$request->input('NameOrigin'))->first();
        
        try{
            if($isorigin){
                return response()->json(['errorcategory' => 'Origin is Exists'], 422);
            }
            $Origin=ModelsProvider::create(['Name'=>$request->input('NameOrigin'),'Address'=>$request->input('Address')]);
            return response()->json(['message' => 'Add Successfully', 'Origin'=>$Origin]);
           
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
