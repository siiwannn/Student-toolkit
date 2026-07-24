# DESIGN.md

# Student Toolkit V1 - Design System

Version: 1.0 (Final)

> **Design Inspiration**
>
> Design system ini terinspirasi oleh pendekatan visual Kraken: bersih,
> profesional, modern, dan fokus pada kejelasan. Sistem ini **bukan
> menyalin tampilan Kraken**, melainkan mengadopsi prinsip visualnya dan
> menyesuaikannya untuk Student Toolkit.

------------------------------------------------------------------------

# 1. Design Philosophy

Student Toolkit menggunakan pendekatan:

-   Clean
-   Modern
-   Professional
-   Fast
-   Student First
-   Accessibility First
-   Mobile First

Targetnya adalah membuat pengguna dapat menggunakan tool dalam waktu
kurang dari **30 detik** tanpa harus mempelajari UI.

------------------------------------------------------------------------

# 2. Brand Identity

## Personality

-   Professional
-   Trustworthy
-   Simple
-   Fast
-   Intelligent

## Keywords

Academic • Productivity • AI • Modern • Lightweight

------------------------------------------------------------------------

# 3. Color System

## Brand Colors

  Token          Value                  Usage
  -------------- ---------------------- -----------------
  Primary        #7132F5                Primary CTA
  Primary Dark   #5741D8                Hover
  Primary Deep   #5B1ECF                Active
  Primary Soft   rgba(113,50,245,.12)   Soft background

## Neutral

  Token            Value
  ---------------- ---------
  Text Primary     #101114
  Text Secondary   #9497A9
  Border           #DEDEE5
  Surface          #FFFFFF
  Background       #F8F9FC

## Semantic

Success : #149E61

Warning : #F59E0B

Danger : #DC2626

Info : #3B82F6

------------------------------------------------------------------------

# 4. Typography

## Font

Display

-   Kraken Brand (fallback: IBM Plex Sans)

Body

-   Kraken Product (fallback: Helvetica, Arial)

## Scale

Hero 48 / 700

H1 36 / 700

H2 28 / 700

H3 22 / 600

Body 16 / 400

Body Medium 16 / 500

Caption 14 / 400

Small 12 / 400

Button 16 / 600

------------------------------------------------------------------------

# 5. Spacing System

4 8 12 16 20 24 32 40 48 64 96

Gunakan kelipatan spacing ini untuk seluruh layout.

------------------------------------------------------------------------

# 6. Border Radius

Small : 6px

Medium : 10px

Default : 12px

Large : 16px

Circle : 9999px

------------------------------------------------------------------------

# 7. Elevation

Micro

rgba(16,24,40,.04) 0 1px 4px

Default

rgba(0,0,0,.03) 0 4px 24px

Hover

rgba(0,0,0,.08) 0 8px 32px

------------------------------------------------------------------------

# 8. Components

## Buttons

### Primary

Background #7132F5

Text White

Radius 12px

Padding 13px 16px

### Outline

White background

Border #5741D8

Text #5741D8

### Soft

Background rgba(113,50,245,.12)

Text #7132F5

### Secondary

Light gray background

Dark text

------------------------------------------------------------------------

## Cards

Radius 16px

Border 1px solid #DEDEE5

Shadow Default Elevation

Padding 24px

------------------------------------------------------------------------

## Inputs

Height 48px

Radius 12px

Border #DEDEE5

Focus Primary Purple

------------------------------------------------------------------------

## Upload Area

-   Drag & Drop
-   Dashed Border
-   Icon besar
-   Supported file formats
-   Progress upload

------------------------------------------------------------------------

## Toast

Success Green

Error Red

Info Blue

------------------------------------------------------------------------

# 9. Layout

## Landing Page

Navbar

↓

Hero

↓

Popular Tools

↓

Document Tools

↓

AI Study

↓

FAQ

↓

Footer

------------------------------------------------------------------------

## Dashboard

Sidebar (Desktop)

Topbar

Quick Actions

Recent History

Favorite Tools

Statistics

------------------------------------------------------------------------

# 10. Tool Page Layout

Title

↓

Description

↓

Upload Area

↓

Options

↓

Convert Button

↓

Progress

↓

Download Result

------------------------------------------------------------------------

# 11. Responsive Breakpoints

375

425

640

768

1024

1280

1536

------------------------------------------------------------------------

# 12. UX Rules

-   Maksimal 3 klik menggunakan tool.
-   Guest dapat menggunakan converter.
-   Login hanya diperlukan untuk history.
-   Drag & Drop selalu tersedia.
-   Tampilkan progress saat upload dan processing.
-   Error harus mudah dipahami.
-   Fokus pada kecepatan dan kesederhanaan.

------------------------------------------------------------------------

# 13. Accessibility

-   Kontras warna minimal WCAG AA.
-   Keyboard navigation.
-   Visible focus state.
-   Alt text untuk ikon penting.
-   Target sentuh minimal 44×44 px.

------------------------------------------------------------------------

# 14. Iconography

Gunakan Lucide React.

Style: - Outline - 2px stroke - Rounded

------------------------------------------------------------------------

# 15. Motion

Transition: 150--250ms

Gunakan animasi ringan: - Fade - Scale - Slide

Hindari animasi berlebihan.

------------------------------------------------------------------------

# 16. Tailwind Design Tokens

Primary: #7132F5

Text: #101114

Background: #F8F9FC

Border: #DEDEE5

Radius: rounded-xl

Shadow: shadow-lg (custom disarankan)

------------------------------------------------------------------------

# 17. Design Principles

-   Konsisten.
-   Minimalis.
-   Cepat dipahami.
-   Tidak menggunakan elemen dekoratif berlebihan.
-   Mengutamakan keterbacaan dibanding ornamen.
-   Semua komponen harus reusable.

End of DESIGN.md
