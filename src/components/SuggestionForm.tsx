
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Vardas turi būti bent 2 simbolių ilgio.",
  }),
  email: z.string().email({
    message: "Įveskite teisingą el. pašto adresą.",
  }),
  suggestionType: z.string().min(1, {
    message: "Nurodykite, kokio pobūdžio pasiūlymą turite.",
  }),
  suggestion: z.string().min(10, {
    message: "Pasiūlymas turi būti bent 10 simbolių ilgio.",
  }),
});

const SuggestionForm = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      suggestionType: "",
      suggestion: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // In a real application, you would send this to your backend
    toast({
      title: "Pasiūlymas išsiųstas!",
      description: "Ačiū, kad prisidedate prie Bridvaišio ežero puslapio.",
    });
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jūsų vardas</FormLabel>
                <FormControl>
                  <Input placeholder="Jonas Jonaitis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>El. paštas</FormLabel>
                <FormControl>
                  <Input placeholder="jusu.pastas@pavyzdys.lt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="suggestionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pasiūlymo tipas</FormLabel>
              <FormControl>
                <Input placeholder="Naujas vaizdo įrašas, svetainės patobulinimas, nauja informacija ir t.t." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="suggestion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jūsų pasiūlymas</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Išsamiai aprašykite savo pasiūlymą..." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Galite įtraukti nuorodas į vaizdo įrašus, nuotraukas ar kitą aktualią informaciją.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full md:w-auto">Pateikti pasiūlymą</Button>
      </form>
    </Form>
  );
};

export default SuggestionForm;
