# SCHEMA.md

# Student Toolkit V1 Database Schema (Final)

Version: 1.0

------------------------------------------------------------------------

# Database

Engine: MySQL 8+

Charset: utf8mb4

Collation: utf8mb4_unicode_ci

Soft Deletes: - users - files - ai_histories

------------------------------------------------------------------------

# Entity Relationship

users ├── files ├── ai_histories └── transcriptions

ai_histories └── quizzes

------------------------------------------------------------------------

# users

  Field               Type           Constraint
  ------------------- -------------- -------------
  id                  BIGINT         PK
  name                VARCHAR(100)   NOT NULL
  email               VARCHAR(150)   UNIQUE
  email_verified_at   TIMESTAMP      NULL
  password            VARCHAR(255)   NOT NULL
  avatar              VARCHAR(255)   NULL
  remember_token      VARCHAR(100)   NULL
  created_at          TIMESTAMP      
  updated_at          TIMESTAMP      
  deleted_at          TIMESTAMP      Soft Delete

Indexes - PK(id) - UNIQUE(email)

------------------------------------------------------------------------

# files

Semua file upload disimpan pada tabel ini.

  --------------------------------------------------------------------------------------------------------------------------------------------
  Field                               Type
  ----------------------------------- --------------------------------------------------------------------------------------------------------
  id                                  BIGINT PK

  user_id                             BIGINT FK users.id

  tool_type                           ENUM(pdf_to_word,word_to_pdf,merge_pdf,split_pdf,compress_pdf,image_to_pdf,pdf_to_image,audio_to_text)

  original_name                       VARCHAR(255)

  stored_name                         VARCHAR(255)

  mime_type                           VARCHAR(100)

  extension                           VARCHAR(20)

  size                                BIGINT

  storage_path                        VARCHAR(255)

  output_path                         VARCHAR(255)

  status                              ENUM(uploaded,processing,completed,failed)

  processing_time_ms                  INT

  created_at                          TIMESTAMP

  updated_at                          TIMESTAMP

  deleted_at                          TIMESTAMP
  --------------------------------------------------------------------------------------------------------------------------------------------

Indexes - user_id - tool_type - status - created_at

------------------------------------------------------------------------

# ai_histories

  Field         Type
  ------------- --------------------
  id            BIGINT PK
  user_id       BIGINT FK
  type          ENUM(summary,quiz)
  input_text    LONGTEXT
  output_text   LONGTEXT
  created_at    TIMESTAMP
  updated_at    TIMESTAMP
  deleted_at    TIMESTAMP

Indexes - user_id - type

------------------------------------------------------------------------

# quizzes

  Field           Type
  --------------- --------------
  id              BIGINT PK
  ai_history_id   BIGINT FK
  title           VARCHAR(255)
  content         LONGTEXT
  created_at      TIMESTAMP
  updated_at      TIMESTAMP

------------------------------------------------------------------------

# transcriptions

  Field              Type
  ------------------ --------------------
  id                 BIGINT PK
  user_id            BIGINT FK
  file_id            BIGINT FK files.id
  language           VARCHAR(10)
  duration_seconds   INT
  transcript         LONGTEXT
  created_at         TIMESTAMP
  updated_at         TIMESTAMP

------------------------------------------------------------------------

# Relationships

users (1) ----- (N) files

users (1) ----- (N) ai_histories

users (1) ----- (N) transcriptions

files (1) ----- (1) transcriptions

ai_histories (1) ----- (N) quizzes

------------------------------------------------------------------------

# Folder Storage

storage/app/private/uploads

-   pdf/
-   word/
-   image/
-   audio/
-   output/

------------------------------------------------------------------------

# Naming Convention

Primary Key - id

Foreign Key - user_id - file_id - ai_history_id

Tables - snake_case - plural

------------------------------------------------------------------------

# Laravel Models

-   User
-   File
-   AIHistory
-   Quiz
-   Transcription

------------------------------------------------------------------------

# Planned Future Tables (V2)

-   notes
-   flashcards
-   chat_sessions
-   ocr_results
-   subscriptions
-   api_logs
-   notifications

End of Schema.