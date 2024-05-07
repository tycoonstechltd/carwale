import Cars from "@/components/Cars";

export default function CarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Select Car You Want To Buy
    </h2>
      <Cars/>
    </main>
  );
}
