import { useState, useEffect } from "react";
import CartItemCard from "./CartItemCard";
import CartPaymentInfo from "./CartPaymentInfo";
import {
  CartItem,
  getCartItems,
  updateCartQuantity,
  removeFromCart,
  removeSelectedItems,
  mergeDuplicateCartItems,
} from "@/lib/apis/cart";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/router";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/constants";

const CartForm = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const allChecked =
    cartItems.length > 0 && cartItems.every((item) => checkedItems[item.id]);

  // 장바구니 데이터 불러오기
  const fetchCartItems = async () => {
    try {
      setLoading(true);

      // 먼저 중복된 아이템들을 정리
      try {
        const result = await mergeDuplicateCartItems();
        if (result.mergedCount > 0) {
          console.log(
            `중복된 장바구니 아이템 ${result.mergedCount}개를 정리했습니다.`
          );
        }
      } catch (mergeError) {
        console.error("중복 정리 실패:", mergeError);
        // 중복 정리가 실패해도 장바구니는 불러와야 함
      }

      // 장바구니 아이템들 가져오기
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("장바구니 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    fetchCartItems();
  }, [isLoggedIn, router]);

  const handleItemCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAllCheck = () => {
    if (allChecked) {
      setCheckedItems({});
    } else {
      const newChecked: { [key: number]: boolean } = {};
      cartItems.forEach((item) => {
        newChecked[item.id] = true;
      });
      setCheckedItems(newChecked);
    }
  };

  // 수량 변경
  const handleQuantityChange = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartQuantity(cartItemId, quantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("수량 변경 실패:", error);
    }
  };

  // 개별 삭제
  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId);
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
      setCheckedItems((prev) => {
        const newChecked = { ...prev };
        delete newChecked[cartItemId];
        return newChecked;
      });
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    }
  };

  // 선택 삭제
  const handleRemoveSelected = async () => {
    const selectedIds = Object.entries(checkedItems)
      .filter(([checked]) => checked)
      .map(([id]) => parseInt(id));

    if (selectedIds.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    try {
      await removeSelectedItems(selectedIds);
      setCartItems((prev) =>
        prev.filter((item) => !selectedIds.includes(item.id))
      );
      setCheckedItems({});
    } catch (error) {
      console.error("선택 삭제 실패:", error);
    }
  };

  //개별주문
  const handleIndividualOrder = (cartItem: CartItem) => {
<<<<<<< HEAD
   const orderData = {
    items: [cartItem],
    totalPrice : parseInt(cartItem.product.price) * cartItem.quantity,
    shippingFee : parseInt(cartItem.product.price) * cartItem.quantity > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE,
   };
=======
    const orderData = {
      items: [cartItem],
      totalPrice: parseInt(cartItem.product.price) * cartItem.quantity,
      shippingFee:
        parseInt(cartItem.product.price) * cartItem.quantity > 50000 ? 0 : 3000,
    };
>>>>>>> 005840354a6f0ba975dfcf0dba2215ff70b247c8

    if (typeof window !== "undefined") {
      sessionStorage.setItem("orderData", JSON.stringify(orderData));
    }
    router.push("/order");
  };

  // 계산 (함수들보다 먼저 정의)
  const selectedItems = cartItems.filter((item) => checkedItems[item.id]);
  const totalPrice = selectedItems.reduce((sum, item) => {
    return sum + parseInt(item.product.price) * item.quantity;
  }, 0);
  const shippingFee = totalPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  // 주문하기
  const handleOrderClick = () => {
<<<<<<< HEAD
    
=======
>>>>>>> 005840354a6f0ba975dfcf0dba2215ff70b247c8
    if (selectedItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }

    // 선택된 상품 정보를 세션 스토리지에 저장
    const orderData = {
      items: selectedItems,
      totalPrice,
      shippingFee,
    };

    // 브라우저 환경에서만 세션스토리지 사용
    if (typeof window !== "undefined") {
      sessionStorage.setItem("orderData", JSON.stringify(orderData));
    }

    router.push("/order");
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 text-center">
        <div className="text-lg">장바구니를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-7xl px-4">
      <h1 className="text-2xl text-center border-b-2 py-3 mb-3 border-gray-200">
        장바구니
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-lg text-gray-600 mb-4">
            장바구니가 비어있습니다
          </div>
          <button
            onClick={() => router.push("/product")}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            쇼핑 계속하기
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-3 pt-6">
          <div className="font-bold text-sm">
            <div className="flex justify-between">
              <div>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleAllCheck}
                  className="mr-4 w-5 h-5 align-middle"
                />
                <span>
                  전체 선택 (
                  {Object.values(checkedItems).filter(Boolean).length}/
                  {cartItems.length})
                </span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleRemoveSelected}
                  className="underline hover:text-red-600"
                >
                  선택 삭제
                </button>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 p-6 lg:p-10 text-sm bg-bg/50 rounded-xl mb-7">
            {/* 상품 list */}
            <div className="flex flex-col space-y-6 w-full">
              {cartItems.map((cartItem) => (
                <CartItemCard
                  key={cartItem.id}
                  cartItem={cartItem}
                  checked={!!checkedItems[cartItem.id]}
                  onCheck={() => handleItemCheck(cartItem.id)}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onOrderClick={handleIndividualOrder}
                />
              ))}
            </div>

            <CartPaymentInfo
              totalPrice={totalPrice}
              shippingFee={shippingFee}
              onOrderClick={handleOrderClick}
              selectedItemsCount={selectedItems.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartForm;
