<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Services\Document\DocumentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File as FileRule;

class DocumentController extends Controller
{
    public function __construct(private DocumentService $documentService)
    {}

    /**
     * Display the document tools dashboard.
     */
    public function index()
    {
        return inertia('DocumentTools/Index');
    }

    /**
     * Display the specific tool page.
     */
    public function showTool(string $tool)
    {
        $validTools = [
            'pdf-to-word', 'word-to-pdf', 'merge-pdf',
            'split-pdf', 'compress-pdf', 'image-to-pdf', 'pdf-to-image'
        ];

        if (!in_array($tool, $validTools)) {
            abort(404);
        }

        return inertia('DocumentTools/ToolPage', [
            'tool' => $tool
        ]);
    }

    /**
     * Handle document conversion process.
     */
    public function process(Request $request, string $tool)
    {
        $toolType = str_replace('-', '_', $tool);
        $userId = Auth::id();

        // Basic validation
        $request->validate([
            'file' => ['required', FileRule::types(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp'])->max(25 * 1024)],
        ]);

        $uploadedFile = $request->file('file');
        
        // Additional validation based on tool
        if (str_starts_with($tool, 'pdf-') && $uploadedFile->extension() !== 'pdf') {
            return response()->json(['success' => false, 'message' => 'Invalid file format. Expected PDF.']);
        }
        if ($tool === 'word-to-pdf' && !in_array($uploadedFile->extension(), ['doc', 'docx'])) {
            return response()->json(['success' => false, 'message' => 'Invalid file format. Expected Word document.']);
        }

        // Store file initially
        $fileModel = $this->documentService->storeUploadedFile($uploadedFile, $toolType, $userId);

        // Process based on tool
        try {
            switch ($toolType) {
                case 'pdf_to_word':
                    $fileModel = $this->documentService->processPdfToWord($fileModel);
                    break;
                case 'word_to_pdf':
                    $fileModel = $this->documentService->processWordToPdf($fileModel);
                    break;
                case 'compress_pdf':
                    $quality = $request->input('quality', 'medium');
                    $fileModel = $this->documentService->processCompressPdf($fileModel, $quality);
                    break;
                // Merge, Split, ImageToPdf, PdfToImage to be added
                default:
                    throw new \Exception("Tool not fully implemented yet.");
            }

            if ($fileModel->status === 'failed') {
                return response()->json(['success' => false, 'message' => 'Conversion failed.'], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Conversion successful',
                'data' => [
                    'id' => $fileModel->id,
                    'download_url' => route('document.download', $fileModel->id)
                ]
            ]);

        } catch (\Exception $e) {
            $fileModel->status = 'failed';
            $fileModel->save();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Download the converted file.
     */
    public function download(File $file)
    {
        // Simple security: if the file belongs to a user, only that user can download it
        if ($file->user_id !== null && $file->user_id !== Auth::id()) {
            abort(403);
        }

        if ($file->status !== 'completed' || !$file->output_path || !Storage::disk('private')->exists($file->output_path)) {
            abort(404, 'File not found or not yet processed.');
        }

        return Storage::disk('private')->download($file->output_path);
    }
}
