import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch, Route, useLocation} from 'react-router-dom';

import actions from './redux/actions';

import {Landing, Login, Dashboard, Tickets, Ticket} from './pages';
import {EventBus, NotificationList} from './components';

function App() {
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(actions.auth.fetchUser());
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(actions.tickets.fetchTickets());
        }
    }, [isLoggedIn]);

    return (
        <div className="App">
            {(isLoggedIn && location.pathname !== '/') &&
            <>
                <EventBus/>
                <NotificationList/>
            </>
            }
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
