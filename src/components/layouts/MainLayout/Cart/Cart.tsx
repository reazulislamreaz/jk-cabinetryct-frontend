"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotals,
} from "@/store/selectors/cartSelectors";
import {
  removeFromCart,
  toggleAssembly,
  updateQuantity,
} from "@/store/slices/cartSlice";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "../../DashboardLayout/Breadcrumb";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { subtotal, itemCount } = useAppSelector(selectCartTotals);

  const handleUpdateQuantity = (partId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ partId, quantity: newQuantity }));
  };

  const handleRemoveItem = (partId: string) => {
    dispatch(removeFromCart(partId));
  };

  const handleToggleAssembly = (partId: string) => {
    dispatch(toggleAssembly(partId));
  };

  return (
    <section className="w-full px-4 sm:px-5 py-6 sm:py-8 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: "Cart" }]} />
        <div className="w-full mt-6 sm:mt-10">
          {cartItems.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="px-2 sm:px-6 py-4 space-y-4">
                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.part._id}
                    className="border border-gray-100 rounded-lg p-3 sm:p-5 transition-shadow bg-white"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <Image
                        src={`${cartItem?.part?.mainImage || '/placeholder-image.jpg'}`}
                        alt={cartItem?.part?.title || 'Product image'}
                        width={150}
                        height={96}
                        className="object-cover rounded-xl w-full sm:w-[150px] h-[150px] sm:h-24"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                              {cartItem?.part?.title}/{cartItem?.part?.code}
                            </h3>
                          </div>
                          <button
                            onClick={() =>
                              handleRemoveItem(cartItem?.part?._id || '')
                            }
                            className="text-gray-400 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                          <div className="space-y-2 w-full sm:w-auto">
                            <p className="text-sm text-gray-600">
                              Price:{" "}
                              <span className="font-semibold text-gray-900">
                                ${" "}
                                {(typeof cartItem?.part?.price === "object"
                                  ? cartItem?.part?.price?.[cartItem.priceType] ||
                                    cartItem?.part?.price?.wholesale ||
                                    0
                                  : cartItem?.part?.price || 0
                                ).toFixed(2)}
                              </span>
                            </p>

                            <div className="flex flex-col gap-2">
                              <span className="text-sm sm:text-base font-medium text-gray-600">
                                Quantity:
                              </span>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      cartItem?.part?._id || '',
                                      cartItem?.quantity - 1
                                    )
                                  }
                                  disabled={cartItem?.quantity <= 1}
                                  className="border border-secondary rounded-full size-8  flex items-center justify-center cursor-pointer disabled:opacity-50"
                                >
                                  <Minus className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                                </button>
                                <span className="text-base sm:text-lg text-center text-gray-700 w-16 sm:w-20 h-8 sm:h-9 border border-secondary rounded flex items-center justify-center">
                                  {cartItem?.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      cartItem?.part?._id || '',
                                      cartItem?.quantity + 1
                                    )
                                  }
                                  className="border border-secondary rounded-full size-8  flex items-center justify-center cursor-pointer"
                                >
                                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="text-left sm:text-right w-full sm:w-auto">
                            <p className="text-base  font-bold text-gray-900">
                              Total: $
                              {(
                                (typeof cartItem?.part?.price === "object"
                                  ? cartItem?.part?.price?.[cartItem.priceType] ||
                                    cartItem?.part?.price?.wholesale ||
                                    0
                                  : cartItem?.part?.price || 0) *
                                cartItem?.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Assembly Checkbox */}
                    <div className="mt-4 pt-3 bg-[#F6F6F6] p-3 sm:p-5 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`assembly-${cartItem?.part?._id || ''}`}
                          checked={cartItem?.isAssemblyPrice}
                          onCheckedChange={() =>
                            handleToggleAssembly(cartItem?.part?._id || '')
                          }
                        />
                        <Label
                          htmlFor={`assembly-${cartItem?.part?._id || ''}`}
                          className="font-semibold text-secondary cursor-pointer text-sm"
                        >
                          <span className="text-primary">Assembly</span> (per
                          quantity)
                        </Label>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {cartItem?.isAssemblyPrice
                          ? `$${(
                              cartItem?.quantity *
                              (cartItem?.part?.assemblyPrice || 0)
                            ).toFixed(2)}`
                          : "$0.00"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="px-2 sm:px-6 py-4">
                <div className="bg-primary/10 p-3 sm:p-4 rounded-lg space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <span className="text-base sm:text-lg font-bold text-primary">
                      Sub-Total:
                    </span>
                    <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="px-2 sm:px-6 py-4">
                <Link href="/payment-shipping">
                  <button className="w-full bg-primary text-white py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all cursor-pointer text-sm sm:text-base">
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                    Checkout ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </button>
                </Link>
              </div>
            </>
          ) : (
            // Empty cart state
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="text-center max-w-md">
                <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-700 mb-3">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven&apos;t added any products to your cart
                  yet.
                </p>
                <Link href="/cabinet-lines">
                  <button className="bg-primary cursor-pointer text-white py-3 px-8 rounded-lg  hover:bg-primary/90 transition-colors">
                    Browse Products
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
