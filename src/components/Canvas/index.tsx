import React from "react";
import "./index.css";
import { CircularProgress } from "@mui/material";
import {
  useConnectedWallet,
} from "@xpla/wallet-provider";
import CanvasPainter from "./CanvasPainter";
import useContractConfig from "../useQuery/useContractConfig";
import contractAddress from "../contractAddress";

export interface Dot {
  X: number;
  Y: number;
  backgroundColor: string;
  dotOwner? : string;
  lock_amount? : string;
  painted_block? : number;
  unlocked?: boolean;
}

const Canvas = () => {
  const { isLoading, data } = useContractConfig(contractAddress);
  const connectedWallet = useConnectedWallet();

  return isLoading ? (
    <CircularProgress />
  ) : !connectedWallet ? (
    <div>Connect Your Wallet</div>
  ) : (
    <CanvasPainter
      configData={data}
      connectedWallet={connectedWallet}
      contractAddress={contractAddress}
    />
  );
};

export default Canvas;



