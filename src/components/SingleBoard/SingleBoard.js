import React from 'react';
import PropTypes from 'prop-types';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import Pin from '../Pin/pin';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  getPinData = (selectedBoardId) => {
    pinData.getPinsByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((errorFromGetPins) => console.error({ errorFromGetPins }));
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromGetSingleBoard) => console.error({ errorFromGetSingleBoard }));
  }

  deleteSinglePin = (pinId) => {
    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(this.props.selectedBoardId);
      })
      .catch((errorFromDeletePin) => console.error({ errorFromDeletePin }));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  addPin = (newPin) => {
    const { selectedBoardId } = this.props;
    pinData.addPin(newPin)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromAddPin) => console.error({ errorFromAddPin }));
  }

  render() {
    const { board, pins } = this.state;
    const { selectedBoardId } = this.props;
    return (
      <div>
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <PinForm boardId={selectedBoardId} addPin={this.addPin}/>
        <div className="SingleBoard col-8">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <div className="d-flex flex-wrap">
            {pins.map((pin) => (<Pin key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin}/>))}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
