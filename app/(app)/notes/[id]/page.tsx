'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-supabase';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, formatTime } from '@/lib/utils/format';
import { Loader2, ArrowLeft, Edit, Sparkles } from 'lucide-react';
import { NoteForm } from '@/components/notes/note-form';
import { Note } from '@/hooks/use-notes';
import { useSummarize } from '@/hooks/use-summarize';
import { Separator } from '@/components/ui/separator';

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const { supabase, session, loading } = useSession();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { summarizeNote, isSummarizing } = useSummarize();
  const id = params.id as string;

  useEffect(() => {
    if (!session?.user) return;

    const fetchNote = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', id)
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          throw error;
        }

        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error);
        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, supabase, session, router]);

  const handleUpdate = async (data: { title: string; content: string }) => {
    if (!session?.user || !note) return;

    try {
      const { error } = await supabase
        .from('notes')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) {
        throw error;
      }

      setNote({
        ...note,
        ...data,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleSummarize = () => {
    if (note) {
      summarizeNote(
        { id: note.id, content: note.content },
        {
          onSuccess: (updatedNote) => {
            setNote(updatedNote);
          },
        }
      );
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 py-24 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Note not found</h1>
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-24">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit note
            </Button>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{note.title}</CardTitle>
              <CardDescription>
                Created on {formatDate(note.created_at)} at {formatTime(note.created_at)}
                {note.created_at !== note.updated_at && 
                  ` · Last edited on ${formatDate(note.updated_at)} at ${formatTime(note.updated_at)}`}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{note.content}</div>
            </div>

            {note.summary && (
              <div className="mt-8">
                <Separator className="my-6" />
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    <h3 className="font-medium">AI Summary</h3>
                  </div>
                  <p>{note.summary}</p>
                </div>
              </div>
            )}
          </CardContent>
          {/* {!note.summary && ( */}
            <CardFooter>
              <Button variant="outline" onClick={handleSummarize} disabled={isSummarizing} className="ml-auto">
                {isSummarizing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Summary
                  </>
                )}
              </Button>
            </CardFooter>
          {/* )} */}
        </Card>

        <NoteForm
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSubmit={handleUpdate}
          note={note}
          mode="edit"
        />
      </main>
    </div>
  );
}