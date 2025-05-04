import Nav from "@/components/Nav";

export default async function CreateLayout({ children }: { children: React.ReactNode }) {
//   const imageMap = await loadImages();

  return (
    <div className='h-svh w-screen bg-black'>
        <Nav />
        {children}
    </div>
  );
}