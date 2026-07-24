# API.md

# Student Toolkit V1 - API Specification

Version: 1.0 (Final)

------------------------------------------------------------------------

# Overview

Base URL

/api/v1

Response Format

``` json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Error Format

``` json
{
  "success": false,
  "message": "Validation failed",
  "errors": {}
}
```

Authentication: - Laravel Sanctum - Bearer Token

------------------------------------------------------------------------

# Authentication

## POST /register

Request

``` json
{
  "name":"John Doe",
  "email":"john@example.com",
  "password":"password",
  "password_confirmation":"password"
}
```

Response: User + Token

------------------------------------------------------------------------

## POST /login

Request

``` json
{
  "email":"john@example.com",
  "password":"password"
}
```

Response: User + Token

------------------------------------------------------------------------

## POST /logout

Header

Authorization: Bearer TOKEN

------------------------------------------------------------------------

## GET /me

Mengambil profil pengguna.

------------------------------------------------------------------------

# Document Tools

Semua endpoint menerima multipart/form-data.

## POST /tools/pdf-to-word

Field - file (pdf)

Response

``` json
{
 "download_url":"..."
}
```

------------------------------------------------------------------------

## POST /tools/word-to-pdf

Field - file (doc/docx)

------------------------------------------------------------------------

## POST /tools/merge-pdf

Field - files\[\] (multiple pdf)

------------------------------------------------------------------------

## POST /tools/split-pdf

Field - file - pages (contoh: 1-3,5)

------------------------------------------------------------------------

## POST /tools/compress-pdf

Field - file - quality (low\|medium\|high)

------------------------------------------------------------------------

## POST /tools/image-to-pdf

Field - files\[\] (jpg/png)

------------------------------------------------------------------------

## POST /tools/pdf-to-image

Field - file

Response - zip download

------------------------------------------------------------------------

# AI Study

## POST /ai/audio-to-text

multipart/form-data

Field - audio

Response

``` json
{
 "transcript":"..."
}
```

------------------------------------------------------------------------

## POST /ai/summary

``` json
{
 "text":"..."
}
```

Response

``` json
{
 "summary":"..."
}
```

------------------------------------------------------------------------

## POST /ai/quiz

``` json
{
 "text":"...",
 "question_count":10
}
```

Response

``` json
{
 "questions":[]
}
```

------------------------------------------------------------------------

# History

## GET /history

Mengambil seluruh riwayat milik user.

## GET /history/{id}

Detail riwayat.

## DELETE /history/{id}

Menghapus riwayat.

------------------------------------------------------------------------

# Profile

## PATCH /profile

Field - name - avatar

## PATCH /profile/password

Field - current_password - password - password_confirmation

------------------------------------------------------------------------

# Validation Rules

PDF - max 25 MB

Word - doc/docx - max 25 MB

Image - jpg - jpeg - png - webp

Audio - mp3 - wav - m4a

------------------------------------------------------------------------

# HTTP Status

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

413 Payload Too Large

422 Validation Error

429 Too Many Requests

500 Internal Server Error

------------------------------------------------------------------------

# Security

-   CSRF Protection
-   Rate Limiting
-   File MIME Validation
-   File Size Validation
-   Authentication Middleware
-   Authorization Policy
-   Sanitized File Names

------------------------------------------------------------------------

# API Versioning

Current: /api/v1

Future: /api/v2

------------------------------------------------------------------------

# Future Endpoints

/chat-pdf

/ocr

/notes

/workspace

End of API Specification.