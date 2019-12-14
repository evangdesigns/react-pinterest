import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import BoardContainer from '../components/BoardsContainer/BoardsContainer';
import SingleBoard from '../components/SingleBoard/SingleBoard';
import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (selectedBoardId) => {
    this.setState({ selectedBoardId });
  }

  render() {
    const { authed, selectedBoardId } = this.state;
    return (
      <div className="App">
        <MyNavbar authed={authed}/>
        {
          (authed) ? (<BoardContainer setSingleBoard={this.setSingleBoard}/>) : (<Auth />)
        }
        {
          (selectedBoardId) && (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard} />)
        }
      </div>
    );
  }
}

export default App;
