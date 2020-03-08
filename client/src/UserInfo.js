import React, { Component } from 'react';
import { Table, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';



class App extends Component {
    state = {
        user: [],
        hide: true,
        dropdownOpen: false
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        fetch(`/use/users/${params.id}`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(user => this.setState({ user }))
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
        fetch("/auth/isadmin", { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(res => {
                if (res.admin === true) { this.setState({ hide: false }) }
                else { this.setState({ hide: true }) }
            });
    }
    Admin = () => {
        this.props.history.push("/allUsers", {});
    }
    Logout = () => {
        sessionStorage.removeItem('user_id');
        fetch("/auth/logout", { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(res => {
                console.log(res.message)
                this.props.history.push("/login", {});
            })
            .catch(err => {
                err.json().then(errMess => {
                    console.log("error : ", errMess.message);
                })
            });
    };
    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }
    fees = () => {
        this.props.history.push(`/users/${sessionStorage.user_id}/fees`, {});
    };
    bitcoin = () => {
        this.props.history.push(`/users/${sessionStorage.user_id}/bitcoin`, {});
    };
    general = () => {
        this.props.history.push(`/users/${sessionStorage.user_id}/general`, {});
    };
    ethereum = () => {
        this.props.history.push(`/users/${sessionStorage.user_id}/ethereum`, {});
    };
    render() {
        const user = this.state.user.map(item => {
            return (
                <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.email}</td>
                    <td>{item.mdp}</td>
                </tr>
            )
        })

        return (
            <Router forceRefresh={true}>
                <div className="Unique User">
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret color="danger">
                            Mes Choix
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.ethereum}>
                                Informations Ethereum
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
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>nom</th>
                                <th>prenom</th>
                                <th>Email</th>
                                <th>MDP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user}
                        </tbody>

                    </Table>
                    <Button
                        onClick={this.Logout}
                        color="danger"
                        style={{ float: "left", marginRight: "5px" }}> Logout
                    </Button>
                    <Button
                        onClick={this.Admin}
                        disabled={this.state.hide}
                        color="danger"
                        style={{ float: "left", marginRight: "5px" }}> Admin Access
                    </Button>
                </div>
            </Router>
        )
    }
}

export default App