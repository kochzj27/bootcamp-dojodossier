import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTab } from '../../redux';
import './TabForm.css';

const TabForm = (props) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title !== '') {
      props.addTab(title);
    }
    setTitle('');
  }

  return (
    <div className='tabform'>
      <form className='tabform-form' onSubmit={handleSubmit}>
        <input type='text' className='form-control' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title} />
        <button className='btn btn-primary buts' disabled={title === ''}>Add Tab</button>
      </form>
    </div>)
}

const mapStateToProps = (state) => ({
  info: state.info,
  selectedTab: state.selectedTab,
})

const mapDispatchToProps = (dispatch) => ({
  addTab: (name) => dispatch(addTab(name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabForm);