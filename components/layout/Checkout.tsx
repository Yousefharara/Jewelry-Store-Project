"use client";

import { useProduct } from "@/context/ProductContext";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Checkout() {
  const { selectedMetal, selectedGem, quantity, setQuantity } = useProduct();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
  });

  const handleResetInputs = () => {
    setForm({
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "card",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast("Order submitted successfully!", {
      description: "We'll contact you soon to confirm your order.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Toast dismissed"),
      },
    });
    handleResetInputs();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black-100 rounded-lg shadow-lg mt-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="flex gap-12 mb-7">
        <p className="font-semibold">
          Metal: <span className="font-light">{selectedMetal}</span>
        </p>
        <p className="font-semibold">
          Gem: <span className="font-light">{selectedGem}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="mb-1 block">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={form.fullName}
            onChange={handleChange}
            className="bg-transparent border border-gray-600 focus:ring-indigo-500 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-1 block">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Eren@example.com"
            value={form.email}
            onChange={handleChange}
            className="bg-transparent border border-gray-600 focus:ring-indigo-500 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="address" className="mb-1 block">
            Address
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St"
            value={form.address}
            onChange={handleChange}
            className="bg-transparent border border-gray-600 focus:ring-indigo-500 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="city" className="mb-1 block">
            City
          </Label>
          <Input
            id="city"
            name="city"
            placeholder="New York"
            value={form.city}
            onChange={handleChange}
            className="bg-transparent border border-gray-600 focus:ring-indigo-500 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="postalCode" className="mb-1 block">
            Postal Code
          </Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="10001"
            value={form.postalCode}
            onChange={handleChange}
            className="bg-transparent border border-gray-600 focus:ring-indigo-500 text-white"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <Label htmlFor="quantity" className="mb-1 block">
            Quantity
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-transparent border border-gray-600 focus:ring-indigo-500 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="paymentMethod" className="mb-1 block">
            Payment Method
          </Label>
          <Select
            value={form.paymentMethod}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, paymentMethod: value }))
            }
          >
            <SelectTrigger className="w-full bg-black-100 border border-gray-600 text-white">
              <SelectValue placeholder="Select Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Credit / Debit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="cod">Cash on Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-6"
        >
          Submit Order
        </Button>
      </form>
    </div>
  );
}
