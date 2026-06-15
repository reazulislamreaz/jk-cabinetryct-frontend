"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks";
import useAuth from "@/hooks/useAuth";
import { useCreateOrderMutation } from "@/store/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotals,
} from "@/store/selectors/cartSelectors";
import { CartItem, clearCart } from "@/store/slices/cartSlice";
import { ICreateOrderRequest } from "@/types/order.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Package, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Breadcrumb } from "../../DashboardLayout/Breadcrumb";

const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
});

const PaymentShipping = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAuth();
  const cartItems: CartItem[] = useAppSelector(selectCartItems);
  const { subtotal } = useAppSelector(selectCartTotals);
  // Create order mutation
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();


  // Initialize form with user data
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      companyName: currentUser?.companyName || "",
      phoneNumber: currentUser?.phoneNumber || "",
      address: currentUser?.address || "",
      addressLine2: currentUser?.addressLine2 || "",
      email: currentUser?.email || "",
      country: currentUser?.country || "",
      city: currentUser?.city || "",
      state: currentUser?.state || "",
      zipCode: currentUser?.zipCode || "",
    },
  });

  // Special notes state
  const [notes, setNotes] = useState("");

  // Success dialog state
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState("");

  // Handle complete order
  const handleCompleteOrder = async (
    values: z.infer<typeof shippingAddressSchema>
  ) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Create order data with the required structure matching API format
    const orderData: ICreateOrderRequest = {
      items: cartItems.map((item) => ({
        partsId: item.part._id,
        quantity: item.quantity,
        isAssemblyPrice: item.isAssemblyPrice,
        totalPrice:
          (typeof item.part.price === "object"
            ? item.part.price[item.priceType] || item.part.price.wholesale || 0
            : item?.part?.price || 0) * item.quantity,
      })),
      subtotal,
      totalPrice: subtotal,
      shippingAddress: {
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName || "",
        phoneNumber: values.phoneNumber,
        address: values.address,
        addressLine2: values.addressLine2 || "",
        email: values.email,
        country: values.country,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      notes: notes || undefined,
    };

    try {
      const response = await createOrder(orderData).unwrap();
      if (response.success) {
        // Clear the cart
        dispatch(clearCart());
        // Store order number and show success dialog
        setCreatedOrderNumber(response.data.orderNumber);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  // Handle view orders click
  const handleViewOrders = () => {
    setShowSuccessDialog(false);
    router.push("/dashboard/orders");
  };

  // Handle view order details click
  const handleViewOrderDetails = () => {
    setShowSuccessDialog(false);
    router.push(`/dashboard/orders/${createdOrderNumber}`);
  };

  return (
    <section className="w-full px-5 py-8  bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Cart", href: "/cart" },
            { label: "Payment & Shipping" },
          ]}
        />

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Left Column - Shipping Address */}
          <div className="w-full h-fit bg-white rounded-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Shipping Address
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCompleteOrder)}
                className="space-y-4"
                id="shipping-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter company name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter street address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter apartment, suite, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter city"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                          State
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter state"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:text-primary after:ml-0.5">
                          ZIP Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter ZIP code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full h-fit bg-white rounded-lg p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment</h1>
            <p className="text-sm text-gray-500 mb-6">
              All transactions are secure and encrypted.
            </p>

            {/* Order Summary */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                        Item
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const itemPrice =
                        typeof item.part.price === "object"
                          ? item.part.price[item.priceType] ||
                            item.part.price.wholesale ||
                            0
                          : item.part.price || 0;
                      const assemblyCost = item.isAssemblyPrice
                        ? (item.part.assemblyPrice || 0) * item.quantity
                        : 0;

                      return (
                        <Fragment key={item.part._id}>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-2 text-sm text-gray-900">
                              {item.part.title}/{item.part.code}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-900 text-center">
                              {item.quantity}
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-900 text-right">
                              ${itemPrice.toFixed(2)}
                            </td>
                          </tr>
                          {item?.isAssemblyPrice && (
                            <tr className="border-b  border-gray-200 bg-gray-50">
                              <td className="py-2 px-2 text-sm text-gray-600 ">
                                Assembly
                              </td>
                              <td className="py-2 px-2 text-sm text-gray-600 text-center">
                                {item?.quantity}
                              </td>
                              <td className="py-2 px-2 text-sm text-gray-600 text-right">
                                ${assemblyCost.toFixed(2)}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions for your order..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  rows={3}
                />
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-xl pt-3 border-t border-gray-300">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="font-bold text-primary">
                  ${subtotal?.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Complete Order Button - Submit form when clicked */}
            <button
              className="w-full bg-primary text-white py-4 rounded-lg  cursor-pointer  transition-colors flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              form="shipping-form"
              disabled={isCreatingOrder || cartItems.length === 0}
            >
              {isCreatingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Complete Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Your order has been placed successfully.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Package className="h-5 w-5" />
              <span>Order Number:</span>
              <span className="font-semibold text-primary">
                {createdOrderNumber}
              </span>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            We&apos;ve sent a confirmation email to your registered email
            address. You can track your order status in your dashboard.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={handleViewOrderDetails}
              className="w-full bg-primary h-12 rounded hover:bg-primary/90 cursor-pointer"
            >
              <Package className="mr-2 h-4 w-4" />
              View Order Details
            </Button>
            <Button
              onClick={handleViewOrders}
              variant="outline"
              className="w-full h-12 rounded shadow-none cursor-pointer"
            >
              View All Orders
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PaymentShipping;
