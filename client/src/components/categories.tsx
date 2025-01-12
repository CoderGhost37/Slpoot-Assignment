import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface CategoriesProps {
  activeCategory: string;
  categories: {
    _id: string;
    name: string;
    imgUrl: string;
  }[];
}

export function Categories({ activeCategory, categories }: CategoriesProps) {
  return (
    <div className='flex items-center justify-center gap-8'>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/blogs?category=${category.name.toLowerCase()}`}
          className={cn(
            'relative flex flex-col items-center gap-1.5',
            activeCategory === category.name.toLowerCase()
              ? 'text-black'
              : 'text-gray-600',
          )}
        >
          <Image
            src={category.imgUrl}
            alt={category.name}
            width={100}
            height={100}
            className='w-6 h-6 object-cover'
          />
          <span className='text-sm'>{category.name}</span>
          {activeCategory === category.name.toLowerCase() && (
            <div className='absolute bottom-0 h-[2px] w-full bg-black mt-2' />
          )}
        </Link>
      ))}
    </div>
  );
}
