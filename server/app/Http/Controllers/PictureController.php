<?php

namespace App\Http\Controllers;

use App\Http\Requests\PictureRequest;
use App\Models\Picture;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;


class PictureController extends Controller
{
   
    public function deletePicture(Request $request, $ID)
    {
        try {
            // Find the picture by ID
            $picture = Picture::find($ID);
    
            // Check if the picture exists
            if (!$picture) {
                return response()->json(['error' => 'Picture not found'], 404);
            }
    
            // Get the image link
            $oldImagePath = $picture->link;
    
            // Delete the picture from the database
            $deletedRows = $picture->delete();
            Picture::where("ID",$ID)->delete();
         
            if ($deletedRows > 0) {
                // Check if the file exists before attempting to delete it
                $fullImagePath = public_path($oldImagePath);
                if (file_exists($fullImagePath)) {
                    unlink($fullImagePath);
                }
    
                return response()->json(['message' => 'Delete successful']);
            } else {
                return response()->json(['error' => 'Failed to delete picture'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete picture', 'message' => $e->getMessage()], 500);
        }
    }
    
    public function Updatestatus(Request $request,$ID){
        try{
            $picture=Picture::where("ID",$ID)->where("status",2)->first();
            if($picture && $picture->status == 2){
                $deleterows=Picture::where('ID',$ID)->update(['status' => 1]);
                if($deleterows>0){
                    return response()->json(['message' => 'Change successful']);
                }
            }else {
                return response()->json(['error' => 'Invalid status or picture not found'], 400);
            }
           
         
        }catch(\Exception $e){
            return response()->json(['error' => 'Failed to update picture'], 500);
        }
    }
    public function getPicture(){
        try{
            $picture=Picture::all();
            return response()->json($picture,200);
        }catch(\Exception $e){
            return response()->json(['error'=>'Internal Server Error', 'message' => $e->getMessage()]);
        }
       
    }
    public function uploadImage(Request $request)
    {
        try {
            $uploadedImages = [];
    
            foreach ($request->file('Image') as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $localPath = 'images/' . $imageName;
    
                // Move the uploaded image to the local path on the server
                $image->move(public_path('images'), $imageName);
    
                // Save the local path in the database
                $picture = new Picture();
                $picture->link = $localPath;
                $picture->status = $request->input('status');
                $picture->save();
    
                $uploadedImages[] = $localPath;
            }
    
            return response()->json(['message' => 'Images uploaded and URLs saved successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to upload images'], 500);
        }
    }
    


    
}