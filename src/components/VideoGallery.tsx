
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";

const VideoGallery = () => {
  const videos = [
    {
      id: 1,
      embedUrl: "https://www.youtube.com/embed/nbqxhm_uIgw?si=OM4lK547W72OhVZR",
      title: "Lake Bridvaišis Diving #1"
    },
    {
      id: 2,
      embedUrl: "https://www.youtube.com/embed/C0RHm0D1yXg?si=DT7xyUY2ZZAvkpgI",
      title: "Lake Bridvaišis Diving #2"
    },
    {
      id: 3,
      embedUrl: "https://www.youtube.com/embed/poq4wAHXFGs?si=kihc1_192HcwWdBt",
      title: "Lake Bridvaišis Diving #3"
    },
    {
      id: 4,
      embedUrl: "https://www.youtube.com/embed/fyMCpd4XkSg?si=NMy2vrH99AuQw5d-",
      title: "Lake Bridvaišis Diving #4"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="font-medium text-lg">{video.title}</h3>
            </div>
            <AspectRatio ratio={16/9}>
              <iframe
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </AspectRatio>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoGallery;
