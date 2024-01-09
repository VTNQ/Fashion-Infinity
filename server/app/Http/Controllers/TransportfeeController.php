<?php

namespace App\Http\Controllers;

use App\Models\city;
use App\Models\delivery_charges;
use App\Models\district;
use App\Models\ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class TransportfeeController extends Controller
{
    public function displaywardCity(){
        $ward=city::all();
        return response()->json($ward,200);
    }
    public function displaydistrict(){
        $dictrict=district::all();
        return response()->json($dictrict,200);
    }
    public function displayward(){
        $Ward=ward::all();
        return response()->json($Ward,200);
    }
    public function Adddelivery_charges(Request $request){
        try{
            $deliveryChange=delivery_charges::create(['Price'=>$request->input('Price'),'ID_district'=>$request->input('ID_district'),'ID_Ward'=>$request->input('ID_Ward'),'id_city'=>$request->input('id_city')]);
            return response()->json(['message' => 'Register successful', 'Cate'=>$deliveryChange]);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);  
        }
        
    }
    public function displaydelivery(){
        try{
           $display= DB::table('delivery_charges')->join('district',"delivery_charges.ID_district","=","district.ID")->
            join("city","city.ID","=","delivery_charges.id_city")->join('ward',"ward.ID","=","delivery_charges.ID_Ward")->select(['delivery_charges.ID',"district.Name as Namedistrict","ward.Name as NameWard","city.Name as Namecity","delivery_charges.Price"])->
            groupBy(['delivery_charges.ID',"district.Name","ward.Name","city.Name","delivery_charges.Price"])->get();
            return response()->json($display,200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);  
        
        }
    }
    public function totaldistrict(){
        $district=district::count();
        return response()->json(['cityDistrict' => $district], 200);
    }
    public function totalCity(){
        $city=city::count();
        return response()->json(['cityCount' => $city], 200);
    }
    public function totalward(){
        $Ward=ward::count();
        return response()->json(['cityward' => $Ward], 200);
    }
    public function totalpricedisplay(){
        $display= DB::table('delivery_charges')->join('district',"delivery_charges.ID_district","=","district.ID")->
        join("city","city.ID","=","delivery_charges.id_city")->join('ward',"ward.ID","=","delivery_charges.ID_Ward")->select(['delivery_charges.ID_district',"delivery_charges.ID_district","delivery_charges.id_city","delivery_charges.Price","delivery_charges.ID_Ward"])->
        
        groupBy(['delivery_charges.ID_district',"delivery_charges.ID_district","delivery_charges.id_city","delivery_charges.Price","delivery_charges.ID_Ward"])->get();
        return response()->json($display,200);
    }
    public function updatedelivery(Request $request,$ID){
        try{
            $update=DB::table('delivery_charges')->where("ID",$ID)->update(["Price"=>$request->input("Update_Price")]);
            if($update>0){
                return response()->json(['message' => 'Register successful', 'Cate'=>$update]);
            }
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500); 
        }
    }
}
