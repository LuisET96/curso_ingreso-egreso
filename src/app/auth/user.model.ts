interface UserObj {
  nombre: string;
  email: string;
  uid: string;
}

export class User {
  constructor(
    public nombre: string,
    public email: string,
    public uid: string
  ) { }
}
