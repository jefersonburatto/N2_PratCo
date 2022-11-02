import { IUser } from 'app/shared/model/user.model';

export interface IEstablishment {
  id?: number;
  name?: string;
  cnpj?: string;
  imageContentType?: string;
  image?: string;
  user?: IUser | null;
}

export const defaultValue: Readonly<IEstablishment> = {};
