import React, { Component } from 'react';
import _ from 'lodash';
import Cards from './components/Cards';
import API from './middleware/api';
import './style.css';

class App extends Component {
  state = {
    users: [],
    activeFilter: ''
  };

  componentDidMount() {
    const { backgroundClass } = this;
    API.fetchUser().then(res => {
      const users = res.results.map(item => {
        const background = backgroundClass(item.dob.age);
        item.background = background;
        return item;
      });
      this.setState({
        users
      });
    });
  }

  filterUserByCity = () => {
    const { users } = this.state;
    const sortedByCity = _.sortBy(users, [
      function(item) {
        return item.location.city;
      }
    ]);
    this.setState({
      users: sortedByCity,
      activeFilter: 'city'
    });
  };

  filterUserByColor = () => {
    const { users } = this.state;
    const sortedByColor = _.sortBy(users, [
      function(item) {
        return item.background;
      }
    ]);
    this.setState({
      users: sortedByColor,
      activeFilter: 'color'
    });
  };

  backgroundClass = age => {
    if (age < 21) {
      return 'red';
    } else if (21 < age && age <= 56) {
      return 'green';
    } else if (age > 56) {
      return 'blue';
    }
  };

  generateUserCards = () => {
    const { state } = this;
    if (state.users.length > 0) {
      return state.users.map(user => <Cards {...user} key={user.login.uuid} />);
    }
  };

  render() {
    const {
      state,
      generateUserCards,
      filterUserByCity,
      filterUserByColor
    } = this;
    return (
      <div className="qoala-wrapper">
        <div className="qoala-header__container">
          <div className="qoala-header__container--logo">
            <h3>Qoala Test</h3>
          </div>
          <div className="qoala-header__container--filter">
            <button
              onClick={filterUserByColor}
              className={state.activeFilter === 'color' ? 'active' : ''}
            >
              Color
            </button>
            <button
              onClick={filterUserByCity}
              className={state.activeFilter === 'city' ? 'active' : ''}
            >
              Cities
            </button>
          </div>
        </div>
        <div className="qoala-user__wrapper">
          {state.users.length > 0 ? (
            <div className="qoala-user__container">{generateUserCards()}</div>
          ) : (
            <div className="qoala-user__loader">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
