📋 Missing Components for API-First MVP
2. Complete Missing Component List:

A. UI Components (Essential)
Toast/Notification System ⭐ HIGH PRIORITY
Success/error/info/warning toasts
For API response feedback
Recommendation: sonner or shadcn toast
Loading/Spinner States ⭐ HIGH PRIORITY
Global loading overlay
Inline spinners for forms/tables
Skeleton loaders (you have basic skeleton)
Error Boundary Component
Catch runtime errors gracefully
Show friendly error UI
Empty State Component
For empty tables/lists
"No data found" illustrations
Confirmation Dialog ⭐ MEDIUM PRIORITY
Replace window.confirm() with modal
For delete/destructive actions
Pagination Component ⭐ HIGH PRIORITY
For DataTable
Page numbers, next/prev buttons
Items per page selector
Filter Panel/Drawer
Advanced filtering for tables
Date ranges, multi-select filters
Breadcrumbs Enhancement
You have basic breadcrumb
Need auto-generation from routes
B. Form Builder Enhancements
Repeater/Array Field ⭐ MEDIUM PRIORITY
For dynamic lists (like Filament's Repeater)
Add/remove items
Example: Multiple phone numbers
Color Picker
Input for hex/rgb colors
Visual color selector
Number Input with Stepper
+/- buttons
Better than basic numeric input
Radio Group
Alternative to Select
Visual radio buttons
Image Preview/Cropper
Enhance FileUpload
Show preview thumbnails
Optional crop functionality
Relationship/Autocomplete Field ⭐ HIGH PRIORITY
Select from API data
Search/filter remote data
Like Filament's Select::relationship()
Hidden Field
Store hidden values in forms
C. DataTable Enhancements
Bulk Actions ⭐ MEDIUM PRIORITY
Delete selected
Export selected
Custom bulk operations
Column Visibility Toggle
Show/hide columns
Save preferences
Advanced Sorting
Multi-column sorting
Sort direction indicators
Export Functionality
CSV/Excel export
PDF export (optional)
Column Resizing
Draggable column widths
Persist widths to localStorage
D. Layout Components
Page Header Component
Reusable page title + actions
Breadcrumbs integration
Stats/Metrics Cards
Dashboard KPI cards
With icons, trends, sparklines
Action Bar
Sticky action buttons
For forms (Save/Cancel/etc)
Modal/Slide-over Forms ⭐ MEDIUM PRIORITY
Edit records in modal
Alternative to full-page forms
E. Utilities & Hooks
useApi Hook ⭐ HIGH PRIORITY
Generic API fetcher
With loading/error states
Like useSWR or react-query
useDebounce Hook
For search inputs
Reduce API calls
usePagination Hook
Manage pagination state
Sync with URL params
useTable Hook ⭐ HIGH PRIORITY
Combine sorting/filtering/pagination
Single hook for all table state
API Client/Service Layer
Centralized fetch wrapper
Error handling
Request/response interceptors
Form Validation with Zod ⭐ MEDIUM PRIORITY
Replace inline validation
Schema-based validation
Better TypeScript integration
F. Navigation & UX
Global Search (Optional)
Command palette (Cmd+K)
Search across resources
User Profile Dropdown
Currently shows logout
Add profile link, settings
Theme Switcher
Light/dark mode toggle
You have next-themes installed
Notification Badge
For sidebar notifications
Unread counts


🎯 Priority Tiers for MVP
Tier 1: Must-Have (Build First) 🔴
Toast/Notification System
Loading States
Pagination Component
useApi/useTable Hooks
Relationship/Autocomplete Field
Confirmation Dialog
API Service Layer

Tier 2: Should-Have (Nice for MVP) 🟡
Repeater/Array Field
Bulk Actions
Modal Forms
Form Validation (Zod)
Empty States
Stats Cards
Column Visibility

Tier 3: Could-Have (Post-MVP) 🟢
Export functionality
Global search
Color picker
Image cropper
Column resizing
Advanced filters
Theme switcher UI

📦 Recommended Packages to Add
{
  "dependencies": {
    "sonner": "^1.7.1",              // Toast notifications
    "zod": "^3.24.1",                 // Form validation
    "react-hook-form": "^7.54.2",    // Optional: Better form handling
    "@tanstack/react-query": "^5.62.11", // API state management
    "cmdk": "^1.0.4",                 // Command palette (optional)
    "react-dropzone": "^14.3.5"      // Better file uploads
  }
}