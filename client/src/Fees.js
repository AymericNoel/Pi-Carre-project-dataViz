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

//inutil
class app extends Component {
    state = {
        dropdownOpen: false,
        btc_timestamp: null,
        total_btc: null,
        total_btc_paymium: null,
        total_btc_bitstamp: null,
        fees_btcPaymium_vs_price: null,
        fees_btcBitstamp_vs_price: null,
        eth_total: null,
        eth_timestamp: null
    };
    componentDidMount() {
        const {
            match: { params }
        } = this.props;
        fetch(`/use/users/${params.id}/fees/timestamp_btc`, { credentials: "include" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                this.setState({ btc_timestamp: data });
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
        fetch(`/use/users/${params.id}/fees/eth_timestamp`, {
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                this.setState({ eth_timestamp: data });
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
        fetch(`/use/users/${params.id}/fees/btc_paymium_vs_price`, {
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                this.setState({ fees_btcPaymium_vs_price: data });
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
        fetch(`/use/users/${params.id}/fees/btc_bitstamp_vs_price`, {
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                this.setState({ fees_btcBitstamp_vs_price: data });
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

        fetch(`/use/users/${params.id}/fees/total_btc`, { credentials: "include" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(result => {
                console.log("resultat", result);
                this.setState({ total_btc: result });
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

        fetch(`/use/users/${params.id}/fees/total_eth`, {
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(result => {
                this.setState({ eth_total: result });
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
        fetch(`/use/users/${params.id}/fees/total_btc_paymium`, {
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(result => {
                this.setState({ total_btc_paymium: result });
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

        fetch(`/use/users/${params.id}/fees/total_btc_bitstamp`, {
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(result => {
                this.setState({ total_btc_bitstamp: result });
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
    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };
    ethereum = () => {
        this.props.history.push(`/users/${sessionStorage.user_id}/ethereum`, {});
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
    };
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
                            <DropdownItem onClick={this.ethereum}>
                                Informations Ethereum
                        </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.general}>Informations générales</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <br />
                    <h2 style={{ textAlign: "center", textDecoration: "underline" }}>Fees</h2>
                    <br /><br />
                    <p style={{
                        fontSize: "135%"
                    }}>Fees totales : {this.state.total_btc + this.state.eth_total} € </p>
                    <p style={{
                        fontSize: "120%",
                        textIndent: "4%"
                    }}
                    >-Fees totales pour l'achat de bitcoin : {this.state.total_btc} € </p>
                    <p
                        style={{
                            fontSize: "110%",
                            textIndent: "9%"
                        }}
                    >*Dont {this.state.total_btc_paymium} €  pour l'exchange Paymium</p>
                    <p
                        style={{
                            fontSize: "110%",
                            textIndent: "9%"
                        }}
                    >*Dont {this.state.total_btc_bitstamp} €  pour l'exchange Bitstamp</p>
                    <p
                        style={{
                            fontSize: "120%",
                            textIndent: "4%"
                        }}
                    >-Fees totales pour l'achat d'ethereum : {this.state.eth_total} € </p>
                    <br /><br />
                    <p style={{ textAlign: "center", fontSize: "155%" }}>Fees payées pour acheter du Bitcoin en fonction du temps : </p>
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
                                domainPadding: "40"
                            }
                        }}>
                        <VictoryLine
                            data={this.state.btc_timestamp}
                            x="timestamp"
                            y="fees_price"
                        />
                        <VictoryAxis tickFormat={x => this.timeConverter(x)} label="Date" />
                        <VictoryAxis dependentAxis tickFormat={x => `${x} €`} />
                    </VictoryChart>
                    <br /><br />
                    <p style={{ textAlign: "center", fontSize: "155%" }}>Superposition des fees : en jaune les fees totales bitcoin, en bleu les fees bitstamp et en rouge les fees paymium</p>
                    <VictoryChart
                        containerComponent={
                            <VictoryCursorContainer
                                cursorLabel={({ datum }) => `${datum.x}€,  ${datum.y} €`} />}
                        domainPadding={1}
                        width={1000}
                        height={300}
                        style={{
                            parent: {
                                minWidth: "40px",
                                maxWidth: "80%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                domainPadding: "40"
                            }
                        }}>
                        <VictoryLine
                            style={{
                                data: { stroke: "yellow", strokeWidth: 2 }
                            }}
                            data={this.state.btc_timestamp}
                            x="traded_currency"
                            y="fees_price"
                        />
                        <VictoryLine
                            style={{ data: { stroke: "red", strokeWidth: 2 } }}
                            data={this.state.fees_btcPaymium_vs_price}
                            x="traded_currency"
                            y="fees_price"
                        />
                        <VictoryLine
                            style={{ data: { stroke: "blue", strokeWidth: 2 } }}
                            data={this.state.fees_btcBitstamp_vs_price}
                            x="traded_currency"
                            y="fees_price"
                        />
                        <VictoryAxis tickFormat={x => `${x} €`} label="Somme achetée" />
                        <VictoryAxis dependentAxis tickFormat={x => `${x} €`} label="fees" />
                    </VictoryChart>
                    <br /><br />

                    <p style={{ textAlign: "center", fontSize: "155%" }}>Evolution des fees en fonction de la quantité tradée pour l'exchange Paymium </p>

                    <VictoryChart
                        containerComponent={
                            <VictoryCursorContainer
                                cursorLabel={({ datum }) => `${datum.x}€,  ${datum.y} €`} />}
                        domainPadding={1}
                        width={1000}
                        height={300}
                        style={{
                            parent: {
                                minWidth: "40px",
                                maxWidth: "80%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                domainPadding: "40"
                            }
                        }} >
                        <VictoryLine
                            style={{ data: { stroke: "red", strokeWidth: 2 } }}
                            data={this.state.fees_btcPaymium_vs_price}
                            x="traded_currency"
                            y="fees_price"
                        />
                        <VictoryAxis tickFormat={x => `${x} €`} label="Somme achetée" />
                        <VictoryAxis dependentAxis tickFormat={x => `${x} €`} label="fees" />
                    </VictoryChart>
                    <br /><br />   
                    <p style={{ textAlign: "center", fontSize: "155%" }}>Evolution des fees en fonction de la quantité tradée pour l'exchange Bitstamp </p>

                    <VictoryChart
                        containerComponent={
                            <VictoryCursorContainer
                                cursorLabel={({ datum }) => `${datum.x}€,  ${datum.y} €`} />}
                        domainPadding={1}
                        width={1000}
                        height={300}
                        style={{
                            parent: {
                                minWidth: "40px",
                                maxWidth: "80%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                domainPadding: "40"
                            }
                        }} >
                        <VictoryLine
                            style={{ data: { stroke: "blue", strokeWidth: 2 } }}
                            data={this.state.fees_btcBitstamp_vs_price}
                            x="traded_currency"
                            y="fees_price"
                        />
                        <VictoryAxis tickFormat={x => `${x} €`} label="Somme achetée" />
                        <VictoryAxis dependentAxis tickFormat={x => `${x} €`} label="fees" />
                    </VictoryChart>
                    <br /><br />   

                    <p style={{textAlign: "center", fontSize: "155%" }} >Fees en ethereum en fonction du temps </p>
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
                                domainPadding: "40"
                            }
                        }}>
                        <VictoryLine
                            data={this.state.eth_timestamp}
                            x="timestamp"
                            y="fees_price"
                        />                        
                        <VictoryAxis tickFormat={x => this.timeConverter(x)} label="Date" />
                        <VictoryAxis dependentAxis tickFormat={x => `${x} €`} />
                    </VictoryChart>
                    <br /><br />   

                    <p style={{textAlign: "center", fontSize: "155%" }}> Evolution des fees en fonction de la quantité tradée d'ethereum   </p>
                    <VictoryChart
                        containerComponent={
                            <VictoryCursorContainer
                                cursorLabel={({ datum }) => `${datum.x}€,  ${datum.y} €`} />}
                        domainPadding={1}
                        width={1000}
                        height={300}
                        style={{
                            parent: {
                                minWidth: "40px",
                                maxWidth: "80%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                domainPadding: "40"
                            }
                        }} >                    
                        <VictoryLine
                            style={{ data: { stroke: "green", strokeWidth: 2 } }}
                            data={this.state.btc_timestamp}
                            x="traded_currency"
                            y="fees_price"
                        />                        
                        <VictoryAxis tickFormat={x => `${x} €`} label="Somme achetée" />
                        <VictoryAxis dependentAxis tickFormat={x => `${x} €`} label="fees" />
                    </VictoryChart>
                </div>
            </Router>
        );
    }
}
export default app;
