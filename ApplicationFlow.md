# Student Toolkit
# Application Flow
Version: 1.0

---

# PURPOSE

This document defines how the application should behave from the perspective of:

- Guest
- Authenticated User
- Administrator

This document defines navigation, access control, and expected behavior.

This document has higher priority than feature implementation.

Never invent new flows that contradict this document.

---

# USER ROLES

There are only three roles.

1. Guest

Unauthenticated visitor.

Can browse the website.

Can use limited tools.

Cannot access personal workspace.

---

2. User

Authenticated account.

Can access all personal features.

Owns files and history.

---

3. Administrator

Can manage the platform.

Cannot use Admin Dashboard as a replacement for User Dashboard.

Admin and User dashboards are completely different.

---

# APPLICATION ENTRY

When opening

https://studenttoolkit.com

Users ALWAYS see

Landing Page

Never redirect guests directly to Login.

Landing Page is the application's homepage.

---

# LANDING PAGE

Purpose

Introduce Student Toolkit.

Explain benefits.

Provide SEO value.

Convert visitors into users.

Landing Page contains

Navigation Bar

Hero Section

Features

Popular Tools

Pricing

FAQ

Footer

CTA buttons

Try Free

Login

Register

---

# GUEST FLOW

Guest can browse

Landing Page

↓

Read Features

↓

Choose Tool

↓

Upload File

↓

Process File

↓

Download Result

↓

Leave Website

Guest DOES NOT have

Dashboard

History

Workspace

Saved Files

Cloud Storage

Unlimited AI

Subscription

---

# GUEST TOOL LIMITS

Guests may use

PDF Tools

Image Tools

Limited AI Requests

Rate limits may apply.

If guest reaches usage limit

Show

Create your free account
to continue.

Buttons

Login

Register

Never force login before trying the product.

---

# AUTHENTICATION FLOW

Users may authenticate using

Email & Password

Google OAuth

Authentication Flow

Landing Page

↓

Login/Register

↓

Authentication

↓

Dashboard

---

# USER DASHBOARD

After successful login

Always redirect to

Dashboard

Dashboard is the user's workspace.

Dashboard should never look like an analytics dashboard.

Purpose

Quick access to tools.

Recent activities.

Storage usage.

History.

AI shortcuts.

Quick actions.

Dashboard sections

Welcome

Quick Tools

AI Tools

Recent Files

History

Storage

Account Summary

---

# USER TOOL FLOW

Example

Dashboard

↓

Choose Tool

↓

Upload File

↓

Preview

↓

Configure Options

↓

Process

↓

Progress

↓

Result

↓

Download

↓

Save History

↓

Return to Dashboard

This flow applies to all tools.

---

# DOCUMENT TOOL FLOW

Supported tools

PDF to Word

Word to PDF

Merge PDF

Split PDF

Compress PDF

Image to PDF

PDF to Image

Every tool follows

Upload

↓

Validation

↓

Preview

↓

Options

↓

Process

↓

Progress

↓

Download

↓

History

Never skip preview when applicable.

---

# AI TOOL FLOW

Supported

Audio to Text

AI Summary

Quiz Generator

Flow

Upload

↓

Configure

↓

Generate

↓

Preview

↓

Copy

↓

Download

↓

Save History

---

# HISTORY FLOW

History stores

Tool Used

Date

File Name

Processing Status

Download Status

History supports

Search

Filter

Pagination

Delete History

History belongs only to the authenticated user.

---

# PROFILE FLOW

User Menu

↓

Profile

User may

Update Profile

Upload Avatar

Remove Avatar

Change Password

Delete Account

Manage Security

---

# SETTINGS FLOW

Users may configure

Profile

Password

Language

Notifications (future)

Appearance (future)

Subscription (future)

---

# USER NAVIGATION

Navbar

Logo

Tools

Pricing

FAQ

Dashboard (authenticated)

Profile

Logout

Footer

About

Privacy Policy

Terms

Contact

---

# ADMIN FLOW

Administrator logs in

↓

Admin Dashboard

Admin Dashboard is completely separate.

Never reuse User Dashboard.

Admin URL

/admin

---

# ADMIN DASHBOARD

Purpose

Monitor platform health.

Manage users.

Manage system.

Dashboard widgets

Total Users

Today's Conversions

AI Requests

Storage Usage

Revenue (future)

Server Status

Recent Activities

---

# ADMIN NAVIGATION

Dashboard

Users

Tools

AI Jobs

Conversion Jobs

Subscriptions

Reports

Logs

Settings

---

# ADMIN USER MANAGEMENT

Administrator can

View User

Suspend User

Restore User

Delete User

Search User

Filter User

View Storage Usage

View Login Provider

Administrator must NEVER access user passwords.

---

# ADMIN DOCUMENT MANAGEMENT

View

Running Jobs

Completed Jobs

Failed Jobs

Retry Failed Jobs

System Queue

Logs

---

# ADMIN AI MANAGEMENT

View

AI Requests

Token Usage

Model Used

Cost

Errors

Rate Limits

---

# ADMIN REPORTS

Daily Users

Monthly Users

Tool Usage

AI Usage

Conversion Statistics

Downloads

Revenue

---

# AUTHORIZATION RULES

Guest

Cannot access Dashboard

Cannot access History

Cannot access Profile

Cannot access Settings

Cannot access Admin

User

Cannot access Admin

Admin

Cannot access User Dashboard through admin routes.

Admin may still have a personal user account.

---

# REDIRECT RULES

Guest visits Dashboard

↓

Redirect Login

User visits Admin

↓

403 Forbidden

Admin visits User Dashboard

↓

Allowed only through normal user routes.

Admin Dashboard remains separate.

---

# FILE OWNERSHIP

Every uploaded file belongs to exactly one user.

Guest uploads are temporary.

Temporary files should expire automatically.

Authenticated uploads are stored in user history.

---

# FUTURE FEATURES

Reserved

Workspace

Teams

Shared Files

Notifications

Premium Plans

API Access

These features should not affect the current flow.

---

# DEVELOPMENT RULES

Never create pages outside this flow.

Never invent new navigation.

Never merge User Dashboard and Admin Dashboard.

Never force login before users try the product.

Keep Guest experience simple.

Keep User experience productivity-focused.

Keep Admin experience operational.

Always follow this document before implementing features.