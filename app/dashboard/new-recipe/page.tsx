"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Loader2, ArrowLeft, Trash2, Plus, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { RecipeFormValues, recipeSchema } from "@/types/recipeType";
import { zodResolver } from "@hookform/resolvers/zod";
import recipeService from "@/services/recipeService";
import uploadService from "@/services/uploadService";

export default function NewRecipePage() {
  const router = useRouter();
  const { storeNewRecipe } = recipeService;
  const { uploadImage } = uploadService;
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema) as never,
    defaultValues: {
      title: "",
      description: "",
      cookingTime: 0,
      difficulty: "medium",
      category: "",
      ingredients: [""],
      instructions: [""],
    },
  });

  // useFieldArray for Ingredients
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: control as never,
    name: "ingredients" as never,
  });

  // useFieldArray for Instructions
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control: control as never,
    name: "instructions" as never,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RecipeFormValues) => {
    try {
      if (photoFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", photoFile);
        const imgResponse = await uploadImage(imgFormData);
        const payload = {
          ...data,
          image: imgResponse.url,
        };
        await storeNewRecipe(payload);
        toast.success("New Recipe is created!");
        router.push("/dashboard");
      } else {
        toast.warning("Please upload an image");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Failed to create new recipe");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Create New Recipe
              </h1>
              <p className="text-muted-foreground">
                Share your culinary secrets with the world.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Publish Recipe
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Recipe Title</Label>
                    <Input
                      {...register("title")}
                      placeholder="e.g., Authentic Pasta Carbonara"
                    />
                    {errors.title && (
                      <p className="text-xs text-destructive">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Short Description</Label>
                    <Textarea
                      {...register("description")}
                      className="h-24"
                      placeholder="Brief intro..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cooking Time (mins)</Label>
                      <Input type="number" {...register("cookingTime")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("difficulty", value as any)
                        }
                        defaultValue={getValues("difficulty")}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients with useFieldArray */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Ingredients</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendIngredient("")}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ingredientFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <Input
                        {...register(`ingredients.${index}` as const)}
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={ingredientFields.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Instructions with useFieldArray */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Instructions</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendInstruction("")}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Step
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {instructionFields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-start">
                      <div className="bg-primary/10 text-primary text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <Textarea
                        {...register(`instructions.${index}` as const)}
                        placeholder={`Describe step ${index + 1}...`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInstruction(index)}
                        disabled={instructionFields.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted/30 group">
                    {previewImage ? (
                      <>
                        <img
                          src={previewImage}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(null);
                            setPhotoFile(null);
                          }}
                          className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <Label
                        htmlFor="blog-image"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <ImagePlus className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs">Upload Image</span>
                      </Label>
                    )}
                    <input
                      id="blog-image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Input
                      {...register("category")}
                      placeholder="e.g. Breakfast, Lunch"
                    />
                    {errors.category && (
                      <p className="text-xs text-destructive">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
