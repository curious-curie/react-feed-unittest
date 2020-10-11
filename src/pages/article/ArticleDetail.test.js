import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ArticleDetail from './ArticleDetail';
import { mockStore } from '../../mockStore';
import rootReducer from '../../modules';
import history from '../../history';
import * as actionCreators from '../../modules/articles';

jest.mock('../../components/article/ArticleItem', () => {
  return jest.fn((props) => {
    return (
      <div className="spyArticleItem">
        <div className="article">
          {/* {props.title} */}
          <div className="title">{props.article.title}</div>
          <div className="comments-length">{props.comments.length}</div>
        </div>
        <button className="deleteButton" onClick={props.onDelete}>
          Delete
        </button>
      </div>
    );
  });
});

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<ArticleDetail /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const spyGetArticle = jest.spyOn(actionCreators, 'getArticle').mockImplementation((id) => {
    return (dispatch) => {};
  });

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleDetail />
        </Router>
      </Provider>,
    );

  it('ArticleDetail should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('ArticleDetail').length).toBe(1);
    expect(spyGetArticle).toBeCalled();
  });

  it('should work with go back button', () => {
    const wrapper = getWrapper();
    history.push = jest.fn().mockImplementation(() => false);
    const goBackButton = wrapper.find('#back-detail-article-button');
    expect(goBackButton.length).toBe(1);
    goBackButton.simulate('click');
    expect(history.push).toBeCalled();
  });

  it('should delete article', () => {
    const wrapper = getWrapper();
    const spyDeleteArticle = jest.spyOn(actionCreators, 'deleteArticle').mockImplementation((id) => {
      return (dispatch) => {};
    });
    const deleteButton = wrapper.find('.deleteButton');
    deleteButton.simulate('click');
    expect(spyDeleteArticle).toBeCalled();
  });
});
