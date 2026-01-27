import type{ Blog } from '../type/blog'
const API_URL = 'https://frontend-interview-8811.onrender.com'
export const fetchBlogs = async () => {
  const res = await fetch(`${API_URL}/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};


export const fetchArticle = async (id: string): Promise<Blog>=>{
     const res =await fetch(`${API_URL}/blogs/${id}`);
     
     if(!res.ok){
      throw new Error("Failed to fetch Ariticle");
     }

    return res.json();
       
}

export const deleteBlog = async (id: string) => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete blog");
  }

  return id;
};

