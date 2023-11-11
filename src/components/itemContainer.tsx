import { ReactElement } from "react";
import Divider from "@mui/material/Divider";

interface ItemContainerProps {
  children: ReactElement;
}

const ItemContainer: React.FC<ItemContainerProps> = ({ children }) => {
  return (
    <div>
      <Divider />
      <p
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default ItemContainer;
