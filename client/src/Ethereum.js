import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
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
    somme_eth_bought: 0,
    nb_achat_eth: 0,
    avg_achat_eth: 0,
    eth_by_date: [],
    eth_evol_price: [],
    eth_cumsum: [],
    eth_cumsum_eur: []
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    fetch(`/use/users/${params.id}/sommeavg`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(user => user[0].avg)
      .then(user => this.setState({ user: `${user}` }))
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
    fetch(`/use/users/${params.id}/eth/nbachat`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(user => user[0].count)
      .then(data => this.setState({ nb_achat_eth: `${data}` }))
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
    fetch(`/use/users/${params.id}/eth/somme`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(user => user[0].sum)
      .then(data => this.setState({ somme_eth_bought: `${data}` }))
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
    fetch(`/use/users/${params.id}/eth/avgachat`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(user => user[0].avg)
      .then(data => this.setState({ avg_achat_eth: `${data}` }))
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
    fetch(`/use/users/${params.id}/eth/buydate`, { credentials: "include" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        this.setState({ eth_by_date: data });
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

    fetch(`/use/users/${params.id}/eth/evolprice`, { credentials: "include" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        this.setState({ eth_evol_price: data });
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
    fetch(`/use/users/${params.id}/eth/cumsumeth`, { credentials: "include" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        this.setState({ eth_cumsum: data });
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
    fetch(`/use/users/${params.id}/eth/cumsumetheur`, { credentials: "include" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        this.setState({ eth_cumsum_eur: data });
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
  }

  toggle = () => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }
  fees = () => {
    this.props.history.push(`/users/${sessionStorage.user_id}/fees`, {});
  };
  bitcoin = () => {
    this.props.history.push(`/users/${sessionStorage.user_id}/bitcoin`, {});
  };
  general = () => {
    this.props.history.push(`/users/${sessionStorage.user_id}/general`, {});
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
      <Router forceRefresh={true}>
        <div>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret color="danger">
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
              <DropdownItem onClick={this.general}>Informations Générales</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <br />
          <h2 style={{ textAlign: "center", textDecoration: "underline" }}>Ethereum</h2>
          <br /><br />
          <p>Prix moyen d'entrée sur Ethereum : {this.state.user} €</p>
          <p>Somme totale d'Ethereum achetée : {this.state.somme_eth_bought} €</p>
          <p>Nombre total d'achat sur Ethereum : {this.state.nb_achat_eth} achats </p>
          <p>Somme moyenne achetée sur Ethereum : {this.state.avg_achat_eth} €</p>
          <br /><br />
          <p style={{ textAlign: "center", fontSize: "155%" }}>Somme investie en ether en fonction du temps : </p>
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
              data={this.state.eth_by_date}
              x="timestamp"
              y="traded_currency"
            />
            <VictoryAxis tickFormat={x => this.timeConverter(x)} label="Date" />
            <VictoryAxis dependentAxis tickFormat={x => `${x} €`} />
          </VictoryChart>
          <br /><br />
          <p style={{ textAlign: "center", fontSize: "155%" }}>Cours de l'ethereum en fonction du temps : </p>
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
              data={this.state.eth_evol_price}
              x="timestamp"
              y="price"
            />
            <VictoryAxis tickFormat={x => this.timeConverter(x)} label="Date" />
            <VictoryAxis dependentAxis tickFormat={x => `${x} €`} />
          </VictoryChart>
          <br /><br />
          <p style={{ textAlign: "center", fontSize: "155%" }}>Somme cumulée d'ether en possession : </p>
          <VictoryChart
            containerComponent={
              <VictoryCursorContainer
                cursorLabel={({ datum }) => `${this.timeConverter(datum.x)},  ${datum.y} ethers`} />}
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
              data={this.state.eth_cumsum}
              x="timestamp"
              y="cumsum"
            />
            <VictoryAxis tickFormat={x => this.timeConverter(x)} label="Date" />
            <VictoryAxis dependentAxis />
          </VictoryChart>
          <br /><br />
          <p style={{ textAlign: "center", fontSize: "155%" }}>Somme cumulée d'euros en possession : </p>
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
              data={this.state.eth_cumsum_eur}
              x="timestamp"
              y="cumsum"
            />
            <VictoryAxis tickFormat={x => this.timeConverter(x)} label="Date" />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
      </Router>
    )
  }
}
export default app 