<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;

class VisitController extends Controller
{

    public function recordVisit(Request $request)
{
    // Thiết lập khoảng thời gian tối thiểu giữa các lần ghi nhận (ví dụ: 2 giây)
    $thresholdSeconds = 2;

    // Lấy lượt truy cập cuối cùng trong khoảng thời gian cho phép từ cùng một IP và path
    $latestVisit = Visit::where('path', $request->input('path'))
                        ->where('ip', $request->ip())
                        ->where('created_at', '>=', now()->subSeconds($thresholdSeconds))
                        ->latest('created_at')
                        ->first();

    if (!$latestVisit) {
        // Nếu không tồn tại lượt truy cập nào trong khoảng thời gian đó, tạo bản ghi mới
        $visit = Visit::create([
            'path' => $request->input('path'),
            'ip' => $request->ip(),
        ]);

        return response()->json(['success' => 'Visit recorded successfully', 'visit' => $visit]);
    }

    // Nếu đã tồn tại lượt truy cập gần đây, không lưu và trả về thông báo
    return response()->json(['info' => 'Visit already recorded recently']);
}



    public function index()
{
    
    $visitsCount = Visit::count();
    return response()->json(['visitsCount' => $visitsCount]);

}

}
