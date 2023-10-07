export interface IUserType {
  email: string;
  password: string;
}
export interface IUserRegisterType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  date: any;
}

export interface ITicketForm {
  takeOff: string;
  arrival: string;
  travelHistory: any;
}

export interface ISeatDataType {
  id: number;
}

export interface IPayment {
  cardNo: string;
  cvc: string;
  date: string;
  month: string;
}
