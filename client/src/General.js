import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryCursorContainer
} from "victory";

class app extends Component {
  state = {
    user: [],
    dropdownOpen: false,
    datas: null,
    nb_total_achat: 0,
    avg_per_achat: 0
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    fetch(`/use/users/${params.id}/buydate`, { credentials: "include" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        this.setState({ datas: data });
      })
      .catch(err => {
        err.json().then(errMess => {
          if (errMess.message === "Un-Authorized User") {
            this.props.history.push(`/users/${sessionStorage.user_id}`, {});
            window.location.reload();
          } else {
            this.props.history.push("/login", {});
          }
        });
      });
    fetch(`/use/users/${params.id}/sommeavg2`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => data[0].avg)
      .then(data => this.setState({ avg_per_achat: `${data}` }))
      .catch(err => {
        err.json().then(errMess => {
          console.log("error : ", errMess.message);
          if (errMess.message === "Un-Authorized User") {
            this.props.history.push(`/users/${sessionStorage.user_id}`, {});
            window.location.reload();
          }
          else {
            this.props.history.push("/login", {})
          }
        })

      });
    fetch(`/use/users/${params.id}/somme`, { credentials: "include" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(user => user[0].sum)
      .then(user => this.setState({ user: `${user}` }))
      .catch(err => {
        err.json().then(errMess => {
          if (errMess.message === "Un-Authorized User") {
            this.props.history.push(`/users/${sessionStorage.user_id}`, {});
            window.location.reload();
          } else {
            this.props.history.push("/login", {});
          }
        });
      });
    fetch(`/use/users/${params.id}/somme2`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => data[0].count)
      .then(data => this.setState({ nb_total_achat: `${data}` }))
      .catch(err => {
        err.json().then(errMess => {
          console.log("error : ", errMess.message);
          if (errMess.message === "Un-Authorized User") {
            this.props.history.push(`/users/${sessionStorage.user_id}`, {});
            window.location.reload();
          }
          else {
            this.props.history.push("/login", {})
          }
        })

      });
  }
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  fees = () => {
    this.props.history.push(`/users/${sessionStorage.user_id}/fees`, {});
  };
  ethereum = () => {
    this.props.history.push(`/users/${sessionStorage.user_id}/ethereum`, {});
  };
  bitcoin = () => {
    this.props.history.push(`/users/${sessionStorage.user_id}/bitcoin`, {});
  };
  main = () => {
    this.props.history.push(`/users/${sessionStorage.user_id}`, {});
  };
  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }
  render() {
    return (
      <Router forceRefresh={false}>
        <div>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              caret
              color="danger"
              style={{
                minWidth: "150px",
                maxWidth: "150%",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Mes Choix
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.main}>
                Page d'accueil
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.bitcoin}>
                Informations Bitcoin
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.fees}>
                Informations Fees
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.ethereum}>Informations Ethereum</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <br />
          <h2 style={{ textAlign: "center", textDecoration : "underline" }}>Informations générales</h2>
          <br/><br/>
          <p>Somme totale investie : {this.state.user} €</p>
          <p>Nombre d'achat total : {this.state.nb_total_achat}</p>
          <p>Moyenne depensée par achat : {this.state.avg_per_achat} €</p>
          <br/><br/>
          <p style={{
            textAlign: "center",
            fontSize: "155%"
          }}>Somme investie par jour toutes cryptomonnaies confondues</p>
          <VictoryChart
            containerComponent={
              <VictoryCursorContainer
                cursorLabel={({ datum }) => `${this.timeConverter(datum.x)},  ${datum.y} €`} />}
            scale={{ x: "timestamp" }}
            domainPadding={1}
            width={1000}
            height={300}
            style={{
              parent: {
                minWidth: "40px",
                maxWidth: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                domainPadding: "10"
              }
            }}
          >
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={this.state.datas}
              x="timestamp"
              y="traded_currency"
            />
            <VictoryAxis tickFormat={x => this.timeConverter(x)} label="Date" />
            <VictoryAxis dependentAxis tickFormat={x => `${x} €`} />
          </VictoryChart>
        </div>
      </Router>
    );
  }
}
export default app;
