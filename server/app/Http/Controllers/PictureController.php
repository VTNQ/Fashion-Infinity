<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class PictureController extends Controller
{
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
     public function updateImage(Request $request, $id)
    {
        try {
            $picture = Picture::findOrFail($id);

            // Check if a new image is uploaded
            if ($request->hasFile('UpdateImage')) {
                $imageName = time().'.'.$request->file('UpdateImage')->extension();
                $request->file('UpdateImage')->move(public_path('images'), $imageName);

                $response = Http::asForm()->post('https://api.imgbb.com/1/upload', [
                    'key' => '038e074d800e0c50669473b3ab9f8849',
                    'image' => base64_encode(file_get_contents(public_path('images/'.$imageName))),
                ]);

                $data = $response->json();

                if (!$response->successful() || !isset($data['data']['url'])) {
                    return response()->json(['error' => 'Failed to upload image to ImgBB'], 500);
                }

                // Update the picture information
                $picture->link = $data['data']['url'];
            }

            // Update other fields if needed
            $picture->status = $request->input('status');
            $picture->save();

            return response()->json(['message' => 'Image updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update image'], 500);
        }
    }
    public function uploadImage(Request $request){
        try{
            $imageName=time().'.'.$request->file('Image')->extension();
            $request->file('Image')->move(public_path('images'),$imageName);
            $response = Http::asForm()->post('https://api.imgbb.com/1/upload', [
                'key' => '038e074d800e0c50669473b3ab9f8849',
                'image' => base64_encode(file_get_contents(public_path('images/'.$imageName))),
            ]);
            $data=$response->json();
            if(!$response->successful()|| !isset($data['data']['url'])){
                return response()->json(['error'=> 'Failed to upload image to ImgBB'],500);
            }
            $picture=new Picture();
            $picture->link=$data['data']['url'];
            $picture->status= $request->input('status');;
            $picture->save();
            return response()->json(['message' => 'Image uploaded and URL saved successfully']);
        }catch(\Exception $e){
            return response()->json(['error' => 'Failed to upload image'], 500);
        }
    }
}
