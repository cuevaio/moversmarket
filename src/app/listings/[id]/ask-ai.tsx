'use client';

import { useParams } from 'next/navigation';

import { useChat } from 'ai/react';
import { SparklesIcon, User2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

export const AskAI = () => {
  const { id } = useParams<{ id: string }>();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { id },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          Ask AI
          <SparklesIcon className="ml-2 size-4 text-yellow-300" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Ask AI
            <SparklesIcon className="ml-2 inline size-4 text-yellow-300" />
          </DialogTitle>
          <DialogDescription>
            MoversMarket AI knows everything of this listing and more.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-2">
            <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-foreground text-yellow-300">
              <SparklesIcon className="size-4" />
            </div>
            <p className="text-balance text-sm">How can I help you today?</p>
          </div>
          {messages.map((m) => (
            <div key={m.id} className="flex gap-2">
              {m.role === 'user' ? (
                <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-foreground text-background">
                  <User2Icon className="size-4" />
                </div>
              ) : (
                <div className="flex size-8 flex-none items-center justify-center rounded-lg bg-foreground text-yellow-300">
                  <SparklesIcon className="size-4" />
                </div>
              )}
              <p
                className={cn('whitespace-pre-wrap text-balance text-sm', {
                  'font-semibold': m.role === 'user',
                })}
              >
                {m.content}
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              className="w-full rounded border border-gray-300 p-2 shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
