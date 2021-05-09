import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import actions from './redux/actions';

import {Landing, Login, Dashboard, Tickets, Ticket} from './pages';

function App() {
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(actions.auth.fetchUser());
        }
    }, [isLoggedIn, dispatch]);

    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/dashboard' component={Dashboard}/>
                <Route exact path='/tickets' component={Tickets}/>
                <Route exact path='/tickets/:reference' component={Ticket}/>
            </Switch>
        </div>
    );
}

export default App;
