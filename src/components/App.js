import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';
import {handleInitialData} from '../actions/SharedAction';
import {connect} from 'react-redux';
import LoginComponent from './LoginComponent';
import NavComponent from './NavComponent';
import HomeComponent from './HomeComponent';
import UserCardComponent from './UserCardComponent';
import NewPollComponent from './NewPollComponent';
import LeaderboardComponent from './LeaderboardComponent';
import NoMatchComponent from './NoMatchComponent';

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }

    render() {
        const {authUser} = this.props;
        return (
            <Router>
                <div className="App">
                    {authUser === null ? (
                        <Route
                            render={() => (
                                <ContentGrid>
                                    <LoginComponent/>
                                </ContentGrid>
                            )}
                        />
                    ) : (
                        <Fragment>
                            <NavComponent/>
                            <ContentGrid>
                                <Switch>
                                    <Route exact path="/" component={HomeComponent}/>
                                    <Route path="/questions/bad_id" component={NoMatchComponent}/>
                                    <Route path="/questions/:question_id" component={UserCardComponent}/>
                                    <Route path="/add" component={NewPollComponent}/>
                                    <Route path="/leaderboard" component={LeaderboardComponent}/>
                                    <Route component={NoMatchComponent}/>
                                </Switch>
                            </ContentGrid>
                        </Fragment>
                    )}
                </div>
            </Router>
        );
    }
}

const ContentGrid = ({children}) => (
    <Grid padded="vertically" columns={1} centered>
        <Grid.Row>
            <Grid.Column style={{maxWidth: 400}}>{children}</Grid.Column>
        </Grid.Row>
    </Grid>
);

function mapStateToProps({authUser}) {
    return {
        authUser
    };
}

export default connect(
    mapStateToProps,
    {handleInitialData}
)(App);
