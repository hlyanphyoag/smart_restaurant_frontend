import Lottie from "lottie-react";

export const Loading = () => (
    <div className="flex items-center justify-center">
    <div className="h-60 w-60">
    <Lottie
      animationData={require("@/public/loading.json")}
      loop={true}
      autoPlay={true}
      size={100}
    />
    </div>
  </div>
)