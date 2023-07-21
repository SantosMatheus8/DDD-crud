export class User {
  private _id?: number;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(name: string, email: string, password: string, id?: number) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._email.length === 0) {
      throw new Error("Email is required");
    }
    if (this._password.length === 0) {
      throw new Error("Password is required");
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  set password(password: string) {
    this._password = password;
  }
}
