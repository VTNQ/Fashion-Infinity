<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class MyorderController extends Controller
{
    public function orderDetail($ID,$IDproduct){
        $order=DB::table('order')->join("detailorder","order.ID","=","detailorder.id_order")->join("product","product.ID","=","detailorder.id_product")->join("category_product","product.ID","=","category_product.id_Product")->join("picture","picture.ID","=","category_product.id_Picture")->select(["picture.link","detailorder.Quality","product.Price","order.TotalPrice","product.Name","order.order_code"])->groupBy(["picture.link","detailorder.Quality","product.Price","order.TotalPrice","product.Name","order.order_code"])->where("detailorder.id_order",$ID)->where("detailorder.id_product",$IDproduct)->first();
        return response()->json($order,200); 
    
    }
    public function InformationCustomer($ID){
        $customer=DB::table('order')->join("account","order.id_Account","=","account.ID")->where("order.id_Account",$ID)->first();
        return response()->json($customer,200); 
    }
    public function AddressOrder($ID){
        $order=DB::table('order')->join('city',"city.ID","=","order.id_city")->join('district',"order.id_district","=","district.ID")->
        join("ward","ward.ID","=","order.id_ward")->select(["ward.Name as NameWard","city.Name as NameCity","district.Name as Namedistrict","order.Address"])->groupBy(["ward.Name","city.Name","district.Name","order.Address"])->
        where("order.id_Account",$ID)->first();
        return response()->json($order,200); 
    }
    public function deliveried($ID){
        $Order=DB::table('order')->join('detailorder','order.ID',"=","detailorder.id_order")->
        join("product","product.ID","=","detailorder.id_product")->join("category_product","product.ID","=","category_product.id_Product")->
        join("picture","category_product.id_Picture","=","picture.ID")->where("order.id_Account",$ID)->where("picture.status",1)->where("order.status",2)->select(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order"])->groupBy(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order"])->get();
        return response()->json($Order,200); 
    }
    public function delivery($ID){
        $Order=DB::table('order')->join('detailorder','order.ID',"=","detailorder.id_order")->
        join("product","product.ID","=","detailorder.id_product")->join("category_product","product.ID","=","category_product.id_Product")->
        join("picture","category_product.id_Picture","=","picture.ID")->where("order.id_Account",$ID)->where("picture.status",1)->where("order.status",1)->select(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order"])->groupBy(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order"])->get();
        return response()->json($Order,200); 
    }
    public function WaitingConfirmation($ID){
        $Order=DB::table('order')->join('detailorder','order.ID',"=","detailorder.id_order")->
        join("product","product.ID","=","detailorder.id_product")->join("category_product","product.ID","=","category_product.id_Product")->
        join("picture","category_product.id_Picture","=","picture.ID")->where("order.id_Account",$ID)->where("picture.status",1)->where("order.status",0)->select(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order"])->groupBy(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order"])->get();
        return response()->json($Order,200);
    }
    public function AllMyorder($ID){
        $Order=DB::table('order')->join('detailorder','order.ID',"=","detailorder.id_order")->
        join("product","product.ID","=","detailorder.id_product")->join("category_product","product.ID","=","category_product.id_Product")->
        join("picture","category_product.id_Picture","=","picture.ID")->where("order.id_Account",$ID)->where("picture.status",1)->select(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order","product.ID as idproduct","order.ID as idorder"])->groupBy(['picture.link','product.Name',"product.Price","detailorder.Quality","order.order_code","order.status","order.Start_Order","product.ID","order.ID"])->get();
        return response()->json($Order,200);
    }
}
