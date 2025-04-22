# AI-Powered Notes App

A sleek, modern notes application with AI-powered summarization capabilities. Built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Supabase.

**Live Demo:** [https://note-genius-ai.vercel.app/](https://note-genius-ai.vercel.app/)  
**Frontend GitHub:** [https://github.com/ab7022/NoteGenius---AI-Summariser](https://github.com/ab7022/NoteGenius---AI-Summariser)  
**Backend GitHub:** [https://github.com/ab7022/Notes-genius-BE](https://github.com/ab7022/Notes-genius-BE)

Watch a demonstration of the app's features: [Live Demo Video](https://drive.google.com/file/d/1ulmVXWfsIdRdWjGSt9Yp0To5syW_IxBf/view?usp=drive_link)

*Note: The frontend is hosted on Vercel and the backend on Heroku. This split deployment strategy is necessary because Vercel only supports a 10-second API timeout, which is insufficient for AI API calls.*

## 🌟 Features

- **User Authentication**
  - Email/password login
  - Google OAuth integration
  - Secure session management
  
- **Note Management**
  - Create, edit, and delete notes
  - Rich text formatting
  - Real-time saving
  
- **AI Capabilities**
  - Automatic note summarization
  - Key points extraction
  - Content suggestions
  
- **User Experience**
  - Light and dark mode themes
  - Fully responsive design (mobile, tablet, desktop)
  
- **Performance**
  - Real-time updates with React Query
  - Optimistic UI updates
  - Efficient data caching

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables theme system
- **UI Components**: Shadcn UI
- **State Management**: React Query for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend & Infrastructure
- **Backend as a Service**: Supabase
  - PostgreSQL database
  - Authentication
  - Storage for media files
  - Row-level security
- **AI Integration**: DeepSeek API for note summarization
- **Deployment**: Vercel for frontend, Heroku for backend

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

You'll also need accounts with:
- [Supabase](https://supabase.com/)
- [DeepSeek](https://deepseek.ai/) (for API access)

## 🚀 Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ab7022/NoteGenius---AI-Summariser.git
   cd NoteGenius---AI-Summariser
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase and DeepSeek API credentials

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# DeepSeek AI
DEEPSEEK_API_KEY=your_deepseek_api_key

# Next Auth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🗃️ Setting Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the SQL migrations in the Supabase SQL editor:
   ```sql
   -- Copy the contents of supabase/migrations/*.sql files here
   ```

3. Set up authentication:
   - Enable Email/Password sign-in
   - Configure Google OAuth provider (optional)

4. Copy your Supabase URL and anon key to your `.env.local` file

## 🚢 Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Connect your repository to [Vercel](https://vercel.com):
   - Create a new project
   - Import your repository
   - Configure environment variables
   - Deploy

3. Set up environment variables in the Vercel dashboard:
   - Add all variables from your `.env.local` file

### Deploying the Backend to Heroku

1. Push your backend code to a separate GitHub repository

2. Connect your repository to [Heroku](https://heroku.com):
   - Create a new app
   - Connect to your GitHub repository
   - Configure environment variables
   - Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎥 Demo Video

Watch a demonstration of the app's features: [Live Demo Video](https://drive.google.com/file/d/1ulmVXWfsIdRdWjGSt9Yp0To5syW_IxBf/view?usp=drive_link)

## 📧 Contact

Project Lead - [bayees1@gmail.com](mailto:bayees1@gmail.com)

---

Made with ❤️ by [Abdul Bayees]
