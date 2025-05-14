
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "lucide-react";

// Sample text entries about diving in the lake
const initialDivingTexts = [
  {
    id: 1,
    author: "Jonas Petraitis",
    title: "Pirmasis nardymas Bridvaišyje",
    date: "2024-04-15",
    content: "Pirmą kartą nardžiau Bridvaišio ežere praėjusią vasarą. Vanduo buvo neįtikėtinai skaidrus, matomumas siekė daugiau nei 15 metrų! Po vandeniu aptikau įdomių formacijų ir netikėtai pamačiau didelį lydį, kuris, atrodo, buvo toks pat nustebęs mane matydamas, kaip ir aš jį."
  },
  {
    id: 2,
    author: "Laura Kazlauskienė",
    title: "Povandeninis pasaulis",
    date: "2023-08-22",
    content: "Bridvaišio ežeras yra paslaptingas povandeninis pasaulis. Nardydama 20 metrų gylyje aptikau seną valtį, kuri ten guli jau ne vienus metus. Aplink ją susiformavęs visas ekosistemos mazgas. Įdomu stebėti, kaip gamta perima žmogaus paliktus daiktus."
  },
  {
    id: 3,
    author: "Tomas Rimkus",
    title: "Nardymo instruktoriaus įžvalgos",
    date: "2023-07-10",
    content: "Jau 7 metus dirbu nardymo instruktoriumi ir galiu drąsiai teigti, kad Bridvaišio ežeras yra viena geriausių nardymo vietų Lietuvoje. Dėl savo gylio ir vandens skaidrumo jis puikiai tinka tiek pradedantiesiems, tiek patyrusiems nardytojams. Ypatingai įdomu nardyti rytinėje ežero dalyje, kur galima pamatyti išskirtinius geologinius darinius ir turtingą povandeninę augmeniją."
  }
];

// Form schema for adding new diving texts
const formSchema = z.object({
  author: z.string().min(3, { message: "Autorius turi būti bent 3 simbolių ilgio" }),
  title: z.string().min(5, { message: "Pavadinimas turi būti bent 5 simbolių ilgio" }),
  content: z.string().min(20, { message: "Tekstas turi būti bent 20 simbolių ilgio" }),
});

const DivingTexts = () => {
  const [divingTexts, setDivingTexts] = useState(initialDivingTexts);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newText = {
      id: divingTexts.length + 1,
      author: values.author,
      title: values.title,
      content: values.content,
      date: new Date().toISOString().split('T')[0],
    };
    
    setDivingTexts([...divingTexts, newText]);
    setIsAdding(false);
    
    toast({
      title: "Tekstas pridėtas",
      description: "Jūsų tekstas buvo sėkmingai pridėtas",
    });
    
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Book className="h-8 w-8 text-lake-blue-600" />
          <span>Nardytojų įspūdžiai</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Skaitykite žmonių patirtis nardant Bridvaišio ežere
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {!isAdding ? (
          <Button 
            className="bg-lake-blue-600 hover:bg-lake-blue-700 w-full md:w-auto"
            onClick={() => setIsAdding(true)}
          >
            Pasidalinkite savo patirtimi
          </Button>
        ) : (
          <Card className="mb-6 border-2 border-lake-blue-200">
            <CardHeader>
              <CardTitle>Pridėti naują tekstą</CardTitle>
              <CardDescription>Pasidalinkite savo nardymo patirtimi Bridvaišio ežere</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Autorius</FormLabel>
                          <FormControl>
                            <Input placeholder="Jūsų vardas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pavadinimas</FormLabel>
                          <FormControl>
                            <Input placeholder="Teksto pavadinimas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jūsų tekstas</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Pasidalinkite savo patirtimi..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                      Atšaukti
                    </Button>
                    <Button type="submit" className="bg-lake-blue-600 hover:bg-lake-blue-700">
                      Pridėti
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        
        {divingTexts.map((text) => (
          <Card key={text.id} className="mb-4">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{text.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {text.author} • {text.date}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">{text.content}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DivingTexts;
