import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  popularItems: any[];
}

const PopularItemsToday: React.FC<Props> = ({ popularItems }) => (
  <section className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-slate-200/50 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-slate-700">Popular Items Today</h3>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-500 font-medium">Live Data</span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {popularItems.map((item, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200/50 bg-white/60 backdrop-blur-sm hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-700 line-clamp-1 group-hover:text-slate-900 transition-colors">
                {item.name}
              </CardTitle>
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xl font-bold text-slate-800 group-hover:scale-105 transition-transform duration-200">
              {item.price.toFixed(2)} MMK
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((item.quantity / Math.max(...popularItems.map(p => p.quantity))) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {item.quantity} orders today
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default PopularItemsToday;
