<?php

use App\Http\Controllers\category;
use App\Http\Controllers\Forgotpassword;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OriginController;
use App\Http\Controllers\PictureController;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Account;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\cardController;
use App\Http\Controllers\CategoryPostController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FeedbackProductController;
use App\Http\Controllers\HomeProduct;
use App\Http\Controllers\MiniCartController;
use App\Http\Controllers\MyorderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\TransportfeeController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\WareHouseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("/register", [\App\Http\Controllers\RegisterController::class, 'register'])->name('register');
Route::post('/register/google', [\App\Http\Controllers\RegisterController::class, 'registerGoogle'])->name('registerGoogle');
Route::post('/register/registerAdmin',[\App\Http\Controllers\RegisterController::class, 'registerAdmin'])->name('registerAdmin');
Route::post('/Login',[LoginController::class,'Login'])->name('Login');

Route::post('/login/google',[LoginController::class,'LoginGoogle'])->name('LoginGoogle');
Route::post('/reset',[Forgotpassword::class,'CheckEmail'])->name('CheckEmail');
Route::post('/otp',[Forgotpassword::class,'otp'])->name('otp');
Route::post('/AddCategory',[category::class,'AddCategory'])->name('AddCategory');
Route::get('/getcategories',[category::class,'getcategories'])->name('getcategories');
Route::put("/categories/{id}",[category::class,'updateCategory'])->name('updateCategory');
Route::put("/deleteCategory/{id}",[category::class,'deleteCategory'])->name('deleteCategory');
Route::post('/uploadImage',[PictureController::class,'uploadImage'])->name('uploadImage');
Route::get('/getPicture',[PictureController::class,'getPicture'])->name('getPicture');
Route::put('/Updatestatus/{id}',[PictureController::class,'Updatestatus'])->name('Updatestatus');
Route::put('DeletePicture/{id}',[PictureController::class,'DeletePicture'])->name('DeletePicture');
Route::post('/AddProvider',[ProviderController::class,'AddProvider'])->name('AddProvider');
Route::get('/getprovider',[ProviderController::class,'getprovider'])->name('getprovider');
Route::put('/UpdateProvider/{id}',[ProviderController::class,'UpdateProvider'])->name('UpdateProvider');
Route::put('/deleteProvider/{id}',[ProviderController::class,'deleteProvider'])->name('deleteProvider');
Route::get('/getCustomers',[Account::class,'getCustomer'])->name('getCustomer');
Route::get('/getAdmins',[Account::class,'getAdmin'])->name('getAdmins');
Route::put("/admins/{id}",[Account::class,'UpdateUsernameAdmin'])->name('UpdateUsernameAdmin');
Route::post('/Addproduct',[ProductController::class,'Addproduct'])->name('Addproduct');
Route::get('/getProvider',[ProductController::class,'getProvider'])->name('getProvider');
Route::get('/getProduct',[ProductController::class,'getProduct'])->name('getProduct');
Route::put('/updateProduct/{id}',[ProductController::class,'updateProduct'])->name('updateProduct');
Route::get('/getDetailProduct/{id}', [ProductController::class, 'getDetailProduct'])->name('getDetailProduct');
Route::put('/deleteProduct/{id}',[ProductController::class,'deleteProduct'])->name('deleteProduct');
Route::get('/ProfileInformation/{id}',[ProfileController::class,'ProfileInformation'])->name('ProfileInformation');
Route::post('/Updateprofile/{id}',[ProfileController::class,'Updateprofile'])->name('Updateprofile');
Route::get('/getHomeProduct',[HomeProduct::class,'DisplayProduct'])->name('DisplayProduct');
Route::get('/getProductToHomePage',[HomeProduct::class,'DisplayProductToHomePage'])->name('getProductToHomePage');
Route::get('/getProductToNewArrival',[HomeProduct::class,'DisplayProductToHomeNewArrival'])->name('getProductToNewArrival');
Route::get('/getHomeProductToHomepage',[ProductController::class,'DisplayProductToHomepage'])->name('getHomeProductToHomepage');
Route::get('/getTopcategory',[HomeProduct::class,'getTopcategory'])->name('getTopcategory');
Route::get('/latestProduct',[HomeProduct::class,'latestProduct'])->name('latestProduct');
Route::get('/detailProduct/{id}',[HomeProduct::class,'detailProduct'])->name('detailProduct');

