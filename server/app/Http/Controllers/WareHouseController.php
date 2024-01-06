<?php

namespace App\Http\Controllers;

use App\Models\DetailWareHouse;
use App\Models\WareHouse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class WareHouseController extends Controller
{
    public function getProductWareHouse(){
        $product = DB::table('product')
        ->orderBy('ID', 'desc')
        ->get();
        return response()->json($product,200);
    }
    public function removeWareHouse(Request $request,$ID){
        $DeleteQualities = $request->input("DeleteQualities");
    
        try {
            foreach ($DeleteQualities as $index => $DeleteQuality) {
                $WareHouse = DetailWareHouse::where("ID_Product", $ID)
                    ->orderBy("Quality", 'desc')
                    ->offset($index) // Offset to the specific row
                    ->first();
    
                if ($WareHouse) {
                    $updateWareHouse = DetailWareHouse::where("ID_Product", $WareHouse->ID_Product)
                        ->where("Quality", $WareHouse->Quality)
                        ->where("ID_WareHouse", $WareHouse->ID_WareHouse)
                        ->update(["Quality" => DB::raw('Quality -' . $DeleteQuality)]);
    
                    if ($updateWareHouse === 0) {
                        return response()->json(['error' => 'Failed to update Quality'], 500);
                    }
                } else {
                    return response()->json(['error' => 'Warehouse not found'], 404);
                }
            }
    
            return response()->json(['message' => 'Update Quality successfully']);
        } catch (\Exception $error) {
            return response()->json(['error' => 'Failed to update Warehouse'], 500);
        }
    }
    public function EditWareHouse(Request $request, $ID)
    {
        $UpdateQualities = $request->input("UpdateQualities");
    
        try {
            foreach ($UpdateQualities as $index => $updateQuality) {
                $WareHouse = DetailWareHouse::where("ID_Product", $ID)
                    ->orderBy("Quality", 'desc')
                    ->offset($index) // Offset to the specific row
                    ->first();
    
                if ($WareHouse) {
                    $updateWareHouse = DetailWareHouse::where("ID_Product", $WareHouse->ID_Product)
                        ->where("Quality", $WareHouse->Quality)
                        ->where("ID_WareHouse", $WareHouse->ID_WareHouse)
                        ->update(["Quality" => DB::raw('Quality +' . $updateQuality)]);
    
                    if ($updateWareHouse === 0) {
                        return response()->json(['error' => 'Failed to update Quality'], 500);
                    }
                } else {
                    return response()->json(['error' => 'Warehouse not found'], 404);
                }
            }
    
            return response()->json(['message' => 'Update Quality successfully']);
        } catch (\Exception $error) {
            return response()->json(['error' => 'Failed to update Warehouse'], 500);
        }
    }

    public function getWareHouse($ID){
        $WareHouse = DB::table("warehouse")
        ->join("detail_warehouse", "warehouse.ID", "=", "detail_warehouse.ID_WareHouse")
        ->join("product", "product.ID", "=", "detail_warehouse.ID_Product")
        ->join("provider", "product.id_provider", "=", "provider.ID")
        ->select([
            "product.ID",
            "product.Name as ProductName",
            DB::raw("SUM(detail_warehouse.Quality) as TotalQuantity"),
            "provider.Name as ProviderName",
        ])
        ->groupBy("product.ID", "product.Name", "provider.Name")
        ->where("warehouse.IDAccount", $ID)
        ->get();
    
    return response()->json($WareHouse, 200);
    }
    public function AddWareHouse(Request $request,$ID){
        try{
            $WareHouseProduct=WareHouse::where("IDAccount",$ID)->first();
            $Ware=null;
            if(!$WareHouseProduct){
                $Ware=WareHouse::create(['IDAccount'=>$ID]);
                $WareHouseID=$Ware ? $Ware->id : $WareHouseProduct->IDAccount;
                $detailWareHouse=DetailWareHouse::create(['ID_WareHouse'=>$WareHouseID,'ID_Product'=>$request->input('iDProduct'),'Quality'=>$request->input('Quality'),'CreateTime'=>now()->timezone('Asia/Ho_Chi_Minh')]);
                return response()->json(['message' => 'WareHouse added successfully', 'Cate' => $detailWareHouse]);
            }else{
                
                    $detail=DetailWareHouse::create(["ID_WareHouse"=>$WareHouseProduct->ID,"ID_Product"=>$request->input("iDProduct"),"Quality"=> $request->input('Quality'),"CreateTime"=>now()->timezone('Asia/Ho_Chi_Minh')]);
                    return response()->json(['message' => 'Card added successfully', 'Cate' => $detail]);
                
            }

        }catch(\Exception $error){
            return response()->json(['error' => 'Failed to add WareHouse'], 500);
        }
    }
}
