import dayjs from 'dayjs';
import { IEstablishment } from 'app/shared/model/establishment.model';
import { QuantityType } from 'app/shared/model/enumerations/quantity-type.model';

export interface IFood {
  id?: number;
  name?: string;
  description?: string;
  quantity?: number;
  quantityType?: QuantityType;
  originalPrice?: number;
  price?: number;
  dueDate?: string;
  imageContentType?: string;
  image?: string;
  establishment?: IEstablishment | null;
}

export const defaultValue: Readonly<IFood> = {};
