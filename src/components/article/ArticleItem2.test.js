import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { mockStore } from '../../mockStore';
import rootReducer from '../../modules';
import history from '../../history';
import ArticleItem from './ArticleItem';
const mockComments = [
  {
    id: 1,
    article_id: 0,
    author_id: 2,
    content: 'What do you mean wow?',
  },
  {
    id: 2,
    article_id: 0,
    author_id: 3,
    content: 'I was surprised',
  },
];

const mockUsers = [
  { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'Software Lover', logged_in: true },
  { id: 2, email: 'alan@turing.com', password: 'iluvswpp', name: 'Alan Turing', logged_in: false },
  { id: 3, email: 'edsger@dijkstra.com', password: 'iluvswpp', name: 'Edsger Dijkstra', logged_in: false },
];

const mockArticle = {
  id: 0,
  author_id: 1,
  title: '10 React JS Articles Every Web Developer Should Read',
  content:
    'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
};

const onDelete = jest.fn();

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<Component /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleItem
            users={mockUsers}
            user={mockUsers[0]}
            comments={mockComments}
            article={mockArticle}
            onDelete={onDelete}
          />
        </Router>
      </Provider>,
    );

  it('ArticleItem should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.article-list-item').length).toBe(1);
  });
});
