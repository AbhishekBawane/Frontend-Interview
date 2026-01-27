export const fetchBlogs = async () => {
  const res = await fetch("/api/blogs");

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};


export const fetchArticle = async (id:string)=>{
    const res = await fetch(`/api/blogs/${id}`)
    if(!res.ok){
        throw new Error ("Failed to fetch article");
    }
    return res.json
}
