import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ArticleCreate from './ArticleCreate';
import { mockStore } from '../../mockStore';
import rootReducer from '../../modules';
import history from '../../history';
import * as actionCreators from '../../modules/articles';

const onDelete = jest.fn();
jest.mock('../../components/article/ArticleForm', () => {
  return jest.fn((props) => {
    return (
      <div className="spyForm">
        <div className="form">
          {/* {props.title} */}
          <div className="user">{props.user.id}</div>
          <div className="users-length">{props.users.length}</div>
        </div>
        <button className="createButton" onClick={props.handleCreate}>
          Create
        </button>
      </div>
    );
  });
});

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<ArticleCreate /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleCreate />
        </Router>
      </Provider>,
    );

  it('ArticleCreate should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('ArticleCreate').length).toBe(1);
  });

  it('should work with go back button', () => {
    const wrapper = getWrapper();
    history.push = jest.fn().mockImplementation(() => false);
    const goBackButton = wrapper.find('#back-create-article-button');
    expect(goBackButton.length).toBe(1);
    goBackButton.simulate('click');
    expect(history.push).toBeCalled();
  });

  it('should create article', () => {
    const spyCreate = jest.spyOn(actionCreators, 'createArticle').mockImplementation((newArticle) => {
      return (dispatch) => {};
    });
    const wrapper = getWrapper();
    const createButton = wrapper.find('.createButton');
    createButton.simulate('click');
    expect(spyCreate).toBeCalledTimes(1);
  });
});
