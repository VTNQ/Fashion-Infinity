<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\providermodel as ModelsProvider;

class ProductController extends Controller
{
    //
    public function getProvider(){
        $Provider=ModelsProvider::all();
       

    return response()->json($Provider,200);
    }
    public function Addproduct(Request $request)
{
    try {
        $uploadedImages = [];
        $ids = [];

        foreach ($request->file('Image') as $image) {
            // Use the store method to move the file to the specified location
            $imagePath = $image->store('images', 'public');

            // Save the image path in the database
            $picture = new Picture();
            $picture->link = $imagePath;
            $picture->status = 1;
            $picture->save();

            $uploadedImages[] = $imagePath;
            $ids[] = $picture->ID;

        }
        $product=new Product();
        $product->Name=$request->input('NameProduct');
        $product->content=$request->input('content');
        $product->id_provider=$request->input('Provider');
        $product->save();
        return response()->json(['message' => 'Images uploaded and IDs saved successfully', 'ids' => $ids]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to upload images', 'ids' => []], 500);
    }
}
}
