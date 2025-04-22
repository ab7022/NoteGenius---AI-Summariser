'use client';

import { NotesContainer } from '@/components/notes/notes-container';
import { Navbar } from '@/components/layout/navbar';
import { useSession } from '@/hooks/use-supabase';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { session, loading } = useSession();

  // Redirect to login if not authenticated
  if (!loading && !session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-24">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
              <p className="text-muted-foreground mt-2">
                Create, edit, and organize your notes. Use AI to summarize lengthy content.
              </p>
            </div>
            <NotesContainer />
          </>
        )}
      </main>
    </div>
  );
}