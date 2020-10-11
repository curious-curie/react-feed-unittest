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
import ArticleForm from './ArticleForm';

{
  /* <ArticleForm
users={mockUsers}
article={mockArticle}
onDelete={onDelete}
user={mockUsers[0]}
isEdit={isEdit}
handleCreate={handleCreate}
/>, */
}

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
const handleCreate = jest.fn();
const isEdit = true;

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<Component /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleForm
            users={mockUsers}
            article={mockArticle}
            onDelete={onDelete}
            user={mockUsers[0]}
            isEdit={isEdit}
            handleCreate={handleCreate}
          />
        </Router>
      </Provider>,
    );

  const getCreateWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleForm
            users={mockUsers}
            article={mockArticle}
            onDelete={onDelete}
            user={mockUsers[0]}
            isEdit={!isEdit}
            handleCreate={handleCreate}
          />
        </Router>
      </Provider>,
    );

  it('ArticleForm should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.article-create-wrapper').length).toBe(1);
  });

  it('should present title of editing article', () => {
    const wrapper = getWrapper();
    const input = wrapper.find('#article-title-input');
    expect(input.prop('value')).toEqual('10 React JS Articles Every Web Developer Should Read');
  });

  it('should not show / show confirm window when going back before / after change', () => {
    window.confirm = jest.fn().mockImplementation(() => true);
    history.push = jest.fn().mockImplementation((args) => true);

    const wrapper = getWrapper();
    const writeButton = wrapper.find('#back-edit-article-button');
    writeButton.simulate('click');
    expect(history.push).toBeCalled();

    const input = wrapper.find('#article-title-input');
    expect(input.prop('value')).toEqual('10 React JS Articles Every Web Developer Should Read');
    input.simulate('change', { target: { name: 'title', value: 'Hello' } });
    expect(writeButton.length).toBe(1);
    writeButton.simulate('click');
    expect(window.confirm).toBeCalled();
  });

  it('should present title of editing article', async () => {
    const wrapper = getWrapper();
    const previewButton = wrapper.find('#preview-tab-button');
    const setIsPreview = jest.fn().mockImplementation(() => true);
    previewButton.simulate('click');

    const preview = wrapper.find('ArticlePreview');
    expect(preview.length).toBe(1);

    // expect(input.prop('value')).toEqual('10 React JS Articles Every Web Developer Should Read');
  });

  it('handleCreate should be called when confirm', () => {
    const wrapper = getWrapper();
    let confirmButton = wrapper.find('#confirm-edit-article-button');
    confirmButton.simulate('click');
    expect(handleCreate).toBeCalled();

    const createWrapper = getCreateWrapper();
    confirmButton = createWrapper.find('#confirm-create-article-button');
    confirmButton.simulate('click');
    expect(handleCreate).toBeCalled();
  });
});
