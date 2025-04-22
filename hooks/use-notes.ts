'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from './use-supabase';
import { useToast } from '@/hooks/use-toast';

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  summary: string | null;
};

export type NoteInput = {
  title: string;
  content: string;
};

export function useNotes() {
  const { session, supabase } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const fetchNotes = async (): Promise<Note[]> => {
    if (!userId) return [];

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error fetching notes',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    return data || [];
  };

  const createNote = async (note: NoteInput): Promise<Note> => {
    if (!userId) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('notes')
      .insert([{ ...note, user_id: userId }])
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error creating note',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    return data;
  };

  const updateNote = async ({ id, ...note }: Partial<Note> & { id: string }): Promise<Note> => {
    if (!userId) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('notes')
      .update({ ...note, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error updating note',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    return data;
  };

  const deleteNote = async (id: string): Promise<void> => {
    if (!userId) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      toast({
        title: 'Error deleting note',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const notesQuery = useQuery({
    queryKey: ['notes', userId],
    queryFn: fetchNotes,
    enabled: !!userId,
  });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
      toast({
        title: 'Note created',
        description: 'Your note has been created successfully.',
      });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
      toast({
        title: 'Note updated',
        description: 'Your note has been updated successfully.',
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', userId] });
      toast({
        title: 'Note deleted',
        description: 'Your note has been deleted successfully.',
      });
    },
  });

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    error: notesQuery.error,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
  };
}