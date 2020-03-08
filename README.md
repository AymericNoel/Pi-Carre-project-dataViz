# FullStack application : Data Visualisation 
---------

## The Project 

First of all, the dollar cost averaging is an investment with the goal of reducing the impact of volatility large purchases of financial assets such as equities. By dividing the total sum to be invested in the market (e.g. $100,000) into equal amounts put into the market at regular
intervals (e.g. $1000 over 100 weeks), DCA hopes to reduce the risk of incurring a substantial loss resulting from investing the entire "lump sum" just before a fall in the market.
This subject has been given by Henri LIEUTAUD, our customer who have recovered a large amount of data on the trading and he wants us to exploit these data. 

According to the matter, we are 2 teams which work on the same subject but we haven’t the same thematic. Our group work on the fact to create an exchange for the trading where the consumers could trade several cryptocurrencies. This platform must be secured, fast and easy to trade. Also, we need to do data-visualization for example, on our exchange; the consumers could see the amount of cryptocurrencies invested since the opening of their count. We have to see correlation or opportunity of buy or sell through the data. While the other group need to compute a trading strategy.

## The Backend

For the backend, we use nodeJS. Our database was postreSQL. In the backend, we have 4 files : 
- server.js which is our server
- controllers/auth.js which has the routes for the api in order to connect to the website
- controllers/middleware.js which contains all the middlewares to secure the website. They are used to restrict access to users who do not have rights to them. Each user can only see his own dashboard
- controllers/user.js which has the routes for the api in order to create the dashboard and all of the personal trading history 
- controllers/main.js which contains all the requests to the database

## The Frontend

For the frontend, we use ReactJS. We construct all of our components. We have a web page for each topic. For example, we have one for general information, one for information on buying ethereum, one for buying bitcoin, one for fees, etc...


For the graphical realization, we used the Victory module, an open source datavisualization module. 
In the future we plan to deploy this site, first on a docker and then on an amazaon or google server. 
