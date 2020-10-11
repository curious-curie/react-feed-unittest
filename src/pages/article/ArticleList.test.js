import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ArticleList from './ArticleList';
import { mockStore } from '../../mockStore';
import rootReducer from '../../modules';
import history from '../../history';
import * as actionCreators from '../../modules/articles';

jest.mock('../../components/article/ArticleListItem', () => {
  return jest.fn((props) => {
    return <div className="article-list-item">{props.article.title}</div>;
  });
});

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<ArticleList /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const spyGetArticles = jest.spyOn(actionCreators, 'getArticles').mockImplementation(() => {
    return (dispatch) => {};
  });

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleList />
        </Router>
      </Provider>,
    );

  it('ArticleList should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('ArticleList').length).toBe(1);
    expect(spyGetArticles).toBeCalled();
  });

  it('should create article', () => {
    const spyCreate = jest.spyOn(actionCreators, 'createArticle').mockImplementation((newArticle) => {
      return (dispatch) => {};
    });
    const wrapper = getWrapper();
    const createButton = wrapper.find('#create-article-button');
    history.push = jest.fn().mockImplementation(() => false);

    createButton.simulate('click');
    expect(history.push).toBeCalledTimes(1);
  });
});
