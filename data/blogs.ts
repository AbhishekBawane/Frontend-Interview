export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string[];
  date: string;
  coverImage?: string;
}


export const blogs: Blog[] = [
  {
    id: "1",
    title: "Sample Blog",
    description: "Demo blog",
    content: "This is demo content",
    category: ["TECH"],
    date: new Date().toISOString(),
    coverImage: "",
  },
];
