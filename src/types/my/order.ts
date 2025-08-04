import { ReactNode } from "react";

export interface OrderStatusCount {
  count: number;
  status: string;
}

export interface MyPageOrderStatusCardProps {
  children: ReactNode;
}