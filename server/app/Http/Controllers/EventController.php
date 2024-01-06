<?php

namespace App\Http\Controllers;

use App\Models\events;
use Illuminate\Http\Request;

class EventController extends Controller
{
  public function AddEvent(Request $request){
    try{
        $existEvent=events::where("Title",$request->input('Name'))->first();
        if($existEvent){
            return response()->json(['errorEvent' => 'Event is Exists'], 422);
        }
        $Event=events::create(["Title"=>$request->input('Name'),"Description"=>$request->input('Description'),"StartDate"=>$request->input('StartDate'),"EndDate"=>$request->input('EndDate')]);
        return response()->json(['message' => 'Add Event Successfully', 'Cate'=>$Event]);
    }catch(\Exception $e){
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
