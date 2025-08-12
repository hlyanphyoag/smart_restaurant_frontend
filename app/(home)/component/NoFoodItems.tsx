import React from "react";

const NoFoodItems: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center">
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        No Delicious Dishes Found
      </h3>
      <p className="text-gray-500 mb-2">
        We couldn't find any food items matching your search or selection.
      </p>
      <p className="text-gray-400 text-sm">
        Try adjusting your search or check back later for new menu items!
      </p>
    </div>
  );
};

export default NoFoodItems;
