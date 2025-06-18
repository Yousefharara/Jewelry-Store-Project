'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

export type MaterialOptions = "gold" | "silver" | "platinum";
export type GemOptions = "diamond" | "ruby" | "emerald";

type ProductContextType = {
  selectedMetal: MaterialOptions;
  selectedGem: GemOptions;
  quantity: number;
  setSelectedMetal: (metal: MaterialOptions) => void;
  setSelectedGem: (gem: GemOptions) => void;
  setQuantity: (quantity: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMetal, setSelectedMetal] = useState<MaterialOptions>("gold");
  const [selectedGem, setSelectedGem] = useState<GemOptions>("diamond");
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <ProductContext.Provider
      value={{
        selectedMetal,
        selectedGem,
        quantity,
        setSelectedMetal,
        setSelectedGem,
        setQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
