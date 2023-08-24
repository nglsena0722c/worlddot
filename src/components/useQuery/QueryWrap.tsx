import React from "react";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const QueryWrap = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryWrap;
