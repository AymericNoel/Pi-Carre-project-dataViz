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
        total_btc: 0,
        total_bought_btc: 0,
        nbachat: 0,
        avg_achat: 0,
        avg_entry: 0,
        btc_price_evol: []
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        fetch(`/use/users/${params.id}/btc/total_btc`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => data[0].sum)
            .then(data => this.setState({ total_btc: `${data}` }))
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
        fetch(`/use/users/${params.id}/btc/evolution_price`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                this.setState({ btc_price_evol: data });
            })
            .catch(err => {
                err.json().then(errMess => {
                    if (errMess.message === "Un-Authorized User") {
                        this.props.history.push(`/users/${sessionStorage.user_id}`, {});
                        window.location.reload();
                    }
                    else {
                        this.props.history.push("/login", {})
                    }
                })

            });
        fetch(`/use/users/${params.id}/btc/totalSum_btc`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => data[0].sum)
            .then(data => this.setState({ total_bought_btc: `${data}` }))
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
        fetch(`/use/users/${params.id}/btc/nbachat`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => data[0].count)
            .then(data => this.setState({ nbachat: `${data}` }))
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
        fetch(`/use/users/${params.id}/btc/avgachat`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => data[0].avg)
            .then(data => this.setState({ avg_achat: `${data}` }))
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
        fetch(`/use/users/${params.id}/btc/avgentry`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => data[0].avg)
            .then(data => this.setState({ avg_entry: `${data}` }))
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
    toggle = () => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }
    fees = () => {
        this.props.history.push(`/users/${sessionStorage.user_id}/fees`, {});
    };
    ethereum = () => {
        this.props.history.push(`/users/${sessionStorage.user_id}/ethereum`, {});
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
                            <DropdownItem onClick={this.ethereum}>
                                Informations Ethereum
                        </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.fees}>
                                Informations Fees
                        </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.general}>Informations générales</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <br />
                    <h2 style={{ textAlign: "center" , textDecoration : "underline"}}>Bitcoin </h2>
                    <br/><br/>
                    <p>Nombre de bitcoins en possesion : {this.state.total_btc} bitcoins</p>
                    <p>Somme totale dépensée : {this.state.total_bought_btc} €</p>
                    <p>Somme moyenne depensée lors des achats : {this.state.avg_achat} €</p>
                    <p>Nombre d'achats effectués : {this.state.nbachat} </p>
                    <p>Prix d'entrée moyen sur bitcoin : {this.state.avg_entry} € </p>
                    <br /><br/>
                    <p style={{ textAlign: "center", fontSize: "155%" }}>Evolution du prix du bitcoin en fonction du temps : </p>                   
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
                        }}>
                        <VictoryLine
                            style={{
                                data: { stroke: "tomato" }
                            }}
                            data={this.state.btc_price_evol}
                            x="timestamp"
                            y="price"
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