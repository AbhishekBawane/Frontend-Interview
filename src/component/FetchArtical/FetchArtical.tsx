import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cards from "../Cards/Cards";
import DetailArticle from "../DetailAriticle/DetailAritcle"; // Fixed typo
import { Skeleton } from "@/components/ui/skeleton";
import {fetchBlogs} from '../../api/blogs'
import type{Blog} from '../../type/blog'


export default function FetchArticle() {
  const [idSelect, setIdSelect] = useState<string | null>(null);



 const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });


  // Set initial selected ID
  useEffect(() => {
    if (blogs && blogs.length > 0 && !idSelect) {
      setIdSelect(blogs[0].id);
    }
  }, [blogs, idSelect]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-red-500">Error loading articles: {error.message}</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p>No articles found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Articles List */}
      <div className="w-full lg:max-w-sm lg:shrink-0 border p-3 rounded-lg">
        <h1 className="font-bold text-lg mb-4">Latest Articles</h1>
        
        <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:max-h-[100vh]">
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

      {/* Article Detail */}
      <div className="flex-1 min-w-0">
        {idSelect ? (
          <DetailArticle id={idSelect} />
        ) : (
          <div className="p-4 text-gray-500">
            Select an article to view details
          </div>
        )}
      </div>
    </div>
  );
}