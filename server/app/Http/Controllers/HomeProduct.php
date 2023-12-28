<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class HomeProduct extends Controller
{
    //
    public function detailProduct($ID){
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
            'picture.link'
    
        ])
       ->where("product.ID",$ID)->get();
        return response()->json($latestProducts,200);
    }
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
    public function DisplayProduct(){
        $products = DB::table('product')
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
        ]) // Check if the distinct product count is less than 5
        ->where('picture.status', 1)
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
