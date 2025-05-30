import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
