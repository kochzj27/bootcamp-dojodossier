import React, { useState } from 'react';
import TabForm from '../TabForm/TabForm';
import { connect } from 'react-redux';
import { changeTab, addItem } from '../../redux';
import './AppContainer.css';

const AppContainer = (props) => {
  const [newItem, setItem] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newItem !== '') {
      props.addItem(newItem)
    }
    setItem('')
  }

  let displayTabs = props.info.map((tab, idx) => {
    return (
      <li className="nav-item" key={idx}>
        <span className={`nav-link ${idx === props.selectedTab ? 'active' : ''}`} onClick={() => props.changeTab(idx)}>{tab.name}</span>
      </li >
    )
  });

  let displayAbout = props.info[props.selectedTab].about.map((trait, idx) => {
    return (
      <li key={idx}>
        {trait}
      </li>
    )
  });

  return (
    <div className='container'>
      <div className='right'>
        <TabForm />
      </div>
      <div className='container topish'>
        <ul className="nav nav-tabs">
          {displayTabs}
        </ul>
        <div className='box'>
          <ul>
            {displayAbout}
          </ul>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Item Text" aria-label="New Item" aria-describedby="button-addon2" onChange={(e) => setItem(e.target.value)} value={newItem} />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" id="button-addon2" disabled={newItem === ''} onClick={handleSubmit}>Add Item</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  info: state.info,
  selectedTab: state.selectedTab,
})

const mapDispatchToProps = (dispatch) => ({
  changeTab: (id) => dispatch(changeTab(id)),
  addItem: (value) => dispatch(addItem(value)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);