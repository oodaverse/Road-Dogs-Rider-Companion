# Road-Dogs: Rider Companion

A professional Next.js website for collecting information from people interested in riding alongside truck drivers on their routes across the US.

## Features

- **Professional Landing Page** - Engaging hero section, features, and process overview
- **Multi-Step Application Form** - Comprehensive 5-step form with validation
- **Background Eligibility Checks** - Thorough screening questions
- **Document Upload** - Support for ID, health insurance, and liability insurance documents
- **Conduct Acknowledgment** - Legal protections with digital signature
- **Admin Panel** - View, filter, and manage all applications
- **Modern UI** - Polished design with Framer Motion animations
- **Fully Responsive** - Works on all device sizes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for documents

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account

### Installation

1. Install dependencies: `npm install`
2. Set up Supabase:
   - Create a new project at supabase.com
   - Run the schema from supabase-schema.sql
   - Create a storage bucket named rider-documents
3. Update .env.local with your Supabase credentials
4. Run: `npm run dev`
5. Open http://localhost:3000

## Pages

- **/** - Landing page
- **/apply** - Multi-step application form
- **/admin** - Admin panel (login: admin / roaddogs2024)

## Application Sections

1. Personal Information (Name, DOB, Address, Emergency Contact)
2. Background Eligibility (Legal, Medical, Physical)
3. Experience & Purpose (Motivation, Travel Experience)
4. Conduct & Expectations (Professional Guidelines, Signature)
5. Insurance Requirements (Health + Liability Insurance)

---

**Road-Dogs: Rider Companion** - Making the open road a little less lonely.
