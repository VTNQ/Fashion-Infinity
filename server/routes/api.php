<?php

use App\Http\Controllers\category;
use App\Http\Controllers\Forgotpassword;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OriginController;
use App\Http\Controllers\PictureController;
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
Route::post('/AddOrigin',[OriginController::class,'AddOrigin'])->name('AddOrigin');