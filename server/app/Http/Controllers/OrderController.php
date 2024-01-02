<?php

namespace App\Http\Controllers;

use App\Models\order;
use App\Models\Account;
use App\Models\card;
use App\Models\detailcard;
use App\Models\DetailOrder;
use App\Models\DetailWareHouse;
use App\Models\WareHouse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function DefaultOrder($ID)
    {
        $Account = DB::table('account')->where('ID', $ID)->first();
        
        return response()->json($Account, 200);
    }
    public function addOrder(Request $request)
    {
       
        $cardProduct = card::where("id_Account", $request->input('id_Account'))->first();
        try {
            $account = Account::where('ID', $request->input('id_Account'))
                ->whereNull('Country')
                ->whereNull('FullName')
                ->whereNull('City')
                ->whereNull('PostCode')
                ->whereNull('Phone')
                ->whereNull('Address')
                ->first();

            if ($account) {
                $updatedAccount = Account::where('ID', $request->input('id_Account'))
                    ->update([
                        'Country' => $request->input('Country'),
                        'FullName' => $request->input('FullName'),
                        'City' => $request->input('City'),
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
                    'city' => $request->input('City'),
                    'Postcode' => $request->input('PostCode'),
                    'id_Account' => $request->input('id_Account'),
                    'TotalPrice' => $request->input('TotalPrice'),
                    'Country' => $request->input('Country')
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
                }

                return response()->json(['message' => 'Order placed successfully', 'Order' => $order]);
            } else {
                $order = Order::create([
                    'Start_Order' => now()->timezone('Asia/Ho_Chi_Minh'),
                    'Phone' => $request->input('Phone'),
                    'status' => 0,
                    'FullName' => $request->input('FullName'),
                    'Address' => $request->input('Address'),
                    'city' => $request->input('City'),
                    'Postcode' => $request->input('PostCode'),
                    'id_Account' => $request->input('id_Account'),
                    'TotalPrice' => $request->input('TotalPrice'),
                    'Country' => $request->input('Country')
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
                return response()->json(['message' => 'Account does not meet the criteria for placing an order']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    // Helper function to update warehouse



}
