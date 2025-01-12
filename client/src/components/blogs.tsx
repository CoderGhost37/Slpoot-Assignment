export async function Blogs({ category }: { category: string }) {
  return (
    <section className='py-12'>
      <p>{category}</p>
    </section>
  );
}
