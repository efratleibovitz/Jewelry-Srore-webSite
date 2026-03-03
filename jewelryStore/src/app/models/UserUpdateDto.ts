// models/user-update.model.ts
export interface UserUpdateDto {
  id: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  phone: string;     // וודאי שזה תואם לשם ב-C#
  city: string;
  street: string;
  houseNumber: number;
}