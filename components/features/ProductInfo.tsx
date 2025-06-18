"use client";
import React from "react";
import { MaterialOptions, GemOptions } from "./MaterialSelector";

type ProductInfoProps = {
  metal: MaterialOptions;
  gem: GemOptions;
};

const metalNames: Record<MaterialOptions, string> = {
  gold: "Gold",
  silver: "Silver",
  platinum: "Platinum",
};

const metalDescriptions: Record<MaterialOptions, string> = {
  gold: "Elegant and timeless, gold is perfect for weddings and special occasions.",
  silver:
    "Sleek and modern, silver offers a versatile look suitable for everyday wear.",
  platinum:
    "Luxurious and durable, platinum is ideal for those seeking exclusivity and strength.",
};

const gemNames: Record<GemOptions, string> = {
  diamond: "Diamond",
  ruby: "Ruby",
  emerald: "Emerald",
};

const gemDescriptions: Record<GemOptions, string> = {
  diamond:
    "Brilliant and sparkling, diamond symbolizes eternal love and strength.",
  ruby: "Vibrant and passionate, ruby adds a bold touch of color and elegance.",
  emerald:
    "Lush and mysterious, emerald brings a unique green hue representing renewal.",
};

const metalPrices: Record<MaterialOptions, number> = {
  gold: 300,
  silver: 150,
  platinum: 500,
};

const gemPrices: Record<GemOptions, number> = {
  diamond: 800,
  ruby: 400,
  emerald: 450,
};

export default function ProductInfo({ metal, gem }: ProductInfoProps) {
  const productName = "The Crowned Ring";
  const price = metalPrices[metal] + gemPrices[gem];

  return (
    <div className="border bg-transparent p-6 h-fit rounded-lg w-full text-white shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">{productName}</h2>

      <div className="mb-4">
        <p>
          <strong>Metal:</strong> {metalNames[metal]}
        </p>
        <p className="text-sm text-gray-300 mt-1">{metalDescriptions[metal]}</p>
      </div>

      <div className="mb-4">
        <p>
          <strong>Gem:</strong> {gemNames[gem]}
        </p>
        <p className="text-sm text-gray-300 mt-1">{gemDescriptions[gem]}</p>
      </div>

      <p className="text-xl font-bold mt-4">
        Price: <span className="text-yellow-400">${price}</span>
      </p>
    </div>
  );
}
