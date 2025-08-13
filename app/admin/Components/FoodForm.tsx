"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FIELD_NAMES,
  FIELD_TYPES,
  FOOD_FIELD_NAMES,
  FOOD_FIELD_TYPES,
} from "@/constants";
import { foodSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType, ZodTypeAny } from "zod";
import { IngredientItems } from "./IngredientItems";
import { useEffect, useState } from "react";
import { useIngrdientStore } from "@/store/IngredientStore";
import { fi } from "zod/v4/locales";

interface Props<T extends FieldValues> {
  schema: ZodTypeAny;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}
export const FoodForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();

  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { setValue } = form;

  const { ingredients, removeAllIngredients } = useIngrdientStore();
  const [handleRemoveImage, setHandleRemoveImage] = useState(false);

  {
    ingredients &&
      useEffect(() => {
        setValue(
          "ingredients" as Path<T>,
          ingredients as PathValue<T, Path<T>>
        );
      }, [setValue, ingredients]);
  }

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    form.reset();
    setHandleRemoveImage(true);
    removeAllIngredients();
  };

  return (
    <Card className="flex flex-col w-full p-4 lg:max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            {Object.keys(defaultValues)
              .filter(
                (field) =>
                  field !== "images" &&
                  field !== "ingredients" &&
                  field !== "createdAt" &&
                  field !== "updatedAt"
              )
              .map((field) => (
                <div key={field}>
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as Path<T>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">
                          {field.name as keyof typeof FOOD_FIELD_NAMES}
                        </FormLabel>
                        <FormControl>
                          <Input
                            required
                            type={
                              FOOD_FIELD_TYPES[
                                field.name as keyof typeof FOOD_FIELD_TYPES
                              ]
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            <FormField
              control={form.control}
              name={"images" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUpload
                      handleImageRemove={handleRemoveImage}
                      setHandleRemoveImage={setHandleRemoveImage}
                      onUrlChange={(url) =>
                        field.onChange([...(field.value ?? []), url])
                      }
                    />
                  </FormControl>
                  {/* <img src={field.value[0]} alt="" height={100} width={100}/> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"ingredients" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <IngredientItems />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-4">
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
