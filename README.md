# Apollo247 Doctors Listing Clone - Next.js

## 📝 Overview

This project is a clone of the Apollo247 General Physicians listing page, built using **Next.js**. It features doctor listings with filters and pagination, backed by a MongoDB-powered API.

---

## 🚀 Features

- **Doctor Listing Page** – Displays doctors with details like name, specialization, experience, and more
- **Functional Filters** – Filter doctors based on experience, fees, language, and location
- **Pagination** – Supports large datasets with numbered pages and navigation buttons
- **SEO Optimized** – Includes meta tags and structured data for better search visibility
- **Responsive Design** – Mobile-friendly layout optimized for all screen sizes

## 🛠️ Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | Next.js 14, TypeScript, Tailwind CSS |
| Backend    | Next.js API Routes                   |
| Database   | MongoDB (NoSQL)                      |
| Deployment | Vercel (Recommended)                 |

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js (v18 or later)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/apollo247-clone.git
   cd apollo247-clone
   ```

src
├── app/
│ ├── api/
│ │ ├── doctor/
│ │ │ └── route.ts # Doctor API handler
│ │ ├── health/
│ │ │ └── route.ts # Health check endpoint
│ │ └
│ │ └── route.ts # Test endpoint
│ ├── components/
│ │ ├── DoctorsPage.tsx # Main doctors listing component
│ │ └── Navbar.tsx # Top navigation bar
│ ├── globals.css # Global CSS (Tailwind base)
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── lib/
│ └── dbConnect.ts # MongoDB connection utility
└── models/
└── Doctor.ts # Doctor mongoose schema
