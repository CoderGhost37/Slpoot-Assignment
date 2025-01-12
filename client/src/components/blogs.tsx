import { cn } from '@/lib/utils';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  imgUrl: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export async function Blogs({ category }: { category: string }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${category}`,
  );

  if (!data.data.success) {
    return null;
  }

  return (
    <section className='py-12'>
      {data.data.blogs.length > 0 ? (
        <div className=''>
          {data.data.blogs.map((blog: Blog) => (
            <div className='relative w-full md:flex'>
              <Image
                className={cn(
                  'flex-none rounded-t object-cover md:rounded-l md:rounded-t-none',
                  'aspect-video w-full md:max-w-[300px]',
                )}
                src={blog.imgUrl}
                alt={blog.title}
                width={100}
                height={100}
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />

              <div className='flex w-full flex-col justify-between rounded-b border-b border-l border-r bg-white p-6 leading-normal md:rounded-b-none md:rounded-r md:border-l-0 md:border-t'>
                <div className='mb-8 space-y-5'>
                  <p className='mb-2 font-heading text-2xl font-bold text-black'>
                    {blog.title}
                  </p>
                </div>
              </div>

              <Link
                href={`/blogs/${blog._id}`}
                target='_blank'
                className='absolute inset-0'
              />
            </div>
          ))}
        </div>
      ) : (
        <h1 className='text-2xl text-center'>No blogs found</h1>
      )}
    </section>
  );
}
