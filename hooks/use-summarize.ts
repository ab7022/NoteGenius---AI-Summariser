'use client';

import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useSession } from './use-supabase';
import { Note } from './use-notes';

export function useSummarize() {
  const { toast } = useToast();
  const { supabase, session } = useSession();
  const userId = session?.user?.id;

  const summarizeNote = async ({ id, content }: { id: string; content: string }): Promise<Note> => {
    if (!userId) throw new Error('User not authenticated');
    
    try {
      // Call the AI summarization API
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to summarize note');
      }

      const { summary } = await response.json();

      // Update the note in the database with the summary
      const { data, error } = await supabase
        .from('notes')
        .update({ summary })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Error summarizing note:', error);
      throw error;
    }
  };

  const summarizeMutation = useMutation({
    mutationFn: summarizeNote,
    onSuccess: () => {
      toast({
        title: 'Note summarized',
        description: 'Your note has been summarized successfully.',
      });
    },
    
    onError: (error: Error) => {
      toast({
        title: 'Error summarizing note',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    summarizeNote: summarizeMutation.mutate,
    isSummarizing: summarizeMutation.isPending,
  };
}