import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import Home from "./Home/Home";

type Props = {};
type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }
    };
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
    
    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            < Home />
          </div> : null}
      </div>
    );
  }
}