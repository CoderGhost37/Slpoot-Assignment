import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='h-screen w-full lg:grid lg:grid-cols-2'>
      <div className='hidden bg-muted lg:block'>
        <Image
          src='/images/auth.jpg'
          alt='Image'
          width='1920'
          height='1080'
          priority
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <div className='flex items-center justify-center py-12'>{children}</div>
    </main>
  );
}
