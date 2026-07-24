# Product Requirements Document (PRD)

# Student Toolkit V1

Version: 1.0 (Final Draft)

------------------------------------------------------------------------

# 1. Product Overview

Student Toolkit adalah platform web berbasis Laravel 12 dan React
(Inertia.js) yang membantu siswa dan mahasiswa menyelesaikan pekerjaan
akademik melalui Document Tools dan AI Study Tools dalam satu aplikasi.

Fokus V1 adalah membangun fondasi produk yang ringan, cepat, mudah
digunakan, dan dapat dijalankan pada VPS 2 GB.

------------------------------------------------------------------------

# 2. Product Vision

Menyediakan toolkit akademik yang memungkinkan pengguna menyelesaikan
sebagian besar pekerjaan akademik tanpa harus membuka banyak website.

------------------------------------------------------------------------

# 3. Product Goals

-   Menghemat waktu pengguna.
-   Menyediakan converter yang cepat.
-   Menambahkan AI sederhana untuk membantu belajar.
-   Menggunakan teknologi open source sebisa mungkin.
-   Menekan biaya operasional.

------------------------------------------------------------------------

# 4. Target Users

Primary: - Mahasiswa - Siswa SMA/SMK

Secondary: - Fresh Graduate

------------------------------------------------------------------------

# 5. Tech Stack

Frontend - React - Inertia.js - Tailwind CSS

Backend - Laravel 12

Database - MySQL

Storage - Local Storage

Deployment - Ubuntu - Nginx

------------------------------------------------------------------------

# 6. MVP Features (Locked)

## Document Tools

1.  PDF → Word
2.  Word → PDF
3.  Merge PDF
4.  Split PDF
5.  Compress PDF
6.  Image → PDF
7.  PDF → Image

## AI Study

8.  Audio → Text
9.  AI Summary
10. Quiz Generator

------------------------------------------------------------------------

# 7. User Flow

Guest User

Landing → Pilih Tool → Upload File → Processing → Download

Registered User

Login → Dashboard → Gunakan Tool → Download → Riwayat tersimpan

------------------------------------------------------------------------

# 8. Functional Requirements

Authentication - Register - Login - Logout

Converter - Upload file - Validasi ukuran - Validasi format - Progress
upload - Download hasil

History - Menyimpan riwayat tool - Download ulang

AI - Audio menjadi teks - Ringkasan teks - Quiz dari teks

------------------------------------------------------------------------

# 9. Non Functional Requirements

-   Responsive Desktop & Mobile
-   Maksimum upload configurable
-   Server-side validation
-   CSRF Protection
-   Error logging
-   Clean UI
-   Modular architecture

------------------------------------------------------------------------

# 10. Feature Specification

## PDF → Word

Tujuan: Mengubah PDF menjadi DOCX.

Input: PDF

Output: DOCX

------------------------------------------------------------------------

## Word → PDF

Input: DOCX

Output: PDF

------------------------------------------------------------------------

## Merge PDF

Input: Banyak PDF

Output: 1 PDF

------------------------------------------------------------------------

## Split PDF

Input: PDF

Output: Beberapa PDF

------------------------------------------------------------------------

## Compress PDF

Input: PDF

Output: PDF lebih kecil

------------------------------------------------------------------------

## Image → PDF

Input: JPG PNG

Output: PDF

------------------------------------------------------------------------

## PDF → Image

Input: PDF

Output: PNG/JPG

------------------------------------------------------------------------

## Audio → Text

Input: MP3 WAV

Output: Transcript

------------------------------------------------------------------------

## AI Summary

Input: Text

Output: Summary

------------------------------------------------------------------------

## Quiz Generator

Input: Text

Output: Quiz

------------------------------------------------------------------------

# 11. Success Metrics

-   Semua 10 fitur berjalan.
-   Error rendah.
-   UI sederhana.
-   Converter stabil.
-   AI menghasilkan output yang relevan.

------------------------------------------------------------------------

# 12. Out of Scope (V1)

-   Chat PDF
-   OCR
-   Workspace
-   Notes
-   Video Summary
-   Team Collaboration

------------------------------------------------------------------------

# 13. Future Roadmap

V1.5 - OCR - Notes - Workspace

V2 - Chat PDF - Video Summary - Flashcard - Calendar

------------------------------------------------------------------------

# 14. Project Principles

-   Open source first.
-   Tidak bergantung pada API berbayar jika memungkinkan.
-   User experience lebih penting daripada jumlah fitur.
-   Semua fitur harus benar-benar berfungsi.
-   Arsitektur mudah dikembangkan.

End of PRD.
