import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import fleche from './fleche.gif';

class app extends Component {
    
    Login = () => {
        this.props.history.push("/login", {});
    };
    ToAllUser = () => {
        this.props.history.push("/allUsers", {});
    };
    GoUser = (id) => {
        this.props.history.push(`/users/${id}`, {});
    };
    render() {
        return (
            <Router forceRefresh={true}>
                <div className="home">
                     <header >
                         <br/>
                        <h1 style={{textAlign:"center"}}>Welcome to our wonderful website   </h1>
                        <br/><br/><br/>                        
                    </header>
                    <img style={{
                       width: 700,
                       height:95,
                       marginRight: "auto",
                       marginLeft: "auto",
                       display : "block"
                    }} src={fleche} />
                    <Button
                        onClick={this.Login}
                        color="danger" block
                        style={{ float: "center", marginRight: "5px" }}> Login
                    </Button>  
                    <br/><br/><br/>                        
                    <h3 style={{textDecoration : "underline"}} >Our project</h3>
                    <br/>
                    <p>First of all, the dollar cost averaging is an investment with the goal of reducing the impact of
                        volatility large purchases of financial assets such as equities. By dividing the total sum to be
                        invested in the market (e.g. $100,000) into equal amounts put into the market at regular
                        intervals (e.g. $1000 over 100 weeks), DCA hopes to reduce the risk of incurring a substantial
                        loss resulting from investing the entire "lump sum" just before a fall in the market.
                        This subject has been given by Henri LIEUTAUD, our customer who have recovered a large
                        amount of data on the trading and he wants us to exploit these data. It’s an ESILV’s project.
                        According to the matter, we are 2 teams which work on the same subject but we haven’t the
                        same thematic. Our group n°4 works on the fact to create an exchange for the trading where
                        the consumers could trade several cryptocurrencies. This platform must be secured, fast and
                        easy to trade. Also, we need to do data-visualization for example, on our exchange; the
                        consumers could see the amount of cryptocurrencies invested since the opening of their count.
                        We have to see correlation or opportunity of buy or sell through the data.
                        While the other group need to compute a trading strategy.
                    </p>
                    <br/>
                    <h3 style={{textDecoration : "underline"}} >Our team</h3>
                    <p>
                        We are a team of four students :                            
                    </p>
                    <p style={{textIndent: "3%"}}>
                        -Aymeric 
                    </p>
                    <p style={{textIndent: "3%"}}>
                        -Mehdi   
                    </p>
                    <p style={{textIndent: "3%"}}>
                        -Matthieu 
                    </p>
                    <p style={{textIndent: "3%"}}>
                        -Thomas 
                    </p>
                    <p>
                        Each of us has a special role on the team. This allows us to be effective when we need to be. We can always count on the team, that's what makes us strong.
                    </p>
                    <br/>
                    <h3 style={{textDecoration : "underline"}} >Our school</h3>
                    <p>
                        We are in ESILV. School of general engineering. We are all specialized in finance, two in fintech and two in market finance. Our school is located in La Defense, a famous business district in France. 
                    </p>

                </div>                
            </Router>
        )
    }
}
export default app;