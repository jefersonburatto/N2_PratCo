import { IEstablishment } from 'app/shared/model/establishment.model';

export interface IAddress {
  id?: number;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  establishment?: IEstablishment | null;
}

export const defaultValue: Readonly<IAddress> = {};
