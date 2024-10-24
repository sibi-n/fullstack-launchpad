import { PropsWithChildren } from "react";

function CustomButton({
  children,
  clickListener,
}: PropsWithChildren<{
  clickListener: () => void;
}>) {  
  return <div onClick={clickListener}>{children}</div>;
}

export default CustomButton;
