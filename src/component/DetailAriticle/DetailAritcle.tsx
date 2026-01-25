import { Skeleton } from "@/components/ui/skeleton";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share } from 'lucide-react'
import { useQuery } from "@tanstack/react-query";
import type { Blog } from "@/type/blog";
import { useAuth } from "@/lib/AuthContext";



interface DetailPorps{
     id: string;
 
}

export default function DetailAritcle({ id }:DetailPorps){

    const {user} = useAuth();

    const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog");
      return res.json();
    },
    enabled: !!id,
  });
  
       if(isLoading) {
           return (<>
        
    <div className="flex w-full max-w-xs flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>


           </>)
       }
       if(error){
         return(
            <p>Error loading this</p>
         )
       }

       return(
          <>
                     <div className="flex flex-col justify-center items-start gap-4 p-4" key=''>
                              <div className="flex flex-col justify-center items-start gap-4 p-4">
                                 <img src={blog?.coverImage} className=" object-fit"/>
                               <CardHeader className=" w-full p-0 mb-2 ">
                                        <div className="w-full flex flex-row items-center justify-between  text-gray-500">
                                              <p className='text-blue-700 font-bold'>{blog?.category.join(", ")}</p>
                                              <p>5 Min</p>
                                        </div>
                               </CardHeader>  
                               <p className="text-5xl font-bold">{blog?.title}</p>  
                               <Button className=" p-1 bg-blue-700"><Share />Share Article</Button> 
                               <div className="w-full flex flex-col rounded-5 p-4 items-center justify-around bg-gray-200 sm:flex-row">
                                     <div className="text-center flex flex-col gap-2"><p>Catagory</p><span className="font-bold">{blog?.category}</span></div>
                                     <div className="text-center flex flex-col gap-2"><p>Read Time</p><span className="font-bold">5 Min</span></div>
                                     <div className="text-center flex flex-col gap-2"><p>Date</p><span className="font-bold">{blog?.date}</span></div>
                               </div>
                               <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                                              {blog?.content}
                                         </p>
                              </div>
                              <div className="flex flex-col items-center justify-between">
                                  <h1 className="font-bold gap-1"><p>{user?.username}</p></h1>
                              </div>
                     </div>
          </>
       )


}