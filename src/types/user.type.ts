export default interface IUser {
    id?: any | null,
    username?: string | any,
    email?: string | any,
    password?: string | any,
    roles?: Array<string>
  }