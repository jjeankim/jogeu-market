export type Product = {
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
  shippingFee?: number;
  showShippingInfo?: boolean;
};

export type CartItemType = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: string;
    productCode: string;
    thumbnailImageUrl: string | null;
    detailDescription: string;
    isSample: boolean;
    samplePrice: string;
    stockQuantity: number;
    brand: {
      id: number;
      name: string;
    };
  };
};

export type CartPayProps = {
  totalPrice: number;
  shippingFee: number;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: string;
  product: {
    id: number;
    name: string;
    price: string;
    productCode: string;
    thumbnailImageUrl: string;
    detailDescription: string;
    isSample: boolean;
    samplePrice: string;
    brand: {
      id: number;
      name: string;
    };
  };
};

export type Order = {
  id: number;
  totalAmount: string;
  shippingFee: string;
  orderItems: OrderItem[];
};

export type OrderResponse = {
  id: number;
  orderNumber: string;
  userId: number;
  shippingAddressId: number;
  couponId: number | null;
  totalAmount: string;
  shippingFee: string;
  paymentStatus: string;
  paymentMethod: string;
  deliveryMessage: string;
  isSample: boolean;
  orderedAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    name: string;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
  };
  address: {
    id: number;
    userId: number;
    recipientName: string;
    recipientPhone: string;
    addressLine1: string;
    addressLine2: string | null;
    postCode: string;
    isDefault: boolean;
  };
  orderItems: OrderItem[];
};
