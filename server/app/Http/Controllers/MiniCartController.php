<?php

namespace App\Http\Controllers;

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
        "product.ID",
        "picture.link",
        "product.Name",
        "product.Price",
        DB::raw("SUM(detailcard.Quality) as TotalQuantity"),

        ])->groupBy("product.ID", "picture.link",
        "product.Name",
        "product.Price")->where("card.id_Account",$ID)->where("picture.status",1)->get();
        return response()->json($Mini, 200);
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
