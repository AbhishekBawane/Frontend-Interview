import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../lib/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/component/Footer/Footer";

export default function AddBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  // 🔒 Protect route
  if (!user) return <Navigate to="/auth" replace />;

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          category,
          date: new Date().toISOString(),
          coverImage: "",
        }),
      });

      if (!res.ok) throw new Error("Failed to create blog");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
  });

  return (
    <>
         <div className="w-full max-w-2xl mx-auto mt-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Create Blog</FieldLegend>
            <FieldDescription>
              Share your knowledge with the community
            </FieldDescription>

            <FieldGroup>
              {/* Title */}
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel>Short Description</FieldLabel>
                <Textarea
                  placeholder="Brief summary of the article"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  required
                />
              </Field>

              {/* Category */}
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select
                  onValueChange={(value) => setCategory([value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="FINANCE">Finance</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="CAREER">Career</SelectItem>
                      <SelectItem value="EDUCATION">Education</SelectItem>
                      <SelectItem value="LIFESTYLE">Lifestyle</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              {/* Content */}
              <Field>
                <FieldLabel>Content</FieldLabel>
                <Textarea
                  placeholder="Write your article here..."
                  className="resize-none"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Actions */}
          <Field orientation="horizontal">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Publishing..." : "Publish"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Field>

          {mutation.isError && (
            <p className="text-red-500 text-sm">
              Failed to create blog
            </p>
          )}
        </FieldGroup>
      </form>
    
    </div>
    <Footer/>
    </>
  );
}
