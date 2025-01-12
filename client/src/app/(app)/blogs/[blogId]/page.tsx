import { Button } from '@/components/ui/button';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ blogId: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const blogId = (await params).blogId;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${blogId}/name`,
  );

  if (!data.data.success) {
    return {};
  }

  return {
    title: data.data.blog.title,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const blogId = (await params).blogId;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${blogId}`,
  );
  if (!data.data.success) {
    return (
      <main className='max-w-4xl mx-auto px-8 py-12'>
        <p>Blog not found</p>
      </main>
    );
  }

  const blog = data.data.blog;
  return (
    <main className='max-w-4xl mx-auto px-8 py-6'>
      <Link href='/blogs'>
        <Button variant='outline' className='mb-4'>
          <ChevronLeft />
          <span className='ml-2'>Back</span>
        </Button>
      </Link>

      <Image
        src={blog.imgUrl}
        alt={blog.title}
        width={800}
        height={400}
        className='rounded w-full max-w-2xl mx-auto h-auto object-cover'
      />

      <h1 className='text-2xl md:text-4xl text-center font-bold mt-8'>
        {blog.title}
      </h1>
      <p className='text-gray-600 text-sm md:text-base text-center mt-2'>
        <span className='font-semibold'>Author: </span>
        {blog.author.name} ({blog.author.email})
      </p>
      <p className='text-gray-600 text-sm md:text-base text-center'>
        Published {formatDistance(blog.createdAt, new Date())} ago
      </p>

      <p className='mt-8'>{blog.description}</p>
    </main>
  );
}
