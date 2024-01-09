<?php

namespace App\Http\Controllers;

use App\Models\detailcard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\error;

class MiniCartController extends Controller
{
    public function ShowMiniCart($ID){
       $Mini=DB::table("card")->join("detailcard","card.ID","=","detailcard.id_card")
       ->join("product","detailcard.id_product","=","product.ID")->
       join("category_product","category_product.id_product","=","product.ID")->
       join("picture","picture.ID","=","category_product.id_Picture")->
       select([
        "card.ID as IDcard",
        "product.ID",
        "picture.link",
        "product.Name",
        "product.Price",
        "detailcard.status",
        DB::raw("SUM(detailcard.Quality) as TotalQuantity"),

        ])->groupBy("product.ID", "picture.link",
        "product.Name",
        "product.Price","detailcard.status","card.ID")->where("card.id_Account",$ID)->where("picture.status",1)->get();
        return response()->json($Mini, 200);
    }
    public function updateCard(Request $request, $ID, $IDproduct) {
        try {
            $card = detailcard::where("id_card", $ID)->where("id_product", $IDproduct)->first();
        
            if ($card) {
                $newStatus = ($card->status == 1) ? 0 : 1;
        
                $update = detailcard::where("id_card", $ID)->where("id_product", $IDproduct)->update(["status" => $newStatus]);
        
                if ($update > 0) {
                    return response()->json(['message' => 'successful', 'newStatus' => $newStatus]);
                }
            }
        
            return response()->json(['error' => 'Card not found']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
        
    }
    public function DeleteCard(Request $request,$ID){
        try{
            $Card=DB::table("card")->where("id_Account",$request->input("id_Account"))->first();
            if($Card){
                $deleterows=DB::table("detailcard")->where("id_card",$Card->ID)->where("id_product",$ID)->delete();
                if($deleterows>0){
                    return response()->json(['message' => 'Deletion successful']);
                }
            }
        }catch(\Exception $e){
            
        }
    }
}
