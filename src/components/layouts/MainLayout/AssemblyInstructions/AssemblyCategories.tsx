// components/assembly/AssemblyCategories.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const tabs = [
  "Base Cabinets",
  "Wall Cabinets",
  "Glass Wall Cabinets",
  "Pantries & Ovens",
  "Kitchen Sink Cabinets",
  "Bathroom Vanities",
  "Accessories",
];

const videoData: Record<
  string,
  { title: string; codes: string; link: string }[]
> = {
  "Base Cabinets": [
    {
      title: "1 Drawer / 1 Door Base",
      codes: "B15, B09, B12, B18, B21",
      link: "https://youtu.be/NU6vXJb_zuQ",
    },
    {
      title: "1 Drawer / 2 Door Base",
      codes: "B24 – B27",
      link: "https://youtu.be/XedgPI1Elss",
    },
    {
      title: "2 Drawer / 2 Door Base",
      codes: "B33, B30, B36, B42",
      link: "https://youtu.be/276SgjRIyuM",
    },
    {
      title: "2 Drawer Base",
      codes: "DB24-2, DB27-2, DB30-2, DB33-2, DB36-2",
      link: "https://youtu.be/U1sa_5yo4ZY",
    },
    {
      title: "3 Drawer Base",
      codes: "DB24-3, DB12-3, DB15-3, DB18-3, DB21-3, DB30-3, DB33-3, DB36-3, DB42-3",
      link: "https://youtu.be/qSVdqRYcyCA",
    },
    {
      title: "Lazy Susan",
      codes: "LS3612 – LS3309",
      link: "https://youtu.be/AtKArw81_yU",
    },
    {
      title: "Blind Base Corner",
      codes: "BBC39L/R – BBC42L/R",
      link: "https://youtu.be/Oejfkdwm9NI",
    },
    {
      title: "Diagonal Base Corner",
      codes: "CBD36",
      link: "https://youtu.be/C5__R-dmEks",
    },
  ],
  "Wall Cabinets": [
    {
      title: "Standard Wall",
      codes: "W3315",
      link: "https://youtu.be/5W_OWrXnT80",
    },
    {
      title: "Wall Cabinet – 1 Door",
      codes: "W2130",
      link: "https://youtu.be/liSQqV9cOyQ",
    },
    {
      title: "Wall Cabinet – 2 Door",
      codes: "W3630",
      link: "https://youtu.be/pIjitSvVpNg",
    },
    {
      title: "Refrigerator Stacker",
      codes: "W361527",
      link: "https://youtu.be/_UPfwXURvVE",
    },
    {
      title: "Corner Cabinet",
      codes: "WCC3036",
      link: "https://youtu.be/Uv9ABf1q2Xw",
    },
    {
      title: "Open Corner Cabinet",
      codes: "WDC2436",
      link: "https://youtu.be/1hEjSXbG0Eo",
    },
  ],
  "Glass Wall Cabinets": [
    {
      title: "Glass 1 Door Stacker",
      codes: "WM1512H",
      link: "https://youtu.be/EZZur6zznKo",
    },
    {
      title: "Glass 2 Door Stacker",
      codes: "WM3012H",
      link: "https://youtu.be/7gspyqx0Tq0",
    },
    {
      title: "Glass Corner Stacker",
      codes: "WMDC2412H",
      link: "https://youtu.be/sYrOE5wGVPU",
    },
    {
      title: "Glass Corner Cabinet",
      codes: "WMDC2436H",
      link: "https://youtu.be/mNHrgiYVYOg",
    },
    {
      title: "Glass 1 Door Cabinet",
      codes: "WM2130H",
      link: "https://youtu.be/jj75e7jeP6A",
    },
    {
      title: "Glass 2 Door Cabinet",
      codes: "WM3330H",
      link: "https://youtu.be/HI7LE5AcKp4",
    },
  ],
  "Pantries & Ovens": [
    {
      title: "Pantry – 1 Door",
      codes: "WP188427",
      link: "https://youtu.be/cqpfJGcSG_U",
    },
    {
      title: "Pantry – 2 Door",
      codes: "WP248427",
      link: "https://youtu.be/6V75jLTX8iw",
    },
    {
      title: "Tall Oven – 1 Drawer",
      codes: "OC338427WO",
      link: "https://youtu.be/PNy-ith0ml8",
    },
    {
      title: "Tall Oven – 2 Drawer",
      codes: "OC308427",
      link: "https://youtu.be/AUeXUcVq2Ak",
    },
  ],
  "Kitchen Sink Cabinets": [
    {
      title: "Sink Base 1 Drawer",
      codes: "SB24",
      link: "https://youtu.be/tDQge79cC5s",
    },
    {
      title: "Sink Base 2 Drawer",
      codes: "SB36",
      link: "https://youtu.be/SGYu8k3og7k",
    },
    {
      title: "Farm Sink Base",
      codes: "FSB36",
      link: "https://youtu.be/k2qY9xMg4mI",
    },
  ],
  "Bathroom Vanities": [
    {
      title: "Base – 1 Door",
      codes: "SVA15B",
      link: "https://youtu.be/WEqtF7q51u0",
    },
    {
      title: "Base – Full 2 Door",
      codes: "SVA27P",
      link: "https://youtu.be/tbV9IClScx8",
    },
    {
      title: "Drawer Base – 3 Drawer",
      codes: "SVA18D",
      link: "https://youtu.be/ZiYQrA-ss7E",
    },
    {
      title: "Vanity Standard Sink Base",
      codes: "FA3621",
      link: "https://youtu.be/02EJsoGs8TI",
    },
    {
      title: "Vanity Linen Cabinet – 2 Door",
      codes: "SVA188124P",
      link: "https://youtu.be/bm4KNo6nMUI",
    },
    {
      title: "Vanity Linen Cabinet – 2 Door",
      codes: "SVA188124D",
      link: "https://youtu.be/SiC6wEp3fX0",
    },
    {
      title: "Vanity Countertop Linen",
      codes: "DV1245",
      link: "https://youtu.be/QpFcxDZpAJ0",
    },
    {
      title: "Vanity Sink Combo – Left",
      codes: "FA3621DL",
      link: "https://youtu.be/Ljy2IuAP04U",
    },
    {
      title: "Vanity Sink Combo – Right",
      codes: "FA3021DR",
      link: "https://youtu.be/Td76zM4Rd5I",
    },
    {
      title: "Vanity Sink Base: Single",
      codes: "FA4821D",
      link: "https://youtu.be/_fj1ZIOwta0",
    },
    {
      title: "Vanity Sink Base: Double",
      codes: "FA6021DD",
      link: "https://youtu.be/4HnIBTfIbig",
    },
  ],
  Accessories: [
    {
      title: "Trash Can Pull Out",
      codes: "BWBK18-2",
      link: "https://youtu.be/kXRA3hOGG9k",
    },
    {
      title: "Spice Rack",
      codes: "SP09",
      link: "https://youtu.be/TJpxAI4JCWQ",
    },
    {
      title: "Drawer Base – 3 Drawer",
      codes: "FD30",
      link: "https://youtu.be/XMi4ihBobzc",
    },
    {
      title: "Microwave Cabinet",
      codes: "MDB30",
      link: "https://youtu.be/ra-Vt6zKm7s",
    },
    {
      title: "Roll Out Tray",
      codes: "RD24",
      link: "https://youtu.be/c_3xdHvPo8U",
    },
    {
      title: "Wine Rack",
      codes: "36WR",
      link: "https://youtu.be/9zwZshp9j2w",
    },
  ],
};

const AssemblyCategories = () => {
  const [activeTab, setActiveTab] = useState("Base Cabinets");

  const currentVideos = videoData[activeTab] || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 -mt-8">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant={activeTab === tab ? "default" : "outline"}
              className={`px-8 h-10 shadow-none font-semibold text-base cursor-pointer  ${
                activeTab === tab
                  ? "bg-[#800000] hover:bg-[#660000] text-white border-[#800000]"
                  : "bg-white text-gray-900 "
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Video List */}
        <div className="w-full p-10 md:p-16">
          {currentVideos.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">
              Videos coming soon...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {currentVideos.map((video, i) => (
                <div key={i} className="group">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {video.title}
                  </h4>
                  <a
                    href={video.link}
                    target="_blank"
                    className="text-2xl font-bold text-[#800000] underline decoration-2 underline-offset-4 group-hover:text-[#660000] transition"
                  >
                    {video.codes}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AssemblyCategories;
