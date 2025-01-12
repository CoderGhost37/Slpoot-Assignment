'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '@/lib/uploadthing';
import { blogSchema } from '@/schema/blog';
import { revalidatePath } from 'next/cache';

interface CreateBlogProps {
  onClose: () => void;
  userId: string;
  categories: {
    _id: string;
    name: string;
    imgUrl: string;
  }[];
}

export function CreateBlogForm({
  onClose,
  userId,
  categories,
}: CreateBlogProps) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      description: '',
      imgUrl: '',
      category: '',
      userId: userId,
    },
  });

  function onSubmit(values: z.infer<typeof blogSchema>) {
    startTransition(() => {
      startTransition(async () => {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/create`,
            values,
          );

          if (data.data.success) {
            toast.success(data.data.message);
            form.reset();
            onClose();
            revalidatePath('/blogs');
          } else {
            toast.error(data.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Description' rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='imgUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className='relative'>
                    <Image
                      src={field.value}
                      alt='Blog Image'
                      width={200}
                      height={200}
                      className='object-cover w-full'
                    />
                    <Button
                      onClick={() => field.onChange('')}
                      className='absolute -top-2 -right-2 rounded-full px-2.5 py-0'
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <UploadButton
                    endpoint='blogImage'
                    appearance={{
                      button: 'w-full cursor-pointer bg-blue-500 border',
                      allowedContent: 'hidden',
                    }}
                    onClientUploadComplete={(res) => {
                      field.onChange(res[0].url);
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' loading={isPending} className='w-full'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
