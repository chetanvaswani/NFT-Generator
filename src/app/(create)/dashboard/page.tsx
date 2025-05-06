"use client"
import { useState, useEffect } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import {categoryInterface} from "@/schemas/category";
import axios from 'axios';
import DashboardDisplay from "@/components/DashboardDisplay"

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<categoryInterface | null>(null);
  // const [layers, setLayers] = useState()

  // useEffect(() => {
  //   if (selectedCategory !== null){
  //     axios.get(`/api/v1/layers?categoryId=${selectedCategory?.id}`).then((res) => {
  //       console.log(res.data)
  //       setLayers(res.data.data)
  //       console.log(layers)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // }, [selectedCategory])

  return (
    <div className="flex flex-col min-h-screen w-screen bg-black text-white overflow-hidden animate-fadeIn">
      <div className="flex flex-1">
        <DashboardSidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <DashboardDisplay selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}