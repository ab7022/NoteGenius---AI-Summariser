'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Note } from '@/hooks/use-notes';
import { useSummarize } from '@/hooks/use-summarize';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { formatRelativeTime, truncateText } from '@/lib/utils/format';
import { Edit, Trash2, ZoomIn, Sparkles, Loader2 } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [localNote, setLocalNote] = useState(note);
  const [isExpanded, setIsExpanded] = useState(false);
  const { summarizeNote, isSummarizing } = useSummarize();
  const router = useRouter();

  const handleSummarize = () => {
    summarizeNote(
      { id: localNote.id, content: localNote.content },
      {
        onSuccess: (updatedNote) => {
          setLocalNote(updatedNote);
        },
      }
    );
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold line-clamp-1 mr-6">
            {localNote.title}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(localNote)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(localNote.id)}
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Last updated {formatRelativeTime(localNote.updated_at)}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <div className="text-sm whitespace-pre-wrap">
          {isExpanded ? localNote.content : truncateText(localNote.content, 150)}
        </div>

        {localNote.content.length > 150 && (
          <Button
            variant="link"
            className="px-0 text-xs h-auto mt-1"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        )}

        <AnimatePresence mode="wait">
          {localNote.summary && (
            <motion.div
              key={localNote.summary}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-3 bg-secondary/50 rounded-md"
            >
              <div className="flex items-center mb-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="mr-1 h-3 w-3" />
                AI SUMMARY
              </div>
              <p className="text-sm">{localNote.summary}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-secondary/20 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => router.push(`/notes/${localNote.id}`)}
        >
          <ZoomIn className="mr-1 h-3 w-3" />
          View full note
        </Button>

        <Button
          variant="default"
          size="sm"
          className="text-xs"
          onClick={handleSummarize}
          disabled={isSummarizing}
        >
          {isSummarizing ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="mr-1 h-3 w-3" />
              AI Summarize
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
