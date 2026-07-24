# ARCHITECTURE.md

# Student Toolkit V1 - System Architecture

Version: 1.0 (Final)

------------------------------------------------------------------------

# 1. Overview

Student Toolkit V1 menggunakan arsitektur Modular Monolith berbasis
Laravel 12 dengan React + Inertia.js sebagai frontend. Seluruh aplikasi
berada dalam satu project Laravel sehingga deployment lebih sederhana
dan cocok untuk VPS 2 GB.

------------------------------------------------------------------------

# 2. Technology Stack

Frontend - React 19 - Inertia.js - Tailwind CSS - Vite

Backend - PHP 8.3+ - Laravel 12

Database - MySQL 8+

Storage - Local Storage

Web Server - Nginx

Operating System - Ubuntu LTS

------------------------------------------------------------------------

# 3. High-Level Architecture

User Browser │ ▼ React + Inertia.js │ ▼ Laravel Routes │ ▼ Controllers │
▼ Services │ ├── Document Services ├── AI Services └── User Services │ ▼
Models (Eloquent) │ ▼ MySQL

Static files │ ▼ Local Storage

------------------------------------------------------------------------

# 4. Folder Structure

app/ ├── Actions/ ├── Http/ │ ├── Controllers/ │ ├── Middleware/ │ └──
Requests/ ├── Models/ ├── Services/ │ ├── Document/ │ ├── AI/ │ └──
User/ ├── Policies/ ├── Jobs/ └── Providers/

resources/js/ ├── Components/ ├── Layouts/ ├── Pages/ │ ├── Home/ │ ├──
Dashboard/ │ ├── DocumentTools/ │ ├── AIStudy/ │ └── Profile/ ├── Hooks/
└── Utils/

database/ ├── migrations/ ├── seeders/ └── factories/

routes/ ├── web.php └── auth.php

storage/ └── app/private/uploads/

------------------------------------------------------------------------

# 5. Module Breakdown

Authentication - Register - Login - Logout - Profile

Document Tools - PDF → Word - Word → PDF - Merge PDF - Split PDF -
Compress PDF - Image → PDF - PDF → Image

AI Study - Audio → Text - AI Summary - Quiz Generator

History - Riwayat penggunaan - Download ulang

------------------------------------------------------------------------

# 6. Request Flow

Browser → Route → Controller → Form Request Validation → Service → Model
/ Storage → Response → React UI

------------------------------------------------------------------------

# 7. Upload Flow

User memilih file → Validasi frontend → Upload ke Laravel → Validasi
server → Simpan file → Jalankan service sesuai tool → Simpan hasil →
Berikan link download

------------------------------------------------------------------------

# 8. Service Layer

DocumentService - convertPdfToWord() - convertWordToPdf() - mergePdf() -
splitPdf() - compressPdf() - imageToPdf() - pdfToImage()

AIService - transcribeAudio() - summarizeText() - generateQuiz()

HistoryService - saveHistory() - getHistory()

------------------------------------------------------------------------

# 9. Security

-   CSRF Protection
-   Authentication Middleware
-   Authorization Policy
-   MIME Validation
-   File Size Validation
-   Sanitized File Names
-   Rate Limiting
-   Error Logging

------------------------------------------------------------------------

# 10. Performance

-   Lazy Loading React Pages
-   Vite Asset Bundling
-   Database Indexes
-   Optimized File Streaming
-   Queue-ready design untuk proses berat

------------------------------------------------------------------------

# 11. Coding Standards

PHP - PSR-12

Laravel - Service Layer - Form Request Validation - Eloquent
Relationships

React - Functional Components - Hooks - Reusable Components

Naming - PascalCase Components - camelCase Functions - snake_case
Database

------------------------------------------------------------------------

# 12. Deployment

Ubuntu ↓ Nginx ↓ PHP-FPM ↓ Laravel ↓ MySQL

Storage: storage/app/private/uploads

Public Assets: public/

------------------------------------------------------------------------

# 13. Scalability Roadmap

V1 - Modular Monolith

V2 - Queue Workers - Redis Cache - OCR Module - Workspace Module

V3 - External AI Providers - Object Storage - Horizontal Scaling

------------------------------------------------------------------------

# 14. Architecture Principles

-   Single Laravel Project
-   React via Inertia.js
-   Low operational cost
-   Modular codebase
-   Feature-oriented structure
-   Easy maintenance
-   Production-ready foundation

End of Architecture Document.