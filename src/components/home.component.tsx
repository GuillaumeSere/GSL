import { Component } from "react";
import UserService from "../services/user.service";
import  background  from "../images/background.png";

type Props = {};
type State = {
  content: string;
}
export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  render() {
    return (
      <div className="content">
        <div className="content-text">
            <h2>Veuillez vous connecter<br/> pour localiser<br/> des restaurants<br/> proche de<br/>votre position</h2>
            <img className="background" src={background} alt="" />
        </div>
       <div className="card-bg"></div>
      </div>
    );
  }
}