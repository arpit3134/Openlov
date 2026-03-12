export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold">Category: {params.slug}</h1>
      <p>Is category ke tools yahan dikhenge.</p>
    </div>
  );
}

