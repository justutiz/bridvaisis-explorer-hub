
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Component that displays diving stories/experiences
const DivingTexts = () => {
  // Array of diving experiences
  const divingTexts = [
    {
      title: "Bridvaišio ežeras: tamsi gelmė, kuri traukia ir gąsdina",
      author: "Nardytojas",
      content: `**Bridvaišio ežeras: tamsi gelmė, kuri traukia ir gąsdina**

Bridvaišio vardas tarp narų skamba ne šiaip sau – jis lyg paslaptingas vartas į kitą pasaulį. Tai vieta, kur net patyrusiems nardytojams tenka susidurti su netikėtomis emocijomis: nuo azotinės narkozės miglos iki keistų vaizdinių, apie kuriuos vėliau kalbama puse lūpų... Kas tai lemia? Pirmiausia – vandens tamsa. Pažvelgus į paviršių iš gilumos, atrodo, kad virš galvos plyti tirštas kraujo sluoksnis. Antra – vos žengus nuo kranto, po kojomis atsiveria milžiniškas status šlaitas, be jokio perėjimo į lėtą gilumą. Ir, žinoma, – gylis: daugiau nei 40 metrų.

Tačiau būtent šis ekstremalus derinys Bridvaišį paverčia unikaliu iššūkiu – vieta, kurią vertina patyrę narai. Čia patogu privažiuoti, įeiti į vandenį – infrastruktūra draugiška, o povandeninis pasaulis slepia ne vieną įdomybę.

**Ką pamatysi po vandeniu?**

* **Šlaitas:** tai natūralus ežero reljefas – beveik vertikali siena, išvagota vėgėlių urvų. Jis toks status, kad stovint vos metro gylyje, per kelias minutes galima pasiekti pačią dugno ribą – net 42 metrus.

* **Verpimo ratelis (6 m):** pirmas pasitinkantis objektas – tarsi pasveikinimas iš praeities, tyliai laukiantis narų.

* **Kelio ženklas (12 m):** jei pasimestum tarp dangaus ir dugno – čia ežeras pats parodys kryptį. Tikras ženklas, tarsi iš povandeninės juokų šalies.

* **Ofisiukas (15 m):** stalas, kompiuteris, klaviatūra – visas „nuotolinio darbo" komplektas. Kas sakė, kad dirbti galima tik ant žemės?

* **Valtis (18 m):** medinė valtis, įsitaisiusi ant šlaito, kažkokiu stebuklu dar laikosi vietoje. Lyg laukdama, kol kažkas ją ištrauks iš amžino miego.

* **Ragana (27 m):** turbūt keisčiausias objektas – ragana, kuri, atrodo, tik ir laukia nekviestų svečių. Patarimas: nepriartėk per daug.

* **Ereliukas (42 m):** senovinis vandens dviratis – Bridvaišio paslaptis pačioje gelmėje. Deja, dažnai paskendęs tamsiame ūke, todėl jo pamatyti nepavyksta kiekvienam.

**Svarbus perspėjimas:** šis ežeras – ne pradedantiesiems. Dėl staigaus nuolydžio ir ypač tamsaus vandens čia nardyti saugu tik gerai pasiruošus. Jei vis dar mokaisi suvaldyti plūdrumą – geriau pradėti nuo paprastesnių vietų.

**Kada geriausia nerti?** Žiemą. Kuo šaltesnis vanduo, tuo skaidresnis jis tampa. O kartu – ir Bridvaišio paslaptys lengviau atsiskleidžia...`,
      image: "/lovable-uploads/fae03c4f-38e3-4ed1-9368-dcd7ae090e58.png"
    },
    {
      title: "Bridvaišio ežero paslaptis: Antrojo pasaulinio karo naikintuvo liekanos",
      author: "Istorijos mylėtojas",
      content: `## ✈️ **Bridvaišio ežero paslaptis: Antrojo pasaulinio karo naikintuvo liekanos**

Atrodo, kad Bridvaišio ežeras vis dar turi kuo nustebinti net ir daug mačiusius narus. Po tamsiais šio mistiško vandens sluoksniais slypi ne tik ragana ar medinė valtis, bet ir tikras istorinis radinys – Antrojo pasaulinio karo sovietinio naikintuvo liekanos.

### 🔍 Viskas prasidėjo nuo treniruotės

2009 metais vienas Lietuvos karinių jūrų pajėgų naras, treniruodamasis Bridvaišio ežere, pastebėjo neįprastą žalsvą objektą vos 5–6 metrų gylyje. Pasirodo, tai buvo lėktuvo sparnas su dar išlikusiu ratu. Net padanga buvo puikiai išsilaikiusi – ji, kaip vėliau paaiškėjo, pagaminta Jaroslavlio gamykloje.

### 🕰️ Liudininkų istorijos – lyg iš kino

Tytuvėnų gyventojas Vladas Buškus pasakoja, kad 1944 metų vasarą, ganydamas karves prie ežero, išvydo, kaip virš galvos įvyko oro mūšis. Vienas naikintuvas smigo tiesiai į Bridvaišį. Jo draugas, išdrįsęs panerti prie nukritusio lėktuvo, esą net nusegė nuo lakūno laikrodį ir pasiėmė pistoletą.

### 🧩 Lėktuvo dalys – nuo spektaklių iki istorijos muziejų

Pasak vietinių, lėktuvas ilgai dugne neužsibuvo. Gyventojai sparčiai jį „utilizavo" – dalys naudotos ne tik ūkio reikmėms, bet ir… spektaklių scenografijai. Tačiau tai, kas liko, vis dar saugoma po vandeniu. Šiandien svarstoma galimybė likusias konstrukcijas eksponuoti Tytuvėnų regioninio parko lankytojų centre.

---

Bridvaišis dar kartą įrodo – kiekvienas nėrimas čia gali tapti kelione į praeitį. Kartais labai tamsią, bet kartu ir be galo įdomią.`,
      image: "/lovable-uploads/aef4e78f-917d-4ce3-b690-71881c0e25d7.png"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-left">
          <span>Nardytojų įspūdžiai</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-2 text-left">
          Skaitykite žmonių patirtis nardant Bridvaišio ežere
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {divingTexts.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Įspūdžiai bus pridėti netrukus...</p>
            </CardContent>
          </Card>
        ) : (
          divingTexts.map((text, index) => (
            <Card key={index} className="mb-4 overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 gap-6">
                {text.image && (
                  <div className="border-b border-border">
                    <img 
                      src={text.image} 
                      alt={text.title} 
                      className="w-full h-auto object-contain bg-[#0a3b0a]"
                    />
                  </div>
                )}
                <CardContent className="p-8 pt-6">
                  <div className="prose prose-lg max-w-none text-left">
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-left" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-4 text-left" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-5 mb-3 text-left" {...props} />,
                        p: ({node, ...props}) => <p className="my-4 text-base leading-relaxed text-left" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                        ul: ({node, ...props}) => <ul className="my-5 list-disc pl-6 text-left" {...props} />,
                        li: ({node, ...props}) => <li className="mb-2 leading-relaxed text-left" {...props} />,
                      }}
                    >
                      {text.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DivingTexts;
