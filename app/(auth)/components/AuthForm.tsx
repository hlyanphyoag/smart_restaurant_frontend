'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from "zod"



interface Props <T extends FieldValues> {
    schema: ZodType<T>,
    defaultValues: T,
    onSubmit: (data : T ) => Promise<{success: boolean; error?: string}>,
    type: 'SIGN_IN' | 'SIGN_UP'
}
export const AuthFrom = <T extends FieldValues> ({type, schema, defaultValues, onSubmit}: Props<T>) => {

    const router = useRouter();
    const isSignIn = type === 'SIGN_IN';

    const form  : UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    });

    const handleSubmit: SubmitHandler<T> = async (data) => {
        console.log('Data:', data)
        const result = await onSubmit(data)
        if(result){
            router.push('/')
        }else{
            console.log('OnSubmit Error')
        }
    }

    return (
        <Card className="flex flex-col w-full p-4 lg:max-w-lg">  
            <CardHeader>
                <CardTitle className="text-center">{isSignIn ? 'Sign In' : 'Register'}</CardTitle>
            </CardHeader>
        
            <Form {...form}> 
            <form onSubmit={form.handleSubmit(handleSubmit)} >
                <CardContent className="space-y-4">
                {Object.keys(defaultValues).map((field) => (
                    <FormField 
                    key={field}
                    control={form.control}
                    name={field as Path<T>}
                    render={({field}) => (
                        <FormItem >
                            <FormLabel className="capitalize">{field.name as keyof typeof FIELD_NAMES}</FormLabel>
                            <FormControl>
                                <Input
                                required
                                type = {FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                ))}
                </CardContent>
                <CardDescription className="flex items-center justify-center gap-2 m-4">
                    {isSignIn ? 'Don\'t have and account?' : 'Already have an account?'}
                    <Link href={isSignIn ? '/sign-up' : '/sign-in'}>{isSignIn ? 'Sign Up' : 'Sign In'}</Link>
                </CardDescription>
                <CardFooter className="mt-4">
                    <Button className="w-full" type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
                </CardFooter>
            </form>
            </Form>
        </Card>
    )

}