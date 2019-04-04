import {
  // combineReducers,
  createStore,
} from 'redux';


//ACTIONS
export const addTab = (value) => ({
  type: 'ADD_TAB',
  value                        // <-- action.type
});

export const changeTab = (value) => ({
  type: 'CHANGE_TAB',
  value                        // <-- action.type
});

export const addItem = (value) => ({
  type: 'ADD_ITEM',
  value                        // <-- action.type
});


///REDUCERS
export const reducers = (state = initialState1, action) => {
  switch (action.type) {

    case 'ADD_TAB':
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- ADD_TASKS | state: ", state)
      console.log(" -- REDUCER -- ADD_TASK | action", action)
      console.log(" -- REDUCER -- ADD_TASK | action.value: ", action.value)
      id++;
      return Object.assign(
        {},
        state,
        {
          info: [
            ...state.info,
            { id, name: action.value, about: [] }
          ],
        }
      );

    case 'CHANGE_TAB':
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- CHANGE_TAB | state: ", state)
      console.log(" -- REDUCER -- CHANGE_TAB | action: ", action)
      console.log(" -- REDUCER -- CHANGE_TAB | action.value: ", action.value)
      return Object.assign(
        {},
        state,
        { selectedTab: action.value }
      );


    case 'ADD_ITEM':
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- ADD_ITEM | state: ", state)
      console.log(" -- REDUCER -- ADD_ITEM | action", action)
      console.log(" -- REDUCER -- ADD_ITEM | action.value: ", action.value)
      id++;

      let newAbout = [...state.info[state.selectedTab].about, action.value];
      let newObject = Object.assign({}, state.info[state.selectedTab]);
      newObject.about = newAbout;

      return Object.assign(
        {},
        state,
        {
          info: [
            ...state.info.slice(0, state.selectedTab), newObject, ...state.info.slice(state.selectedTab + 1)
          ],
        }
      );

    default:
      return state;
  }
}


// Initial State
// Minimal representation of the data in the app
let id = 3;
const initialState1 = {
  info: [
    { id: 0, name: 'Johnny', about: ['Great Listener', 'Eats a lot of pizzas', 'uses pineapples'] },
    { id: 1, name: 'Joshua', about: ['Works in sales', 'has 2 cats', 'saves lifes with blenders'] },
    { id: 2, name: 'Jamie', about: ['Great person', 'studies sciences'] },
    { id: 3, name: 'Jessica', about: ['Terrible Listener', 'drinks a lot of alchohol', 'gets great grades'] },
  ],
  selectedTab: 0,
};


// COMBINE ALL REDUCERS INTO 1 OBJECT
// export const reducers = combineReducers({
//     tasks
// });


// STORE -- store.js
export function configureStore(initialState = initialState1) { // initialState = initialState | {}
  const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  console.log(store);
  return store;
};


export const store = configureStore();
