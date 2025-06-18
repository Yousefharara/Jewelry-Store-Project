import MagicButton from "@/components/ui/MagicButton";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import React from "react";
import ProductViewer from "../features/ProductViewer";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="pb-20 mt-7">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue " />
      </div>

        {/* Grid-background */}
      <div className="absolute left-0 top-0 flex min-h-[120vh] w-full items-center justify-center bg-white dark:bg-black-100">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:80px_80px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            "opacity-30"
          )}
        />
        
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)] dark:bg-black-100"></div>
      </div>

      <div className="flex justify-center relative z-10 ">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2
            className="uppercase tracking-widest text-xs text-center text-blue-100
                     max-w-80"
          >
            
            <TextGenerateEffect className="text-center text-[40px] md:text-5xl lg:text-6xl" words="Dynamic Web Magic with Next.js & React Three Fiber"/>
          </h2>
          <ProductViewer />
          <Link href="/checkout" className="md:mt-7">
            <MagicButton 
              title="Order Now"
              icon={<Package strokeWidth={1} size={18} />}
              position="right"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
