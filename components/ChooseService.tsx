import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, ForkKnife, LocateIcon, MapPin, ShoppingBag, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const ChooseService = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');

  const addressRef = useRef<HTMLInputElement>(null);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addressValue = address || addressRef.current?.value;
    if (!addressValue) return;
    router.push(`/take-away?address=${addressValue}`);
  };

  return (
    <div className="flex flex-col gap-6 bg-neutral-50  justify-center items-center  text-center rounded-2xl p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Choose your service</h1>
        <p className="text-gray-500">
          select how you would like to enjoy your meal
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex items-center justify-center">
          <CardHeader className="flex items-center justify-center border bg-green-300 text-white border-gray-200 w-20 h-20  rounded-full">
            <div className="flex items-center justify-center">
              <ForkKnife />
            </div>
          </CardHeader>
          <CardContent className="w-70 flex flex-col justify-center items-center gap-1">
            <h2 className="text-xl font-bold">Dine In</h2>
            <small className="text-gray-500">Choose your table and enjoy</small>
            <Link href="/dine-in" className="mt-2">
              <Button
                variant="customize"
                className="rounded-2xl cursor-pointer border border-gray-200"
              >
                Dine in
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center">
          <CardHeader className="flex items-center justify-center border bg-green-300 text-white border-gray-200 w-20 h-20  rounded-full">
            <div className="flex items-center justify-center">
              <ShoppingBag />
            </div>
          </CardHeader>
          <CardContent className="w-70 flex flex-col justify-center items-center gap-1">
            <h2 className="text-xl font-bold">Take Away</h2>
            <small className="text-gray-500">
              Order ahead and collect when ready
            </small>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="submit"
                  variant="customize"
                  className="rounded-2xl mt-2 cursor-pointer border border-gray-200"
                >
                  Take Away
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                {/* Enhanced Dialog Header */}
                <DialogHeader className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <DialogTitle className="text-xl font-bold text-gray-900">
                        Delivery Location
                      </DialogTitle>
                      <DialogDescription className="text-sm text-gray-500">
                        Where should we deliver your order?
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                {/* Enhanced Content */}
                <div className="py-4 space-y-2">
                  {/* Address Input */}
                  <div className="flex flex-col space-y-4">
                    <label className="text-sm font-medium text-gray-700">Enter your delivery address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        ref={addressRef}
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street address, area, city..."
                        className="pl-10 pr-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Footer */}
                <DialogFooter className="border-t border-gray-100 pt-4 space-y-3 gap-2">
                  <div className="flex flex-col gap-2 w-full">
                  <DialogClose asChild>
                    <Button
                      onClick={handleSubmit}
                      disabled={!address.trim()}
                      variant="customize"
                      className="w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue to Menu
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </DialogClose>
                  
                  {/* Delivery Info */}
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      Estimated delivery: 25-35 minutes
                    </p>
                  </div>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChooseService;