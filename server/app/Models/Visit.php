<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'visits';

    // Các cột trong bảng có thể gán hàng loạt
    protected $fillable = ['path', 'ip'];

    // Định nghĩa các thuộc tính được ép kiểu
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        // 'ip' có thể được ép kiểu nếu cần, ví dụ 'ip' => 'string'
    ];
}
