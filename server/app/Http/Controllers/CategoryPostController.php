<?php

namespace App\Http\Controllers;

use App\Models\category_post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryPostController extends Controller
{
    public function AddCategoryPost(Request $request){
        try{
            $CategoryPost=category_post::create(['Name'=>$request->input('NamePageCategory'),'status'=>$request->input('status'),'Content'=>$request->input('Content')]);
            return response()->json(['message' => 'Register successful', 'Cate'=>$CategoryPost]);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
     
    }
    public function UpdateCategoryUpdate($ID,Request $request){
        try{
            $CategoryPost=category_post::where("id",$ID)->first();
            if( $CategoryPost->status==1){
                $deleterows=category_post::where('id',$ID)->update(['status' => 0]);
                if($deleterows>0){
                    return response()->json(['message' => 'Change successful']);
                }
            }else{
                $deleterows=category_post::where('id',$ID)->update(['status' => 1]);
                if($deleterows>0){
                    return response()->json(['message' => 'Change successful']);
                }
            }
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
    public function ListCategory(){
        try{
            $category=category_post::all();
            return response()->json($category,200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
}
