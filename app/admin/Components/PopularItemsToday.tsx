import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  popularItems: any[];
}

const PopularItemsToday: React.FC<Props> = ({ popularItems }) => (
  <section className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold mb-4">Popular Items Today</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {popularItems.map((item, index) => (
        <Card key={index} className="hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium line-clamp-1">
              {item.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              Ordered {item.quantity} times
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default PopularItemsToday;
