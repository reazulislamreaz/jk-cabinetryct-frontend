export interface ICabinetry {
  _id: string;
  name: string;
  code: string;
  color: string;
  slug: string;
  mainImage: string;
  description: string;
  createdBy: string;
  images: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICabinetryCategory {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICabinetryLineResponse {
  categoryName: string;
  categoryId: string;
  cabinetryDatas: [ICabinetry];
  isDeleted: boolean;
}

export interface ICabinetryDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICabinetry;
}
