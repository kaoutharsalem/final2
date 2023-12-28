// user.model.ts

export class User {
  $key: string = '';
  firstname: string = '';
  lastname: string = '';
  Cin: string = '';
  phonenumber: string = '';
  email: string = '';
  password: string = '';
  image: string = '';
  UserId: string = '';
  presence: Presence[] = [];
}

export class Presence {
  date: string = '';
}