Route::get('/getcategoriestohomepage',[category::class,'getCategoriesToHomePage'])->name('getcategoriestohomepage'); //cong
Route::get('/getcategoriestohomepage1',[category::class,'getCategoriesToHomePage1'])->name('getcategoriestohomepage1'); //cong
Route::post('/addCard/{id}',[cardController::class,'addCard'])->name('addCard');
Route::get('/getcart/{id}',[cardController::class,'getcart'])->name('getcart');
Route::post('/AddCardDetail/{id}',[cardController::class,'AddCardDetail'])->name('AddCardDetail');
Route::get('/getProductWareHouse',[WareHouseController::class,'getProductWareHouse'])->name('getProductWareHouse');
Route::post('/AddWareHouse/{id}',[WareHouseController::class,'AddWareHouse'])->name('AddWareHouse');
Route::get('/getWareHouse/{id}',[WareHouseController::class,'getWareHouse'])->name('getWareHouse');
Route::post("/EditWareHouse/{id}",[WareHouseController::class,"EditWareHouse"])->name("EditWareHouse");

// Route::get('/visits-count', [VisitController::class, 'index'])->name("visits-count");
// Route::post('/record-visit', [VisitController::class, 'recordVisit'])->name("record-visit");
Route::post('/createVoucher', [VoucherController::class, 'createVoucher'])->name("createVoucher");
Route::post('/createVoucherFreeship', [VoucherController::class, 'createVoucherFreeship'])->name("createVoucherFreeship");
Route::post('/checkVoucher', [VoucherController::class, 'checkVoucher'])->name("checkVoucher");
Route::get('/getVoucher', [VoucherController::class, 'getVoucher'])->name("getVoucher");
Route::delete('deleteVoucher/{voucherCode}',[VoucherController::class,'deleteVoucher'])->name('deleteVoucher');
Route::get('/getInfomationWareHouse', [WareHouseController::class, 'getInfomationWareHouse'])->name("getInfomationWareHouse");





