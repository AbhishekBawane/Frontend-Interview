import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface CardsProps {
  id: string;
  title: string;
  description: string;
  category: string[];
  date: string;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function Cards({
  id,
  title,
  description,
  category,
  date,
  isActive,
  onSelect,
}: CardsProps) {


    if(!id){
      return(
          <>
              <div className="flex flex-col item-center justify-center">
                 <div className="flex w-full max-w-xs flex-col gap-2">
                            <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-3/4" />
                  </div>
        </div>
          </>
      )
    }

  return (
    <Card
      onClick={() => onSelect(id)}
      className={`w-full  p-4 cursor-pointer transition skrink-0
        ${isActive ? "border-l-5 border-blue-700 " : "hover:border-l-4 hover:border-blue-300"}`}>
      <CardHeader className="p-0 mb-2">
        <div className="w-[280px] flex justify-between text-sm text-gray-500">
          <p className={`${isActive? 'text-blue-700':''}`}>{category[0]}</p>
          <p>{new Date(date).toDateString()}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <CardTitle className="mb-1">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Badge variant="secondary" className="font-bold">Featured</Badge>
      </CardContent>
    </Card>
  );
}
