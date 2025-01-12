import { Blogs } from '@/components/blogs';
import { Categories } from '@/components/categories';
import { CreateBlog } from '@/components/create-blog';
import axios from 'axios';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blogs',
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const category = (await searchParams)?.category as string | undefined;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`,
  );
  if (!data.data.success) {
    return null;
  }

  return (
    <main className='max-w-6xl mx-auto px-8 py-6'>
      <CreateBlog categories={data.data.categories} />
      <Categories
        categories={data.data.categories}
        activeCategory={category ? category : data.data.categories[0]._id}
      />
      <Blogs category={category ? category : data.data.categories[0]._id} />
    </main>
  );
}
