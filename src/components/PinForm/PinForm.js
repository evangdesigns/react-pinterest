import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string,
    addPin: PropTypes.func,
  }

  state = {
    title: '',
    imageUrl: '',
  }

  savePinEvent = (e) => {
    const { addPin } = this.props;
    e.preventDefault();
    const newPin = {
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      uid: authData.getUid(),
      boardId: this.props.boardId,
    };
    addPin(newPin);
    this.setState({ title: '', imageUrl: '' });
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  render() {
    return (
<form className='col-6 offset-3 PinForm'>
  <div className="form-group">
    <label htmlFor="pin-title">Pin Name:</label>
    <input
      type="text"
      className="form-control"
      id="pin-title"
      placeholder="Enter pin name"
      value={this.state.title}
      onChange={this.titleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="pin-image-url">Image Url:</label>
    <input
      type="text"
      className="form-control"
      id="pin-image-url"
      placeholder="Enter pin image url"
      value={this.state.imageUrl}
      onChange={this.imageUrlChange}
    />
  </div>
  <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>
</form>
    );
  }
}

export default PinForm;
