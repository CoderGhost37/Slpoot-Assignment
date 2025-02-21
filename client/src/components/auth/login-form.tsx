'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useAuthStore } from '@/hooks/use-auth';
import { loginSchema } from '@/schema/login';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      startTransition(async () => {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
            values,
          );

          if (data.data.success) {
            toast.success(data.data.message);
            document.cookie = `authToken=${data.data.token}; path=/; max-age=3600`;
            login(data.data.token);
            form.reset();
            router.push('/blogs');
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
    <Card className='mx-auto grid w-[350px] gap-6'>
      <CardHeader>
        <CardTitle className='text-center text-3xl font-bold'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=''>
              <Button type='submit' loading={isPending} className='w-full'>
                Login
              </Button>

              <div className='mt-2 flex items-center justify-center gap-1 text-sm'>
                Don't have an account?{' '}
                <Link
                  href='/register'
                  className='text-blue-500 hover:underline'
                >
                  Create your account
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
