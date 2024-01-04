<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\category_post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class BlogController extends Controller
{   
    public function UpdateStatus($ID,Request $request){
        try{
            $CategoryPost=Blog::where("ID",$ID)->first();
            if( $CategoryPost->Blog_status==1){
                $deleterows=Blog::where('ID',$ID)->update(['Blog_status' => 0]);
                if($deleterows>0){
                    return response()->json(['message' => 'Change successful']);
                }
            }else{
                $deleterows=Blog::where('ID',$ID)->update(['Blog_status' => 1]);
                if($deleterows>0){
                    return response()->json(['message' => 'Change successful']);
                }
            }
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
    public function ViewBlog(){
        try{
            $blog=DB::table("blog")->join('category_post',"category_post.ID","=","blog.Blog_category")->select(["blog.ID",'blog.Blog_meta_desc','blog.Blog_meta_keyword','blog.Blog_status','category_post.Name','blog.Blog_image','blog.Blog_tittle'])->groupBy(["blog.ID",'blog.Blog_meta_desc','blog.Blog_meta_keyword','blog.Blog_status','category_post.Name','blog.Blog_image','blog.Blog_tittle'])->get();
            return response()->json($blog, 200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
    }
    public function getBlog(){
        $categories = DB::table('blog')->join('category_post',"category_post.ID","=","blog.Blog_category")
        ->orderBy('category_post.ID', 'desc')->select(['category_post.ID','category_post.Name', DB::raw("Count(blog.ID) as TotalProduct")])->groupBy('category_post.ID','category_post.Name')->get();
        return response()->json($categories,200);
    }
    public function AddBlog(Request $request){
        try{
            if($request->hasFile('image')){
                $image = $request->file('image');
    
                // Generate a unique name for the image
                $imageName = time() . '_' . $image->getClientOriginalName();
                $localPath = 'images/' . $imageName;
                $image->move(public_path('images'), $imageName);
                $Add=Blog::create(['Blog_image'=>$localPath,'Blog_tittle'=>$request->input('Blog_tittle'),'Blog_desc'=>$request->input('Blog_desc'),'Blog_content'=>$request->input('Blog_content'),'Blog_meta_desc'=>$request->input('Blog_meta_desc'),'Blog_meta_keyword'=>$request->input('Blog_meta_keyword'),'Blog_category'=>$request->input('Blog_category'),'Blog_status'=>$request->input('Blog_status')]);
                return response()->json(['message' => 'Order placed successfully', 'Order' => $Add]);
            }
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()]);
        }
       
       
    }
    public function deleteBlog(Request $request, $ID)
    {
        try {
            // Find the picture by ID
            $picture = Blog::find($ID);
    
            // Check if the picture exists
            if (!$picture) {
                return response()->json(['error' => 'Picture not found'], 404);
            }
    
            // Get the image link
            $oldImagePath = $picture->Blog_image;
    
            // Delete the picture from the database
            $deletedRows = $picture->delete();
            Blog::where("ID",$ID)->delete();
         
            if ($deletedRows > 0) {
                // Check if the file exists before attempting to delete it
                $fullImagePath = public_path($oldImagePath);
                if (file_exists($fullImagePath)) {
                    unlink($fullImagePath);
                }
    
                return response()->json(['message' => 'Delete successful']);
            } else {
                return response()->json(['error' => 'Failed to delete picture'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete picture', 'message' => $e->getMessage()], 500);
        }
    }
    public function getpostCategory(){
        $post_Category=category_post::all();
        return response()->json($post_Category, 200);
    }
}
