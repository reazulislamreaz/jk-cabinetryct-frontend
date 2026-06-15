import { IParts } from "./types/parts";

export interface ITitles {
  titleId: string;
  titleName: string;
  parts: IParts[];
}
export interface IStockItemResponse {
  code: string;
  message: string;
  data: [{ stockItemId: string; stockItemName: string; titles: ITitles[] }];
}
