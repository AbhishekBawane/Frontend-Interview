import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cards from "../Cards/Cards";
import DetailAritcle from "../DetailAriticle/DetailAritcle";
import { Skeleton } from "@/components/ui/skeleton";
import type { Blog } from "@/type/blog";

export default function FetchArticle() {
  const [idSelect, setIdSelect] = useState<string | null>(null);

  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  useEffect(() => {
    if (blogs && blogs.length > 0 && !idSelect) {
      setIdSelect(blogs[0].id);
    }
  }, [blogs, idSelect]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error loading articles</p>;
  }

  if (!blogs) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">

      <div className="w-full lg:max-w-sm lg:shrink-0 border p-3">
        <h1 className="font-bold text-lg">Latest Articles</h1>

        <div className=" flex flex-row gap-4 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:max-h-[70vh]">
          {blogs.map((blog) => (
            <Cards
          
              key={blog.id}
              id={blog.id}
              title={blog.title}
              category={blog.category}
              date={blog.date}
              description={blog.description}
              isActive={blog.id === idSelect}
              onSelect={setIdSelect}
             
            />
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {idSelect && <DetailAritcle id={idSelect} />}
      </div>

    </div>
  );
}
