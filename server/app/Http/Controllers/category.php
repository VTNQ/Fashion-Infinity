<?php

namespace App\Http\Controllers;

use App\Models\category as ModelsCategory;
use Illuminate\Http\Request;


class category extends Controller
{
    public function deleteCategory(Request $request,$ID){
        
        try{
            $deleterows=ModelsCategory::where('ID',$ID)->delete();
            if($deleterows>0){
                return response()->json(['message' => 'Deletion successful']);
            }
        }catch(\Exception $e){
            return response()->json(['error' => 'Failed to update category'], 500);
        }
    }
    public function updateCategory(Request $request,$ID){
       
        try{
            $exists = ModelsCategory::where("Name", $request->input('UpdateNameCategory'))->first();
            if ($exists) {
                return response()->json(['exists' => true, 'message' => 'Category already exists']);
            }else{
                $updatedRows = ModelsCategory::where('ID', $ID)->update(['Name' => $request->input('UpdateNameCategory')]);
                
            if ($updatedRows > 0) {
                return response()->json(['message' => 'Category updated successfully']);
            }
            }
        }catch(\Exception $e){
            return response()->json(['error' => 'Failed to update category'], 500);
        }
    }
    public function AddCategory(Request $request){
        try{
            $existCategory=ModelsCategory::where('Name',$request->input('NameCategory'))->first();
            if($existCategory){
                return response()->json(['errorcategory' => 'Category is Exists'], 422);
            }
            $category=ModelsCategory::create(['Name'=>$request->input('NameCategory')]);
            return response()->json(['message' => 'Register successful', 'Cate'=>$category]);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    public function totalCategory(){
        $category=ModelsCategory::count();
        return response()->json(['totalCategory' => $category], 200);
    }
    public function getcategories(){
        try{
            $categories=ModelsCategory::all();
            return response()->json($categories,200);
        }catch(\Exception $e){
            return response()->json(['error'=>'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }

    public function getCategoriesToHomePage(){
        try {
            $categories=ModelsCategory::take(4)->get();
            return response()->json($categories,200);

        } catch (\Exception $e) {
            return response()->json(['error'=>'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
    public function getCategoriesToHomePage1(){
        try {
            $categories = ModelsCategory::skip(4)->take(4)->get();
            return response()->json($categories,200);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
   
}
