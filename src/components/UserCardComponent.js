import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Segment, Header, Grid, Image} from 'semantic-ui-react';
import PollQuestionComponent from './PollQuestionComponent';
import PollResultComponent from './PollResultComponent';
import PollTeaserComponent from './PollTeaserComponent';
import {colors} from '../misc/StyleHelper';

const pollTypes = {
    TEASER: 'TEASER',
    QUESTION: 'QUESTION',
    RESULT: 'RESULT'
};

const PollContent = props => {
    const {pollType, question, unanswered} = props;

    switch (pollType) {
        case pollTypes.TEASER:
            return <PollTeaserComponent question={question} unanswered={unanswered}/>;
        case pollTypes.QUESTION:
            return <PollQuestionComponent question={question}/>;
        case pollTypes.RESULT:
            return <PollResultComponent question={question}/>;
        default:
            return;
    }
};

export class UserCardComponent extends Component {
    static propTypes = {
        question: PropTypes.object,
        author: PropTypes.object,
        pollType: PropTypes.string,
        unanswered: PropTypes.bool,
        question_id: PropTypes.string
    };

    render() {
        const {
            author,
            question,
            pollType,
            badPath,
            unanswered = null
        } = this.props;

        if (badPath === true) {
            return <Redirect to="/questions/bad_id"/>;
        }

        const tabColor = unanswered === true ? colors.green : colors.blue;
        const borderTop =
            unanswered === null
                ? `2px solid ${colors.blue}`
                : `1px solid ${tabColor.hex}`;

        return (
            <Segment.Group>
                <Header
                    as="h5"
                    textAlign="left"
                    block
                    attached="top"
                    style={{borderTop: borderTop}}
                >
                    {author.name}'s Poll:
                </Header>

                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Image src={author.avatarURL}/>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <PollContent
                                pollType={pollType}
                                question={question}
                                unanswered={unanswered}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment.Group>
        );
    }
}

function mapStateToProps(
    {users, questions, authUser},
    {match, question_id}
) {
    let question,
        author,
        pollType,
        badPath = false;
    if (question_id !== undefined) {
        question = questions[question_id];
        author = users[question.author];
        pollType = pollTypes.TEASER;
    } else {
        const {question_id} = match.params;
        question = questions[question_id];
        const user = users[authUser];

        if (question === undefined) {
            badPath = true;
        } else {
            author = users[question.author];
            pollType = pollTypes.QUESTION;
            if (Object.keys(user.answers).includes(question.id)) {
                pollType = pollTypes.RESULT;
            }
        }
    }

    return {
        badPath,
        question,
        author,
        pollType
    };
}

export default connect(mapStateToProps)(UserCardComponent);
