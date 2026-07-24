<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->enum('tool_type', ['pdf_to_word', 'word_to_pdf', 'merge_pdf', 'split_pdf', 'compress_pdf', 'image_to_pdf', 'pdf_to_image', 'audio_to_text']);
            $table->string('original_name', 255);
            $table->string('stored_name', 255);
            $table->string('mime_type', 100);
            $table->string('extension', 20);
            $table->bigInteger('size');
            $table->string('storage_path', 255);
            $table->string('output_path', 255)->nullable();
            $table->enum('status', ['uploaded', 'processing', 'completed', 'failed']);
            $table->integer('processing_time_ms')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index('tool_type');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
