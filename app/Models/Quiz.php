<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['ai_history_id', 'title', 'content'])]
class Quiz extends Model
{
    use HasFactory;
    public function aiHistory(): BelongsTo
    {
        return $this->belongsTo(AIHistory::class);
    }
}