Route::post("/removeWareHouse/{id}",[WareHouseController::class,"removeWareHouse"])->name("removeWareHouse");
Route::get('/getDetail/{id}',[DetailController::class,'getDetail'])->name('getDetail');
Route::get('/getextra/{id}',[DetailController::class,'getextra'])->name('getextra');
Route::get('/detailProduct',[DetailController::class,"detailProduct"])->name("detailProduct");
Route::get("/getNewProduct",[DetailController::class,"getNewProduct"])->name("getNewProduct");
Route::post('/updateStatus', [LoginController::class, 'updateStatus'])->name("updateStatus");
Route::get('/ShowMiniCart/{id}',[MiniCartController::class,'ShowMiniCart'])->name("ShowMiniCart");
Route::post("/DeleteCard/{id}",[MiniCartController::class,"DeleteCard"])->name("DeleteCard");
Route::post('/Addorder',[OrderController::class,'Addorder'])->name('Addorder');
Route::get('/DefaultOrder/{id}',[OrderController::class,'DefaultOrder'])->name('DefaultOrder');
Route::get('/displayOrder',[OrderController::class,'displayOrder'])->name('displayOrder');
Route::get('/detailCustomer/{id}',[OrderController::class,'detailCustomer'])->name('detailCustomer');
Route::get('/detailProductOrder/{id}',[OrderController::class,'detailProductOrder'])->name('detailProductOrder');
Route::get('/displaywardCity',[TransportfeeController::class,'displaywardCity'])->name('displaywardCity');
Route::get('/displaydistrict',[TransportfeeController::class,'displaydistrict'])->name('displaydistrict');
Route::get('/displayward',[TransportfeeController::class,'displayward'])->name('displayward');
Route::post('/Adddelivery_charges',[TransportfeeController::class,'Adddelivery_charges'])->name('Adddelivery_charges');
Route::get('/displaydelivery',[TransportfeeController::class,'displaydelivery'])->name('displaydelivery');
Route::post('/updatedelivery/{id}',[TransportfeeController::class,'updatedelivery'])->name('updatedelivery');
Route::post('/AddCategoryPost',[CategoryPostController::class,'AddCategoryPost'])->name('AddCategoryPost');
Route::get('/ListCategory',[CategoryPostController::class,'ListCategory'])->name('ListCategory');
Route::post('/UpdateCategoryUpdate/{id}',[CategoryPostController::class,'UpdateCategoryUpdate'])->name('UpdateCategoryUpdate');
Route::get('/getpostCategory',[BlogController::class,'getpostCategory'])->name('getpostCategory');
Route::post('/AddBlog',[BlogController::class,'AddBlog'])->name('AddBlog');
Route::get('/ViewBlog',[BlogController::class,'ViewBlog'])->name('ViewBlog');
Route::post('/UpdateStatus/{id}',[BlogController::class,'UpdateStatus'])->name('UpdateStatus');
Route::put('/deleteBlog/{id}',[BlogController::class,'deleteBlog'])->name('deleteBlog');
Route::get('/getTopBlogcategory',[BlogController::class,'getBlog'])->name('getBlog');
Route::get('/diplayBlog',[BlogController::class,'diplayBlog'])->name('diplayBlog');
Route::get('/detailBlog/{id}',[BlogController::class,'detailBlog'])->name('detailBlog');
Route::get('/recentPost',[BlogController::class,'recentPost'])->name('recentPost');
Route::get('/totalpricedisplay',[TransportfeeController::class,'totalpricedisplay'])->name('totalpricedisplay');
Route::post("/UpdateCard/{id}",[cardController::class,'UpdateCard'])->name('UpdateCard');
Route::get('/ship/{id}',[OrderController::class,'ship'])->name('ship');
Route::post('/updateOrder/{id}',[OrderController::class,'updateOrder'])->name('updateOrder');
Route::get('/AllMyorder/{id}',[MyorderController::class,'AllMyorder'])->name('AllMyorder');
Route::get('/WaitingConfirmation/{id}',[MyorderController::class,'WaitingConfirmation'])->name('WaitingConfirmation');
Route::get('/delivery/{id}',[MyorderController::class,'delivery'])->name('delivery');
Route::get('/deliveried/{id}',[MyorderController::class,'deliveried'])->name('deliveried');
Route::get('/AddressOrder/{id}',[MyorderController::class,'AddressOrder'])->name('AddressOrder');
Route::get('/InformationCustomer/{id}',[MyorderController::class,'InformationCustomer'])->name('InformationCustomer');
Route::get('/orderDetail/{id}/{idproduct}',[MyorderController::class,'orderDetail'])->name('orderDetail');
Route::post('/AddEvent',[EventController::class,'AddEvent'])->name('AddEvent');
Route::get('/getEvent',[EventController::class,'getEvent'])->name('getEvent');
Route::post("/UpdateEvent/{id}",[EventController::class,'UpdateEvent'])->name('UpdateEvent');
Route::put('/DeleteEvent/{id}',[EventController::class,'DeleteEvent'])->name('DeleteEvent');
Route::get('/VoucherCheck',[VoucherController::class,'VoucherCheck'])->name('VoucherCheck');
Route::get('/VoucherFreeship',[VoucherController::class,'VoucherFreeship'])->name("VoucherFreeship");
Route::get('/getOrderCountsByDay/{month}',[OrderController::class,'getOrderCountsByDay'])->name('getOrderCountsByDay');
Route::get('/getWareHouseCountsOrder/{month}',[WareHouseController::class,'getWareHouseCountsOrder'])->name('getWareHouseCountsOrder');
Route::get('/countproduct',[ProductController::class,'countproduct'])->name('countproduct');
Route::get('/totalCategory',[category::class,'totalCategory'])->name('totalCategory');
Route::get('/totalPicture',[PictureController::class,'totalPicture'])->name('totalPicture');
Route::get('/countuser',[Account::class,'countuser'])->name('countuser');
Route::get('/totalCity',[TransportfeeController::class,'totalCity'])->name('totalCity');
Route::get('/totaldistrict',[TransportfeeController::class,'totaldistrict'])->name('totaldistrict');
Route::get('/totalward',[TransportfeeController::class,'totalward'])->name('totalward');
Route::post('/updateCard/{id}/{idproduct}',[MiniCartController::class,'updateCard'])->name('updateCard');
Route::get('/Email/{id}',[FeedbackProductController::class,'Email'])->name('Email');
Route::post('/AddFeedback/{id}/{idProduct}',[FeedbackProductController::class,'AddFeedback'])->name('AddFeedback');
Route::get('/ListFeedback',[FeedbackProductController::class,'ListFeedback'])->name('ListFeedback');
Route::get('/coutBlog',[BlogController::class,'coutBlog'])->name('coutBlog');
Route::get('/countOrder',[OrderController::class,'countOrder'])->name('countOrder');
Route::get('/coutEvent',[EventController::class,'coutEvent'])->name('coutEvent');
Route::get('/showfeedback',[FeedbackProductController::class,'showfeedback'])->name('showfeedback');
Route::post('/SendEmailContact',[RegisterController::class,'SendEmailContact'])->name('SendEmailContact');
Route::get('/displayEvent',[EventController::class,'displayEvent'])->name("displayEvent");