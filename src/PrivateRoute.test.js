import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { mockStore } from './mockStore';
import rootReducer from './modules';
import history from './history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<Component /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRoute />
        </Router>
      </Provider>,
    );

  it('PrivateRoute should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('PrivateRoute').length).toBe(1);
  });
});
