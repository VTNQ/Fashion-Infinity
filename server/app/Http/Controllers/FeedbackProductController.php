<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\FeedbackProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class FeedbackProductController extends Controller
{
    public function ListFeedback(){
        $ListFeedback=DB::table('feedback_product')->join('account',"feedback_product.id_Account","=",'account.ID')->get();
        return response()->json($ListFeedback,200);
    }
    public function showfeedback(){
        $feedback = DB::table('feedback_product')->join("product","product.ID","=","feedback_product.id_Product")->join('account',"account.ID","=","feedback_product.id_Account")->take(3)->orderBy("feedback_product.ID","Desc")->select(['account.Username','product.Name','feedback_product.Content','feedback_product.Create_time'])->get();
        return response()->json(['feedback' => $feedback]);
    }
    public function Email($ID){
        $Email = Account::where("ID", $ID)->select('Email')->first();
        return response()->json(['Email' => $Email], 200);
    }
 
    public function AddFeedback(Request $request,$ID,$IDproduct){
        try{
            $Feedback=FeedbackProduct::create(['id_Account'=>$ID,'id_Product'=>$IDproduct,'Content'=>$request->input('content'),'Create_time'=>now()->timezone('Asia/Ho_Chi_Minh'),'start'=>$request->input('start')]);
            return response()->json(['message' => 'Comment successful', 'Feedback'=>$Feedback]);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
