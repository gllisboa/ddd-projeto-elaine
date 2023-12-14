import React from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import { BackNavigation } from '../shared/components/header';
import { ProfileButton } from '../modules/users/components/profileButton';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as usersOperators from '../modules/users/redux/operators';
import * as forumOperators from '../modules/forum/redux/operators';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import { ForumState } from '../modules/forum/redux/states';
import { PostRow } from '../modules/forum/components/posts/postRow';
import { get } from 'lodash';
import '../shared/components/button/styles/Button.sass';
import StatisticsButton from '../shared/components/button/components/StatisticsButton';
import { Button } from '../shared/components/button';
import { RouteComponentProps } from 'react-router-dom';

interface StatisticsPageProps
  extends usersOperators.IUserOperators,
    forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
}



interface IReactRouterParams {
  username: string;
  email: string;
}

export class StatisticsPage extends React.Component<
  StatisticsPageProps & RouteComponentProps<IReactRouterParams>, 
  any> 
  {
  constructor(props: any) {
    super(props);
    this.state = {
      inputSpecificDate: '',
      averageCommentCount: 0,
      isAverageCommentCountSubmitted: false,
      isAverageSpecificDateValidated: false,
      loading: false // Adicionando o estado 'loading'
    };

  }
  handleInputSpecificDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputSpecificDate: event.target.value // Atualiza o estado com o valor do campo de input
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const specificDate = this.state.inputSpecificDate;
    this.props.getAverageComment(specificDate).then((res) => {
      this.setState({
        ...this.state,
        averageCommentCount: Math.trunc(Number(res)),
        isAverageCommentCountSubmitted: true,
        loading: false
      });
   });
  }

  render() {
      const { isAverageCommentCountSubmitted, loading } = this.state;

    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation text="Back" to="/" />
          <h1>Statistics</h1>
          <div className="statisticsMetric">
            <h2>Average Comments/Specific Day</h2>
            <form
               action="post"
             >
               <label htmlFor="specificDate">Specific Date</label>
               <input
                 type="date"
                 id="specificDate"
                 name="specificDate"
                 placeholder="date"
                 required
                 onChange={this.handleInputSpecificDateChange}
                 value={this.state.inputSpecificDate} // Adicione um value para controlar o estado do input
               />
               <p>&nbsp;&nbsp;&nbsp;</p>
               <button
                onClick={(e) => this.handleSubmit(e)}
              >
                Confirm
              </button>
             </form>
              
            {loading ? <p>Loading...</p> : null}
            {isAverageCommentCountSubmitted && (
              <table cellPadding={5}>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Average comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">{this.state.inputSpecificDate}</td>
                    <td align="center">
                      {this.state.inputSpecificDate
                        ? this.state.averageCommentCount
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps({
  users,
  forum
}: {
  users: UsersState;
  forum: ForumState;
}) {
  return {
    users,
    forum
  };
}

function mapActionCreatorsToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      ...usersOperators,
      ...forumOperators
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapActionCreatorsToProps
)(withLogoutHandling(StatisticsPage));