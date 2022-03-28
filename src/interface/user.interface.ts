import { UserRole } from 'src/enums/user-role.enum';


export interface User {
  id: any;
  email: string;
  fullName: string;
  registrationDate: Date;
  userRole: UserRole;
}
