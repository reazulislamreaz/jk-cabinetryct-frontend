export interface IParts {
  _id: string;
  title: string;
  code: string;
  description: string;
  mainImage: string;
  images: string[];
  slug: string;
  stockItemId: string;
  stockItemTitleId: string;
  price: {
    wholesale: number;
    wholesaleWithTenPercent: number;
    contractor: number;
  };
  assemblyPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
