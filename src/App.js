/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Login from './components/Login/Login';
import Home from './components/Home/Home'
import AuthenticatedRoute from './Authentication/routes/AuthenticatedRoutes'



class App extends Component {
	
	render() {
		return (
			<div>
						<Router history={history}>
							<Switch>
								<Route exact path="/" component={Login} />	
                				<AuthenticatedRoute exact path="/Home" component={Home} />	

								
							</Switch>
						</Router>
			</div>		
		);
	}
}

export default App;
