export interface Sale {
  _id: string;
  salePrice: string;
  saleDate: Date;
  buyerName: string;
  propertyId: string;
  sellerId: string;
  __v: number;
}