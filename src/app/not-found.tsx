import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Could not find the requested resource.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
