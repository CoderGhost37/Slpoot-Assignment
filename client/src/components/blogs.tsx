import axios from 'axios';
import { MoveRight } from 'lucide-react';
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
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
          {data.data.blogs.map((blog: Blog) => (
            <Link
              href={`/blogs/${blog._id}`}
              className='group z-1 rounded flex cursor-pointer flex-col bg-gray-200 transition-all hover:bg-gray-100'
            >
              <div className='aspect-video overflow-hidden rounded-t'>
                <Image
                  src={blog.imgUrl}
                  alt={blog.title}
                  width={2669}
                  height={1782}
                  loading='lazy'
                  className='transition-transform group-hover:scale-105'
                />
              </div>

              <div className='flex-1 px-4 pb-6 pt-4'>
                <h3 className='animated-underline group-hover:animated-underline-start font-heading text-2xl font-normal '>
                  {blog.title}
                </h3>

                <p className='text-gray-600'>{blog.author.email}</p>
              </div>

              <div className='flex flex-shrink-0 items-end px-4 py-4'>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center justify-center rounded-full bg-gray-500 p-2 group-hover:bg-gray-900'>
                    <MoveRight className='h-3 w-3 text-white' />
                  </div>
                  <span className='font-medium'>Read more</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className='text-2xl text-center'>No blogs found</h1>
      )}
    </section>
  );
}
