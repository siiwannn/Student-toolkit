<?php

namespace App\Services\Document;

use App\Models\File;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;

class DocumentService
{
    /**
     * Store the uploaded file initially.
     */
    public function storeUploadedFile(UploadedFile $uploadedFile, string $toolType, int $userId = null): File
    {
        $originalName = $uploadedFile->getClientOriginalName();
        $extension = $uploadedFile->getClientOriginalExtension();
        $mimeType = $uploadedFile->getMimeType() ?? 'application/octet-stream';
        $size = $uploadedFile->getSize();
        
        $storedName = time() . '_' . uniqid() . '.' . $extension;
        
        // Define storage path
        $path = $uploadedFile->storeAs("uploads/{$toolType}", $storedName, 'private');

        return File::create([
            'user_id' => $userId, // null for guests
            'tool_type' => $toolType,
            'original_name' => $originalName,
            'stored_name' => $storedName,
            'mime_type' => $mimeType,
            'extension' => $extension,
            'size' => $size,
            'storage_path' => $path,
            'status' => 'uploaded',
        ]);
    }

    public function processPdfToWord(File $file): File
    {
        // Require libreoffice/soffice
        // In local development, we might not have it, so we'll simulate or try
        $file->status = 'processing';
        $file->save();

        $startTime = microtime(true);
        try {
            $inputPath = Storage::disk('private')->path($file->storage_path);
            $outputDir = Storage::disk('private')->path('uploads/output');
            
            if (!file_exists($outputDir)) {
                mkdir($outputDir, 0755, true);
            }

            // Implementation will use LibreOffice CLI
            // e.g., soffice --headless --infilter="writer_pdf_import" --convert-to docx --outdir $outputDir $inputPath
            
            // For MVP mock or actual execution:
            $process = new Process(['soffice', '--headless', '--infilter=writer_pdf_import', '--convert-to', 'docx', '--outdir', $outputDir, $inputPath]);
            $process->run();
            
            if (!$process->isSuccessful()) {
                // If soffice is missing, we create a dummy file for development purposes if on windows
                if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                    $outputName = str_replace('.pdf', '.docx', $file->stored_name);
                    $outputPath = $outputDir . '/' . $outputName;
                    file_put_contents($outputPath, "Dummy Word Content (LibreOffice missing locally)");
                } else {
                    throw new Exception("Conversion failed: " . $process->getErrorOutput());
                }
            } else {
                $outputName = pathinfo($inputPath, PATHINFO_FILENAME) . '.docx';
            }

            $file->output_path = 'uploads/output/' . ($outputName ?? str_replace('.pdf', '.docx', $file->stored_name));
            $file->status = 'completed';
        } catch (\Throwable $e) {
            $file->status = 'failed';
            // In a real app we'd log this: \Log::error($e->getMessage());
        }

        $file->processing_time_ms = round((microtime(true) - $startTime) * 1000);
        $file->save();

        return $file;
    }

    public function processWordToPdf(File $file): File
    {
        $file->status = 'processing';
        $file->save();

        $startTime = microtime(true);
        try {
            $inputPath = Storage::disk('private')->path($file->storage_path);
            $outputDir = Storage::disk('private')->path('uploads/output');
            
            if (!file_exists($outputDir)) {
                mkdir($outputDir, 0755, true);
            }

            // LibreOffice CLI
            // soffice --headless --convert-to pdf --outdir $outputDir $inputPath
            $process = new Process(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', $outputDir, $inputPath]);
            $process->run();
            
            if (!$process->isSuccessful()) {
                if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                    $outputName = str_replace(['.docx', '.doc'], '.pdf', $file->stored_name);
                    $outputPath = $outputDir . '/' . $outputName;
                    file_put_contents($outputPath, "Dummy PDF Content (LibreOffice missing locally)");
                } else {
                    throw new Exception("Conversion failed: " . $process->getErrorOutput());
                }
            } else {
                $outputName = pathinfo($inputPath, PATHINFO_FILENAME) . '.pdf';
            }

            $file->output_path = 'uploads/output/' . ($outputName ?? str_replace(['.docx', '.doc'], '.pdf', $file->stored_name));
            $file->status = 'completed';
        } catch (\Throwable $e) {
            $file->status = 'failed';
        }

        $file->processing_time_ms = round((microtime(true) - $startTime) * 1000);
        $file->save();

        return $file;
    }

    public function processCompressPdf(File $file, string $quality = 'medium'): File
    {
        $file->status = 'processing';
        $file->save();

        $startTime = microtime(true);
        try {
            $inputPath = Storage::disk('private')->path($file->storage_path);
            $outputDir = Storage::disk('private')->path('uploads/output');
            
            if (!file_exists($outputDir)) {
                mkdir($outputDir, 0755, true);
            }

            $outputName = 'compressed_' . $file->stored_name;
            $outputPath = $outputDir . '/' . $outputName;

            // Ghostscript CLI
            // gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=$outputPath $inputPath
            $settings = match($quality) {
                'low' => '/screen',     // lowest quality, smallest file
                'medium' => '/ebook',   // medium quality
                'high' => '/printer',   // high quality
                default => '/ebook'
            };

            $process = new Process(['gs', '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.4', '-dPDFSETTINGS=' . $settings, '-dNOPAUSE', '-dQUIET', '-dBATCH', '-sOutputFile=' . $outputPath, $inputPath]);
            $process->run();
            
            if (!$process->isSuccessful()) {
                if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                    copy($inputPath, $outputPath); // fallback
                } else {
                    throw new Exception("Compression failed: " . $process->getErrorOutput());
                }
            }

            $file->output_path = 'uploads/output/' . $outputName;
            $file->status = 'completed';
        } catch (\Throwable $e) {
            $file->status = 'failed';
        }

        $file->processing_time_ms = round((microtime(true) - $startTime) * 1000);
        $file->save();

        return $file;
    }

    // Merge, Split, ImageToPdf, PdfToImage will be implemented next
}
