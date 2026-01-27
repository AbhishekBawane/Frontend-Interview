import type{ Blog } from '../type/blog'

export const fetchBlogs = async () => {
  const res = await fetch(`/api/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};


export const fetchArticle = async (id: string): Promise<Blog>=>{
     const res =await fetch(`/api/blogs/${id}`);
     
     if(!res.ok){
      throw new Error("Failed to fetch Ariticle");
     }

    return res.json();
       
}

export const deleteBlog = async (id: string) => {
  const res = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete blog");
  }

  return id;
};

