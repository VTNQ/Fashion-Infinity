<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class HomeProduct extends Controller
{
    //
    public function latestProduct(){
        $latestProducts = DB::table('product')
        ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
        ->join('category', 'category_product.id_Category', '=', 'category.ID')
        ->join('provider', 'product.id_provider', '=', 'provider.ID')
        ->join('picture', 'category_product.id_Picture', '=', 'picture.ID')
        ->select([
            'product.Name as ProductName',
            'product.content',
            'provider.Name as ProviderName',
    
            'product.ID as IDproduct',
            'category_product.id_Product',
            'category_product.id_Category',
    
            DB::raw('MAX(picture.link) as link'), // Use MAX function for non-grouped column
            'product.Price'
        ])
        ->groupBy([
            'product.Name',
            'product.content',
            'provider.Name',
    
            'product.ID',
    
            'category.ID',
            'provider.ID',
            'product.Price'
        ])
        ->havingRaw('COUNT(DISTINCT product.ID) < 5') // Check if the distinct product count is less than 5
        ->where('picture.status', 1)->take(3)->orderByDesc("IDproduct")
        ->get();
    
        return response()->json($latestProducts,200);
    }
    public function detailProduct($ID){
        $products = DB::table('product')
        ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
        ->join('category', 'category_product.id_Category', '=', 'category.ID')
        ->join('provider', 'product.id_provider', '=', 'provider.ID')
        ->join('picture','category_product.id_Picture','=','picture.ID')
        ->join('detail_warehouse','product.ID',"=","detail_warehouse.ID_Product")
        ->select([
          
            'product.Name as ProductName',
            'product.content',
            'provider.Name as ProviderName',
            'category.Name as NameCategory',

            'product.ID as IDproduct',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID as ID_category',
            'provider.ID as ID_provider',
            DB::raw("SUM(detail_warehouse.Quality) as TotalQuantity"),
            'picture.link',
            'product.Price',
            'picture.status as Picture_status'
        ])
        ->groupBy([

            'product.Name',
            'product.content',
            'provider.Name',
            'category.Name',
            
            'product.ID',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID',
            'provider.ID',
          
            'picture.link',
            'product.Price',
            'Picture_status'
        ])->where("product.ID",$ID)
        ->get();
        return response()->json($products, 200);
    }
    public function DisplayProduct(){
        $products = DB::table('product')
        ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
        ->join('category', 'category_product.id_Category', '=', 'category.ID')
        ->join('provider', 'product.id_provider', '=', 'provider.ID')
        ->join('picture','category_product.id_Picture','=','picture.ID')
        ->select([
          
            'product.Name as ProductName',
            'product.content',
            'provider.Name as ProviderName',
            'category.Name as NameCategory',

            'product.ID as IDproduct',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID as ID_category',
            'provider.ID as ID_provider',
            
            'picture.link',
            'product.Price',
            'picture.status as Picture_status'
        ])
        ->groupBy([

            'product.Name',
            'product.content',
            'provider.Name',
            'category.Name',
            
            'product.ID',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID',
            'provider.ID',
          
            'picture.link',
            'product.Price',
            'Picture_status'
        ])->where("picture.status",1)
        ->get();
    
        return response()->json($products, 200);
    }

    public function DisplayProductToHomePage(){
        $products = DB::table('product')
        ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
        ->join('category', 'category_product.id_Category', '=', 'category.ID')
        ->join('provider', 'product.id_provider', '=', 'provider.ID')
        ->join('picture','category_product.id_Picture','=','picture.ID')
        ->select([
          
            'product.Name as ProductName',
            'product.content',
            'provider.Name as ProviderName',
            'category.Name as NameCategory',

            'product.ID as IDproduct',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID as ID_category',
            'provider.ID as ID_provider',
            
            'picture.link',
            'product.Price',
            'picture.status as Picture_status'
        ])
        ->groupBy([

            'product.Name',
            'product.content',
            'provider.Name',
            'category.Name',
            
            'product.ID',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID',
            'provider.ID',
          
            'picture.link',
            'product.Price',
            'Picture_status'
        ])
        ->get();
    
    
        return response()->json($products, 200);
    }
    public function DisplayProductToHomeNewArrival(){
        $products = DB::table('product')
        ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
        ->join('category', 'category_product.id_Category', '=', 'category.ID')
        ->join('provider', 'product.id_provider', '=', 'provider.ID')
        ->join('picture','category_product.id_Picture','=','picture.ID')
        ->select([
          
            'product.Name as ProductName',
            'product.content',
            'provider.Name as ProviderName',
            'category.Name as NameCategory',

            'product.ID as IDproduct',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID as ID_category',
            'provider.ID as ID_provider',
            
            'picture.link',
            'product.Price',
            'picture.status as Picture_status'
        ])
        ->groupBy([

            'product.Name',
            'product.content',
            'provider.Name',
            'category.Name',
            
            'product.ID',
            'category_product.id_Product',
            'category_product.id_Category',
            'category.ID',
            'provider.ID',
          
            'picture.link',
            'product.Price',
            'Picture_status'
        ])
        ->orderBy('product.ID', 'desc') // Sắp xếp theo ID sản phẩm từ thấp đến cao
    ->take(15) // Chỉ lấy 6 sản phẩm
    ->get();
    
        return response()->json($products, 200);
    }
    
    public function getTopcategory(){
        $categories = DB::table('category')
        ->orderBy('ID', 'desc')
        ->take(5)
        ->get();
        return response()->json(['categories' => $categories], 200);
    }
}
