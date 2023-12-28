<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use App\Models\Product;
use App\Models\category;
use App\Models\Category_Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\providermodel as ModelsProvider;

class ProductController extends Controller
{
    //
    public function getDetailProduct($ID){
        $products = DB::table('product')
        ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
        ->join('category', 'category_product.id_Category', '=', 'category.ID')
        ->join('picture', 'category_product.id_Picture', '=', 'picture.ID')
        ->join('provider', 'product.id_provider', '=', 'provider.ID')
        ->select([
            'picture.link',
            'product.Name as ProductName',
            'product.content',
            'provider.Name as ProviderName',
            'category.Name as NameCategory',
            'category_product.size',
            'product.ID as IDproduct',
            'product.Price'
            
        ])
        ->where("product.ID",$ID)
        ->get();
        return response()->json($products, 200);
    }
    public function getProduct()
    {$products = DB::table('product')
        ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
        ->join('category', 'category_product.id_Category', '=', 'category.ID')
        ->join('provider', 'product.id_provider', '=', 'provider.ID')
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
            'category_product.size',
            'product.Price',

            'category_product.id_Picture as Product_Picture'
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
            'category_product.size',
            'product.Price',
            'Product_Picture'
        ])
        ->get();
    
        return response()->json($products, 200);
    }
    public function deleteProduct(Request $request, $ID)
    {
        try {
            // Get the IDs of associated pictures
            $id_Pictures = Category_Product::where('id_Product', $ID)->pluck('id_Picture')->toArray();
    
            // Delete the category_product records
            Category_Product::where('id_Product', $ID)->delete();
    
            // Delete the product record
            $deletedProductCount = Product::where('ID', $ID)->delete();
    
            // Delete the associated pictures and get their paths
            $pictures = Picture::whereIn('ID', $id_Pictures)->get();
            Picture::whereIn('ID', $id_Pictures)->delete();
    
            // If the product and associated records are deleted successfully
            if ($deletedProductCount > 0) {
                // Delete the actual image files
                foreach ($pictures as $picture) {
                    $fullImagePath = public_path($picture->link);
                    if (file_exists($fullImagePath)) {
                        unlink($fullImagePath);
                    }
                }
    
                return response()->json(['message' => 'Delete successful']);
            }
        } catch (\Exception $error) {
            return response()->json(['error' => 'Failed to delete Product'], 500);
        }
    }
    
    public function updateProduct(Request $request,$ID){
        try{
            $updateProductCategory=Category_Product::where('id_Product',$ID)->update(['id_Category'=>$request->input('UpdateCategory')]);
            
            $deleteRows=Product::where("ID",$ID)->update(['Name'=>$request->input('UpdateNameProduct'),'content'=>$request->input('UpdateContent'),'id_provider'=>$request->input('UpdateProvider')]);
            if($deleteRows>0 || $updateProductCategory>0){
                return response()->json(['message' => 'Delete successful']);
            }
        }catch(\Exception $error){
            return response()->json(['error' => 'Failed to delete Provider'], 500);
        }
    }
    public function getProvider(){
        $Provider=ModelsProvider::all();
       

    return response()->json($Provider,200);
    }
    public function Addproduct(Request $request)
{
    try {
        $uploadedImages = [];
        $ids = [];
        foreach($request->file('Extra') as $image){
            $imageName = time() . '_' . $image->getClientOriginalName();
            $localPath = 'images/' . $imageName;

            // Move the uploaded image to the local path on the server
            $image->move(public_path('images'), $imageName);

            // Save the image path in the database
            $picture = new Picture();
            $picture->link = $localPath;
            $picture->status = 2;
            $picture->save();

            $uploadedImages[] = $localPath;
            $ids[] = $picture->ID;
        }
        foreach ($request->file('Image') as $image) {
            $imageName = time() . '_' . $image->getClientOriginalName();
            $localPath = 'images/' . $imageName;

            // Move the uploaded image to the local path on the server
            $image->move(public_path('images'), $imageName);

            // Save the image path in the database
            $picture = new Picture();
            $picture->link = $localPath;
            $picture->status = 1;
            $picture->save();

            $uploadedImages[] = $localPath;
            $ids[] = $picture->ID;
        }

        $product = new Product();
        $product->Name = $request->input('NameProduct');
        $product->content = $request->input('content');
        $product->id_provider = $request->input('Provider');
        $product->Price=$request->input('Price');
        $product->save();

        foreach ($ids as $idpic) {
            $categoryProduct = new Category_Product(); // Create a new instance for each association
            $categoryProduct->id_Picture = $idpic;
            $categoryProduct->id_Product = $product->ID;
            $categoryProduct->id_Category = $request->input('Category');
            $categoryProduct->size=$request->input('size');
            $categoryProduct->save();
        }

        return response()->json(['message' => 'Images uploaded and IDs saved successfully', 'ids' => $ids]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to upload images', 'ids' => []], 500);
    } 
}
public function DisplayProductToHomepage(){
    $products = DB::table('product')
    ->join('category_product', 'product.ID', '=', 'category_product.id_Product')
    ->join('category', 'category_product.id_Category', '=', 'category.ID')
    
    ->join('picture','category_product.id_Picture','=','picture.ID')
    ->select([
      
        'product.Name as ProductName',
        'product.content',
        
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
