export interface Blog {
  id: string;
  title: string;
  description: string;
  category: string[];
  date: string;
  content: string;
  coverImage:string;
}

export interface User{
    id: string;
    email:string;
    password:string;
    username:string
}
