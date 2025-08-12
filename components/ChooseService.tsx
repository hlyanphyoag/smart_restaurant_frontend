import React, { useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, ForkKnife, ShoppingBag } from "lucide-react";
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

  const addressRef = useRef<HTMLInputElement>(null);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const address = addressRef.current?.value;
    if (!address) return;
    router.push(`/take-away?address=${address}`);
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
              <DialogContent>
                <DialogHeader className="flex flex-col gap-2">
                  <DialogTitle className="text-xl font-bold">
                    Take Away
                  </DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Order ahead and collect when ready
                  </DialogDescription>
                </DialogHeader>
                <Input ref={addressRef} placeholder="Enter your address" />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleSubmit} variant="customize">
                      Let's Select Food
                    </Button>
                  </DialogClose>
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
