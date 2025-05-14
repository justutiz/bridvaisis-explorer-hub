
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

// This will be a simpler component that just displays diving stories
// without the form for adding new stories
const DivingTexts = () => {
  // The stories will be provided by the user later, so starting with an empty array
  const divingTexts = [];

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {divingTexts.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Įspūdžiai bus pridėti netrukus...</p>
            </CardContent>
          </Card>
        ) : (
          divingTexts.map((text, index) => (
            <Card key={index} className="mb-4 overflow-hidden">
              {/* Image placeholder - will be replaced with actual images */}
              {text.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={text.image} 
                    alt={text.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{text.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {text.author}
                </p>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line">{text.content}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DivingTexts;
