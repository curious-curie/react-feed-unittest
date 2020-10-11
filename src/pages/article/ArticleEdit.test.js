import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ArticleEdit from './ArticleEdit';
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
        <button className="editButton" onClick={props.handleCreate}>
          editButton
        </button>
      </div>
    );
  });
});

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<ArticleEdit /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleEdit />
        </Router>
      </Provider>,
    );

  it('ArticleEdit should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('ArticleEdit').length).toBe(1);
  });

  // it('should work with go back button', () => {
  //   const wrapper = getWrapper();
  //   history.push = jest.fn().mockImplementation(() => false);
  //   const goBackButton = wrapper.find('#back-create-article-button');
  //   expect(goBackButton.length).toBe(1);
  //   goBackButton.simulate('click');
  //   expect(history.push).toBeCalled();
  // });

  it('should create article', () => {
    const spyCreate = jest.spyOn(actionCreators, 'editArticle').mockImplementation((newArticle) => {
      return (dispatch) => {};
    });
    const wrapper = getWrapper();
    const editButton = wrapper.find('.editButton');
    editButton.simulate('click');
    expect(spyCreate).toBeCalledTimes(1);
  });
});
