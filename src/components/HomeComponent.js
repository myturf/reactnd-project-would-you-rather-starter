import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tab} from 'semantic-ui-react';
import UserCardComponent from './UserCardComponent';

export class HomeComponent extends Component {
    static propTypes = {
        userQuestions: PropTypes.object.isRequired
    };

    render() {
        const {userQuestions} = this.props;

        return <Tab panes={panes({userQuestions: userQuestions})} className="tab"/>;
    }
}

const panes = props => {
    const {userQuestions} = props;
    return [
        {
            menuItem: 'Unanswered',
            render: () => (
                <Tab.Pane>
                    {userQuestions.answered.map(question => (
                        <UserCardComponent
                            key={question.id}
                            question_id={question.id}
                            unanswered={true}
                        />
                    ))}
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Answered',
            render: () => (
                <Tab.Pane>
                    {userQuestions.unanswered.map(question => (
                        <UserCardComponent
                            key={question.id}
                            question_id={question.id}
                            unanswered={false}
                        />
                    ))}
                </Tab.Pane>
            )
        }
    ];
};

function mapStateToProps({authUser, users, questions}) {
    const answeredIds = Object.keys(users[authUser].answers);
    const answered = Object.values(questions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);

    return {
        userQuestions: {
            answered,
            unanswered
        }
    };
}

export default connect(mapStateToProps)(HomeComponent);
