<?php

namespace App\Http\Controllers;

use App\Models\events;
use Illuminate\Http\Request;

class EventController extends Controller
{
  public function DeleteEvent(Request $request,$ID){
    try{
     $Event=events::find($ID);
     if (!$Event) {
      return response()->json(['error' => 'Evemt not found'], 404);
  }
  $oldImagePath=$Event->BannerUrl;
  $deletedRows = $Event->delete();
  events::where("ID",$ID)->delete();
  if($deletedRows>0){
    $fullImagePath = public_path($oldImagePath);
    if (file_exists($fullImagePath)) {
        unlink($fullImagePath);
    }

    return response()->json(['message' => 'Delete successful']);
  }else {
    return response()->json(['error' => 'Failed to delete Event'], 500);
}
    }catch(\Exception $e){
      return response()->json(['error' => 'Failed to update category'], 500);
    }
  }
  public function coutEvent(){
    $event=events::count();
    return response()->json(['eventCount' => $event], 200);
  }
  public function UpdateEvent(Request $request,$ID){
    try{
      $existEvent=events::where("Title",$request->input('UpdateName'))->first();
      if($existEvent){
        return response()->json(['errorEvent' => 'Event is Exists'], 422);
      }else{
        $updateRows=events::where("ID",$ID)->update(["Title"=>$request->input('UpdateName'),'Description'=>$request->input('updateDescription')]);
        if($updateRows>0){
          return response()->json(['message' => 'Event updated successfully']);
        }
      }
    }catch(\Exception $e){
      return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
    }
  }
  public function AddEvent(Request $request)
  {
      try {
          // Kiểm tra sự tồn tại của sự kiện
          $existEvent = events::where("Title", $request->input('Name'))->first();
          if ($existEvent) {
              return response()->json(['errorEvent' => 'Event already exists'], 422);
          }
  
          // Xử lý upload ảnh
          if ($request->hasFile('image')) {
              $image = $request->file('image');
              $imageName = time() . '_' . $image->getClientOriginalName();
              $localPath = 'images/' . $imageName;
  
              // Lưu ảnh vào thư mục public/images
              $image->move(public_path('images'), $imageName);
  
              // Tạo mới sự kiện trong CSDL
              $Event = events::create([
                  "Title" => $request->input('Name'),
                  "Description" => $request->input('Description'),
                  "StartDate" => $request->input('StartDate'),
                  "EndDate" => $request->input('EndDate'),
                  'BannerUrl' => $localPath
              ]);
  
              return response()->json(['message' => 'Add Event Successfully', 'Event' => $Event]);
          }
  
          return response()->json(['error' => 'No image uploaded'], 422);
      } catch (\Exception $e) {
          return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
      }
  }
  
  public function getEvent(){
    try{
        $Event=events::all();
        return response()->json($Event,200);
    }catch(\Exception $e){
        return response()->json(['error'=>'Internal Server Error', 'message' => $e->getMessage()]);
    }
  }
}
