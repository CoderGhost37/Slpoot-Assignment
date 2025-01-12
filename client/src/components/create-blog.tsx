'use client';

import { PlusCircle } from 'lucide-react';
import React from 'react';

import { CreateBlogForm } from '@/components/create-blog-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useAuthStore } from '@/hooks/use-auth';

interface CreateBlogProps {
  categories: {
    _id: string;
    name: string;
    imgUrl: string;
  }[];
}

export function CreateBlog({ categories }: CreateBlogProps) {
  const { user } = useAuthStore();
  const [open, setOpen] = React.useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className='max-w-6xl mx-auto mb-4 px-4'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle size={18} />
            <span className='ml-2'>Create Blog</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='h-[90vh] overflow-hidden overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Create Blog</DialogTitle>
          </DialogHeader>
          <CreateBlogForm
            onClose={() => setOpen(false)}
            userId={user.id}
            categories={categories}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
