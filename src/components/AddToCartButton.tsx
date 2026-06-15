"use client";
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { selectIsInCart } from '@/store/selectors/cartSelectors';
import { toast } from '@/hooks';
import { IParts } from '@/types/parts';

interface AddToCartButtonProps {
  part: IParts;
  quantity?: number;
  priceType?: 'wholesale' | 'wholesaleWithTenPercent' | 'contractor';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export default function AddToCartButton({
  part,
  quantity = 1,
  priceType = 'wholesale',
  variant = 'default',
  className,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector(selectIsInCart(part._id));

  const handleAddToCart = () => {
    if (isInCart) return;

    dispatch(
      addToCart({
        part,
        quantity,
        isAssemblyPrice: false,
        priceType,
      })
    );

    toast.success(`${part.title} added to cart!`);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isInCart}
      variant={isInCart ? 'secondary' : variant}
      className={className}
    >
      {isInCart ? (
        <>
          <Check className="mr-2 h-4 w-4" /> In Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
    </Button>
  );
}