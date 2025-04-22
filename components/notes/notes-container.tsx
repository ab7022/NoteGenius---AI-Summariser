'use client';

import { useState } from 'react';
import { useNotes, Note } from '@/hooks/use-notes';
import { NoteCard } from './note-card';
import { NoteForm } from './note-form';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';

export function NotesContainer() {
  const { notes, isLoading, createNote, updateNote, deleteNote } = useNotes();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setIsEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteNote(deleteId);
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-9"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-4/5"></div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <div className="h-8 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <EmptyState
            title="No notes yet"
            description="Create your first note to get started."
            action={
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create note
              </Button>
            }
          />
        ) : filteredNotes.length === 0 ? (
          <EmptyState
            title="No matching notes"
            description="No notes match your search. Try a different search term."
            action={
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear search
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <NoteForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={createNote}
        mode="create"
      />

      <NoteForm
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={(data) => {
          if (selectedNote) {
            updateNote({ id: selectedNote.id, ...data });
          }
        }}
        note={selectedNote || undefined}
        mode="edit"
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}