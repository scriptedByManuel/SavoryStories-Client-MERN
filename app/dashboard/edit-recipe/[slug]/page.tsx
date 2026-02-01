"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, ArrowLeft, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// UI components
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

// Services & Hooks
import { Recipe, RecipeFormValues, recipeSchema } from "@/types/recipeType";
import recipeService from "@/services/recipeService";
import uploadService from "@/services/uploadService";
import useEditSlug from "@/features/dashboard/hooks/useEditSlug";
import CookingLoader from "@/components/CookingLoader";

export default function EditRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  // Services
  const { getRecipeBySlug, updateRecipe } = recipeService;
  const { uploadImage } = uploadService;

  // States for Image
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch Existing Data
  const { data, isLoading } = useEditSlug<Recipe>(
    slug,
    getRecipeBySlug,
    "recipes",
  );
  const recipe = data;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema) as any,
    values: {
      title: recipe.title,
      description: recipe.description,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      category: recipe.category,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    },
  });

  useEffect(() => {
    if (recipe.image) {
      setPreviewImage(
        `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${recipe.image}`,
      );
    }
  }, [recipe, reset]);

  // Field Arrays for Dynamic Inputs
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
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

  const onSubmit = async (formData: RecipeFormValues) => {
    try {
      await updateRecipe(recipe._id, formData);

      if (photoFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", photoFile);
        await uploadImage(`/recipes/${recipe._id}/image`, imgFormData);
      }

      toast.success("Recipe updated successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error("Failed to update recipe");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <CookingLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Recipe</h1>
              <p className="text-muted-foreground">
                Modify your masterpiece and keep it fresh.
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
                )}{" "}
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Recipe Title</Label>
                    <Input {...register("title")} placeholder="Recipe Title" />
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
                      className="h-24 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cooking Time (mins)</Label>
                      <Input
                        type="number"
                        {...register("cookingTime", { valueAsNumber: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("difficulty", value as any)
                        }
                        defaultValue={recipe?.difficulty}
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

              {/* Ingredients */}
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
                        {...register(`ingredients.${index}`)}
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

              {/* Instructions */}
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
                      <div className="bg-primary/10 text-primary text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1">
                        {index + 1}
                      </div>
                      <Textarea
                        {...register(`instructions.${index}`)}
                        className="resize-none"
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

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted/30 group">
                    <img
                      src={previewImage || "/placeholder.png"}
                      className="w-full h-full object-cover"
                    />
                    <Label
                      htmlFor="img-edit"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
                    >
                      <ImagePlus className="text-white h-8 w-8" />
                    </Label>
                    <Input
                      id="img-edit"
                      type="file"
                      className="hidden"
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
                  <Select
                    onValueChange={(value) =>
                      setValue("category", value as any)
                    }
                    defaultValue={recipe?.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="snacks">Snacks</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
