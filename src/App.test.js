import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import { mockStore } from './mockStore';
import rootReducer from './modules';
import history from './history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as actionCreators from './modules/auth';

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<Component /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

  it('App should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.App').length).toBe(1);
  });

  it('should logout correctly', () => {
    const spyLogout = jest.spyOn(actionCreators, 'logout').mockImplementation((user) => {
      return (dispatch) => {};
    });
    const wrapper = getWrapper();
    const createButton = wrapper.find('#logout-button');
    createButton.simulate('click');
    expect(spyLogout).toBeCalledTimes(1);
  });
});
