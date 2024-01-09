<?php

namespace App\Http\Controllers;

use App\Models\order;
use App\Models\Account;
use App\Models\card;
use App\Models\detailcard;
use App\Models\DetailOrder;
use App\Models\DetailWareHouse;
use App\Models\voucher;
use App\Models\WareHouse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function updateOrder(Request $request,$ID){
        $updateRow=order::where("ID",$ID)->update(['status'=>$request->input('status')]);
        if($updateRow>0){
            return response()->json(['message' => 'Category updated successfully']);
        }
    }
    public function detailCustomer($ID){
        $Customer=DB::table("order")->join("city","city.ID","=","order.id_city")->join("district","district.ID","=","order.id_district")->join("ward","ward.ID","=","order.id_ward")->select(["order.FullName","order.Start_Order","order.Phone","order.Address","city.Name as Namecity","district.Name as Namedistrict","ward.Name as NameWard","order.Postcode"])->groupBy(["order.FullName","order.Start_Order","order.Phone","order.Address","city.Name","district.Name","ward.Name","order.Postcode"])
        ->where("order.ID",$ID)->first();
        return response()->json($Customer,200);
    }
    public function detailProductOrder($ID){
        $ProductOrder = DB::table('order')
        ->join("detailorder", "order.ID", "=", "detailorder.id_order")
        ->join("product", "detailorder.id_product", "=", "product.ID")
        ->join("city", "city.ID", "=", "order.id_city")
        ->join("district", "district.ID", "=", "order.id_district")
        ->join("ward", "ward.ID", "=", "order.id_ward")
        ->where("order.ID", $ID)
        ->select(["product.Name as Nameproduct", "detailorder.Quality", "product.Price","order.TotalPrice"])
        ->groupBy(["product.Name", "detailorder.Quality", "product.Price","order.TotalPrice"])
        ->get();
        return response()->json($ProductOrder,200);
    }
    public function ship($ID){
        $ProductOrder = DB::table('order')
        ->join('detailorder', 'order.ID', '=', 'detailorder.id_order')
        ->join('product', 'detailorder.id_product', '=', 'product.ID')
        ->join('city', 'city.ID', '=', 'order.id_city')
        ->join('district', 'district.ID', '=', 'order.id_district')
        ->join('ward', 'ward.ID', '=', 'order.id_ward')
        ->join('delivery_charges as district_charges', 'district.ID', '=', 'district_charges.ID_district')
        ->join('delivery_charges as ward_charges', 'ward.ID', '=', 'ward_charges.ID_Ward')
        ->join('city as charges_city', 'charges_city.ID', '=', 'ward_charges.id_city')
        ->where('order.ID', $ID)
        ->select([
         
            'district_charges.Price',
            
        ])
        ->first();
        return response()->json($ProductOrder,200);
    }
    public function displayOrder(){
        $Order=DB::table("account")->join("order","account.ID","=","order.id_Account")->select(
          ["order.ID","order.order_code","order.status"]  
        )->get();
        return response()->json($Order,200);
    }
    public function getOrderCountsByDay($month) {
        $orderCounts = DB::table("order")
            ->whereMonth('order.Start_Order', $month)
            ->select(DB::raw('DATE(order.Start_Order) as order_date'), DB::raw('COUNT(DISTINCT order.ID) as order_count'))
            ->groupBy('order_date')
            ->get();
    
        return response()->json($orderCounts, 200);
    }
    public function DefaultOrder($ID)
    {
        $Account = DB::table('account')->where('ID', $ID)->first();
        
        return response()->json($Account, 200);
    }
    public function countOrder(){
        $order=order::count();
        return response()->json(['orderCount' => $order], 200);
    }
    public function addOrder(Request $request)
    {
       
        $cardProduct = card::where("id_Account", $request->input('id_Account'))->first();
        try {
            $account = Account::where('ID', $request->input('id_Account'))
            ->whereNull('id_city')
            ->whereNull('id_district')
            ->whereNull("id_ward")
                ->whereNull('FullName')
            
                ->whereNull('PostCode')
                ->whereNull('Phone')
                ->whereNull('Address')
                ->first();

            if ($account) {
                $updatedAccount = Account::where('ID', $request->input('id_Account'))
                    ->update([
                       'id_city'=>$request->input('id_city'),
                        'FullName' => $request->input('FullName'),
                        'id_district'=>$request->input('id_district'),
                        'id_ward'=>$request->input('id_ward'),
                        'PostCode' => $request->input('PostCode'),
                        'Phone' => $request->input('Phone'),
                        'Address' => $request->input('Address')
                    ]);

                $order = Order::create([
                    'Start_Order' => now()->timezone('Asia/Ho_Chi_Minh'),
                    'Phone' => $request->input('Phone'),
                    'status' => 0,
                    'FullName' => $request->input('FullName'),
                    'Address' => $request->input('Address'),
                    'id_city'=>$request->input('id_city'),
                    'id_ward'=>$request->input('id_ward'),
                    'id_district'=>$request->input('id_district'),
                    'Postcode' => $request->input('PostCode'),
                    'id_Account' => $request->input('id_Account'),
                    'TotalPrice' => $request->input('TotalPrice'),
                    
                 
                    'order_code'=>bin2hex(random_bytes(4))
                ]);
              
                $idProducts = $request->input('id_product');
                $qualities = $request->input('Quality');

                // Assuming both id_product and Quality are arrays of the same length
                for ($i = 0; $i < count($idProducts); $i++) {
                    DetailOrder::create([
                        'id_order' => $order->id,
                        'id_product' => $idProducts[$i],
                        'Quality' => $qualities[$i]
                    ]);
                   
                    $warehouseItem = detailcard::where("id_product", $idProducts[$i])->where("id_card", $cardProduct->ID)
                        ->orderBy("Quality", 'desc')
                        ->first();
                    if ($warehouseItem) {



                        if ($qualities[$i] >= $warehouseItem->Quality) {
                            // Trừ đi giá trị $warehouseItem->Quality
                            detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", $warehouseItem->Quality)
                                ->where("id_card", $cardProduct->ID)
                                ->update(["Quality" => 0]);

                            // Trừ đi giá trị $qualities[$i] - $warehouseItem->Quality từ các bản ghi khác
                            $remainingQuantity = $qualities[$i] - $warehouseItem->Quality;

                            detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", '>', 0)
                                ->where("id_card", $cardProduct->ID)
                                ->decrement("Quality", $remainingQuantity);
                                detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", '<=', 0)
                                ->where("id_card", $cardProduct->ID)
                                ->delete();
                        } else {
                            // Trừ đi giá trị $qualities[$i]
                            detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", $warehouseItem->Quality)
                                ->where("id_card", $cardProduct->ID)
                                ->decrement("Quality", $qualities[$i]);
                        }
                         $WareHouse=DetailWareHouse::where("ID_Product",$idProducts[$i])->orderBy("Quality", 'desc')
                    ->first();
                    if($WareHouse){
                        if ($qualities[$i] >= $WareHouse->Quality){
                            DetailWareHouse::where("ID_Product",$idProducts[$i])->where("Quality", $WareHouse->Quality)->
                            update(["Quality" => 0]);
                            $remainingQuantity = $qualities[$i] - $WareHouse->Quality;
                            DetailWareHouse::where("ID_Product",$idProducts[$i])->where("Quality", '>', 0)->
                            decrement("Quality", $remainingQuantity);
                            DetailWareHouse::where("ID_Product",$idProducts[$i])->where("Quality", '<=', 0)->
                            delete();
                        }else{
                        DetailWareHouse::where("ID_Product",$idProducts[$i])->decrement("Quality", $qualities[$i]);
                        }
                    }
                    }
                  $voucherCode = $request->input('vouchercode');
$freeShipCode = $request->input('Freeship');

if ($voucherCode !== null) {
    // Nếu voucherCode không phải là null, thì thực hiện cập nhật quantity - 1
    DB::table('voucher')
        ->where('voucherCode', $voucherCode)
        ->update(['quantity' => DB::raw('quantity - 1')]);
}

if ($freeShipCode !== null && strpos($freeShipCode, 'FSH') === 0) {
    // Nếu Freeship không phải là null và bắt đầu bằng 'FSH', thì thực hiện cập nhật quantity + 1
    DB::table('voucher')
        ->where('voucherCode', $freeShipCode)
        ->update(['quantity' => DB::raw('quantity + 1')]);
}
                }

                return response()->json(['message' => 'Order placed successfully', 'Order' => $order]);
            } else {
                $order = Order::create([
                    'Start_Order' => now()->timezone('Asia/Ho_Chi_Minh'),
                    'Phone' => $request->input('Phone'),
                    'status' => 0,
                    'FullName' => $request->input('FullName'),
                    'Address' => $request->input('Address'),
                    'id_city'=>$request->input('id_city'),
                    'id_ward'=>$request->input('id_ward'),
                    'id_district'=>$request->input('id_district'),
                    'Postcode' => $request->input('PostCode'),
                    'id_Account' => $request->input('id_Account'),
                    'TotalPrice' => $request->input('TotalPrice'),
                   
      
                    'order_code'=>bin2hex(random_bytes(4))
                ]);
                $idProducts = $request->input('id_product');
                $qualities = $request->input('Quality');

                // Assuming both id_product and Quality are arrays of the same length
                for ($i = 0; $i < count($idProducts); $i++) {
                    DetailOrder::create([
                        'id_order' => $order->id,
                        'id_product' => $idProducts[$i],
                        'Quality' => $qualities[$i]
                    ]);
                   
                    $warehouseItem = detailcard::where("id_product", $idProducts[$i])->where("id_card", $cardProduct->ID)
                        ->orderBy("Quality", 'desc')
                        ->first();
                    if ($warehouseItem) {



                        if ($qualities[$i] >= $warehouseItem->Quality) {
                            // Trừ đi giá trị $warehouseItem->Quality
                            detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", $warehouseItem->Quality)
                                ->where("id_card", $cardProduct->ID)
                                ->update(["Quality" => 0]);

                            // Trừ đi giá trị $qualities[$i] - $warehouseItem->Quality từ các bản ghi khác
                            $remainingQuantity = $qualities[$i] - $warehouseItem->Quality;

                            detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", '>', 0)
                                ->where("id_card", $cardProduct->ID)
                                ->decrement("Quality", $remainingQuantity);
                                detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", '<=', 0)
                                ->where("id_card", $cardProduct->ID)
                                ->delete();
                        } else {
                            // Trừ đi giá trị $qualities[$i]
                            detailcard::where("id_product", $idProducts[$i])
                                ->where("Quality", $warehouseItem->Quality)
                                ->where("id_card", $cardProduct->ID)
                                ->decrement("Quality", $qualities[$i]);
                        }
                         $WareHouse=DetailWareHouse::where("ID_Product",$idProducts[$i])->orderBy("Quality", 'desc')
                    ->first();
                    if($WareHouse){
                        if ($qualities[$i] >= $WareHouse->Quality){
                            DetailWareHouse::where("ID_Product",$idProducts[$i])->where("Quality", $WareHouse->Quality)->
                            update(["Quality" => 0]);
                            $remainingQuantity = $qualities[$i] - $WareHouse->Quality;
                            DetailWareHouse::where("ID_Product",$idProducts[$i])->where("Quality", '>', 0)->
                            decrement("Quality", $remainingQuantity);
                            DetailWareHouse::where("ID_Product",$idProducts[$i])->where("Quality", '<=', 0)->
                            delete();
                        }else{
                        DetailWareHouse::where("ID_Product",$idProducts[$i])->decrement("Quality", $qualities[$i]);
                        DetailWareHouse::where("ID_Product",$idProducts[$i])->where("Quality", '<=', 0)->
                        delete();
                        }
                    }
                    }
                }
                $voucherCode = $request->input('vouchercode');
                $freeShipCode = $request->input('Freeship');
                
                if ($voucherCode !== null) {
                    // Nếu voucherCode không phải là null, thì thực hiện cập nhật quantity - 1
                    DB::table('voucher')
                        ->where('voucherCode', $voucherCode)
                        ->update(['quantity' => DB::raw('quantity - 1')]);
                }
                
                if ($freeShipCode !== null && strpos($freeShipCode, 'FSH') === 0) {
                    // Nếu Freeship không phải là null và bắt đầu bằng 'FSH', thì thực hiện cập nhật quantity + 1
                    DB::table('voucher')
                        ->where('voucherCode', $freeShipCode)
                        ->update(['quantity' => DB::raw('quantity + 1')]);
                }
                return response()->json(['message' => 'Account does not meet the criteria for placing an order']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    // Helper function to update warehouse



}
