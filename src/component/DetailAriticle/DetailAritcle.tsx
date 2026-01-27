import { Skeleton } from "@/components/ui/skeleton";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Trash, ThumbsUp, User } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Blog } from "@/type/blog";
import { useAuth } from "@/lib/AuthContext";
import { deleteBlog, fetchArticle } from "@/api/blogs";
import { useState } from "react";


interface DetailPorps{
     id: string;
 
}

export default function DetailAritcle({ id }:DetailPorps){

    const {user} = useAuth();
    const queryClient = useQueryClient();
    const [like, setLike] = useState(false);


    const handleLike=()=>{
      if(!user){
        alert("Please Login!");
      }

      setLike(true);
    } 
    const handleDelete =useMutation({
       mutationFn:()=> deleteBlog(id),
       onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
        queryClient.removeQueries({ queryKey: ["blog", id] });

       }
    })

 const { data: blog, isLoading, error } = useQuery<Blog>({
  queryKey: ["blog", id],
  queryFn: ()=> fetchArticle(id),
  enabled:!!id
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
                                 <img src={blog?.coverImage} className=" object-fit rounded-lg"/>
                               <CardHeader className=" w-full p-0 mb-2 ">
                                        <div className="w-full flex flex-row items-center justify-between  text-gray-500">
                                              <p className='text-blue-700 font-bold'>{blog?.category.join(", ")}</p>
                                              <p>5 Min</p>
                                        </div>
                               </CardHeader>  
                               <p className="text-5xl font-bold">{blog?.title}</p>  
                               <Button className=" p-1 bg-blue-700 cursor-pointer"><Share />Share Article</Button> 
                               <div className="w-full flex flex-col items-center justify-around rounded-lg p-4 border border-2 border-black bg-gray-200 sm:flex-row">
                                     <div className="text-center flex flex-col gap-2 cursor-pointer"><p>Catagory</p><span className="font-bold">{blog?.category.join(', ')}</span></div>
                                     <div className="text-center flex flex-col gap-2 cursor-pointer"><p>Read Time</p><span className="font-bold">5 Min</span></div>
                                     <div className="text-center flex flex-col gap-2 cursor-pointer"><p>Date</p><span className="font-bold">{blog?.date}</span></div>
                               </div>
                               <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                                              {blog?.content}
                                         </p>
                              </div>
                              <div className="w-full flex flex-row items-center justify-between">
                                  <h1 className="font-bold text-xl flex flex-row items-center justiy-center gap-2 cursor-pointer"><User className="border-black border-2 cursor-pointer"/><p>{user?.username}</p></h1>
                                  <div className="flex flex-row items-center justiy-center gap-2"> 
                                       <Button onClick={handleLike} className={`${like? "text-blue-700 cursor-pointer": "text-white cursor-pointer"}`}><ThumbsUp/></Button>
                                       <Button onClick={() => handleDelete.mutate()} className="cursor-pointer"><Trash/></Button></div>
                              </div>
                     </div>
          </>
       )


}