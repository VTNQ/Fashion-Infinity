<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class DetailController extends Controller
{
   public function getDetail($ID){
    $Detail=DB::table("product")->join("category_product","product.ID","=","category_product.id_Product")->
    join("category","category.ID","=","category_product.id_Category")->join("picture","picture.ID","=","category_product.id_Picture")->
    join("detail_warehouse","detail_warehouse.ID_Product","=","product.ID")
    ->select([
        "product.Name as ProductName",
        "product.Price",
        "product.content",
        "category.Name as NameCategory",
        "picture.link",
        DB::raw("SUM(detail_warehouse.Quality) as TotalQuantity"),

    ])->groupBy("product.Name",
    "product.Price",
    "product.content",
    "picture.link",
    "category.Name")->where("picture.status",1)->where("product.ID",$ID)->first();
    return response()->json($Detail, 200);
   }
   public function getextra($ID){
    $Detail=DB::table("product")->join("category_product","product.ID","=","category_product.id_Product")->
    join("category","category.ID","=","category_product.id_Category")->join("picture","picture.ID","=","category_product.id_Picture")->
    join("detail_warehouse","detail_warehouse.ID_Product","=","product.ID")
    ->select([
      
        "picture.ID",
        "picture.link",
     

    ])->groupBy( "picture.ID",
    "picture.link")->where("product.ID",$ID)->get();
    return response()->json($Detail, 200);
   }
}
