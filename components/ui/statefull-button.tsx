"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

interface ButtonProps
  extends Omit<
    React.ComponentProps<typeof motion.button>,
    "onDrag" | "onDragStart" | "onDragEnd"
  > {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const StatefullButton = ({
  className,
  children,
  isLoading,
  isSuccess,
  ...props
}: ButtonProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateStates = async () => {
      if (isLoading) {
        // Show loader and hide check
        await Promise.all([
          animate(
            ".loader",
            { width: 20, scale: 1, opacity: 1 },
            { duration: 0.2 }
          ),
          animate(
            ".check",
            { width: 0, scale: 0, opacity: 0 },
            { duration: 0.1 }
          ),
        ]);
      } else if (isSuccess) {
        // First hide loader if it's visible
        await animate(
          ".loader",
          { width: 0, scale: 0, opacity: 0 },
          { duration: 0.2 }
        );

        // Then show checkmark
        await animate(
          ".check",
          { width: 20, scale: 1, opacity: 1 },
          { duration: 0.3 }
        );

        // After delay, hide checkmark
        setTimeout(async () => {
          await animate(
            ".check",
            { width: 0, scale: 0, opacity: 0 },
            { duration: 0.2 }
          );
        }, 2000);
      } else {
        // Reset both icons to hidden state
        await Promise.all([
          animate(
            ".loader",
            { width: 0, scale: 0, opacity: 0 },
            { duration: 0.1 }
          ),
          animate(
            ".check",
            { width: 0, scale: 0, opacity: 0 },
            { duration: 0.1 }
          ),
        ]);
      }
    };

    animateStates();
  }, [isLoading, isSuccess, animate]);

  return (
    <motion.button
      ref={scope}
      className={cn(
        "flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-green-500 dark:ring-offset-black",
        className,
        {
          "opacity-75 cursor-not-allowed": isLoading,
        }
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Loader />
        <CheckIcon />
        <span>{children}</span>
      </div>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <motion.svg
      initial={{ width: 0, scale: 0, opacity: 0 }}
      className="loader text-white"
      animate={{ rotate: 360 }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{ width: 0, scale: 0, opacity: 0 }}
      className="check text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
