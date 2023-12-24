<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class HomeProduct extends Controller
{
    //
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
            'product.Price'
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
            'product.Price'
        ])
        ->get();
    
        return response()->json($products, 200);
    }
}
