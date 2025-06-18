"use client";
import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type MaterialOptions = "gold" | "silver" | "platinum";
export type GemOptions = "diamond" | "ruby" | "emerald";

type Option = {
  label: string;
  value: string;
};

type MaterialSelectorProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function MaterialSelector({
  label,
  value,
  options,
  onChange,
}: MaterialSelectorProps) {
  return (
    <div>
      <Label className="mb-1 block">
        {label}
      </Label>
      <Select value={value} onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-full bg-black-100 border border-gray-600">
          <SelectValue placeholder="Select Payment Method" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
