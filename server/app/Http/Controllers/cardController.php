<?php

namespace App\Http\Controllers;

use App\Models\card;
use App\Models\detailcard;
use App\Models\DetailWareHouse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class cardController extends Controller
{
    public function getcart($ID){
        $card=DB::table('card')->
        join('detailcard','card.ID','=','detailcard.id_card')->
        join('product','product.ID','=','detailcard.id_product')->
        join('category_product','product.ID','=','category_product.id_Product')->
        join('picture','picture.ID','=','category_product.id_Picture')->
        where('card.id_Account',$ID)->
        where("picture.status",1)->
        select(["picture.link","product.Name","detailcard.Quality","product.Price",'product.ID'])->get();
        return response()->json($card, 200);
    }
    public function AddCardDetail(Request $request,$ID){
        try{
            $cardProduct=card::where("id_Account",$request->input('id_Account'))->first();
            $card=null;
            $wareSum = DetailWareHouse::where('ID_Product', $ID)->sum('Quality');
            if(!$cardProduct){
                if($wareSum>0){
                    $card = card::create(["id_Account" => $request->input('id_Account')]);
                    $cardId = $card ? $card->id : $cardProduct->id_Account;
                    $detailcard=detailcard::create(['id_card' => $cardId, 'id_product' => $ID, 'Quality' => $request->input('Quality')]);
                    return response()->json(['message' => 'Card added successfully', 'Cate' => $detailcard]);
                }
                
            }else{
                $productexist=detailcard::where("id_product", $ID)->first();
                if($wareSum>0){
                if($productexist){
                   
                        $detail = detailcard::where("id_product", $ID)->update(['Quality' => DB::raw('Quality + '.$request->input("Quality"))]);
                        return response()->json(['message' => 'Card added successfully', 'Cate' => $detail]);
                     }else{
                        $detail = detailcard::create(['id_card' => $cardProduct->ID , 'id_product' => $ID, 'Quality' => $request->input('Quality')]);
                        return response()->json(['message' => 'Card added successfully', 'Cate' => $detail]);
                    }
                }
               
            }
        }catch(\Exception $error){
            return response()->json(['error' => 'Failed to add card'], 500);
        }
    }
    public function UpdateCard(Request $request,$ID){
        $Updaterow=detailcard::where("id_product",$ID)->update(["Quality"=>$request->input('UpdateQuality')]);
        if($Updaterow>0){
            return response()->json(['message' => 'Category updated successfully']);
        
        }
    }
    public function addCard(Request $request, $ID)
    {
        try {
            $cardProduct = card::where("id_Account", $request->input('id_Account'))->first();
            $card = null;
            $wareSum = DetailWareHouse::where('ID_Product', $ID)->sum('Quality');
            if (!$cardProduct ) {
                // If card doesn't exist, create a new card
                if($wareSum>0){
                    $card = card::create(["id_Account" => $request->input('id_Account')]);
                    $cardId = $card ? $card->id : $cardProduct->id_Account;
        
                    // Create a new detailcard
                    $detailcard = detailcard::create(['id_card' => $cardId, 'id_product' => $ID, 'Quality' => 1]);
                    return response()->json(['message' => 'Card added successfully', 'Cate' => $detailcard]);
                }
              
            }else{
                $productexist=detailcard::where("id_product", $ID)->first();
                if($wareSum>0){
                    if($productexist){
                    
                        $detail = detailcard::where("id_product", $ID)->update(['Quality' => DB::raw('Quality + 1')]);

                        return response()->json(['message' => 'Card added successfully', 'Cate' => $detail]);
                    
                  
                  
                }else{
                    $detail = detailcard::create(['id_card' => $cardProduct->ID , 'id_product' => $ID, 'Quality' => 1]);
                    return response()->json(['message' => 'Card added successfully', 'Cate' => $detail]);
                }
                }
                
              
              
            }
    
            // Retrieve the ID of the newly created or existing card
          
    
        
        } catch (\Exception $error) {
            return response()->json(['error' => 'Failed to add card'], 500);
        }
    }
}
