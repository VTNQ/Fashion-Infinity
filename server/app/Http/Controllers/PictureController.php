<?php

namespace App\Http\Controllers;

use App\Http\Requests\PictureRequest;
use App\Models\Picture;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;


class PictureController extends Controller
{
    public function updateImage(Request $request, $id)
{
    try {
        // Update existing image
        $picture = Picture::find($id);

        if (!$picture) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        // Delete existing image from ImgBB
        Http::delete("https://api.imgbb.com/1/image/{$picture->imgbb_id}?key=038e074d800e0c50669473b3ab9f8849");

        // Move and upload new image
        $imageName = time() . '.' . $request->file('Image')->extension();
        $request->file('Image')->move(public_path('images'), $imageName);

        $response = Http::asForm()->post('https://api.imgbb.com/1/upload', [
            'key' => '038e074d800e0c50669473b3ab9f8849',
            'image' => base64_encode(file_get_contents(public_path('images/' . $imageName))),
        ]);

        $data = $response->json();

        if (!$response->successful() || !isset($data['data']['url'])) {
            return response()->json(['error' => 'Failed to upload image to ImgBB'], 500);
        }

        // Update Picture model
        $picture->link = $data['data']['url'];
        $picture->status = $request->input('status');
        $picture->save();

        return response()->json(['message' => 'Image updated and URL saved successfully']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to update image'], 500);
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
     
    public function uploadImage(PictureRequest $request)
    {
        try {
            $imageName = time() . '.' . $request->file('Image')->extension();
            $localPath = 'images/' . $imageName;
    
            // Move the uploaded image to the local path on the server
            $request->file('Image')->move(public_path('images'), $imageName);
    
            // Save the local path in the database
            $picture = new Picture();
         
            $picture->link = $localPath;
            $picture->status = $request->input('status');
            $picture->save();
    
            return response()->json(['message' => 'Image uploaded and URL saved successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to upload image'], 500);
        }
    }
    
}