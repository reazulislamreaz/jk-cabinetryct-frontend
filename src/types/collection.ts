export interface ICollection {
  _id: string;
  name: string;
  code: string;
  color: string;
  slug: string;
  description: string;
  createdBy: string;
  mainImage: string;
  images: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
