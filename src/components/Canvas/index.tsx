import React from "react";
import "./index.css";
import { CircularProgress } from "@mui/material";
import {
  useConnectedWallet,
} from "@xpla/wallet-provider";
import CanvasPainter from "./CanvasPainter";
import useContractConfig from "../useQuery/useContractConfig";

export interface Dot {
  X: number;
  Y: number;
  backgroundColor: string;
  dotOwner? : string;
  lock_amount? : string;
  painted_block? : number;
}

const Canvas = () => {
  const contractAddress =
    "xpla1zl5c2yh468uksrxxz92xfuzcmgvpsc65pvr0ny4fq282twua2p7qqked4x";
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



