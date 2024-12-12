export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  mobileNo?: number;
}

export interface Customer extends User {
  isPremium: boolean;
}

export interface Vendor extends User {
  isAdmin: boolean;
}