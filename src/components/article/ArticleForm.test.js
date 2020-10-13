import React from 'react';
import { shallow } from 'enzyme';
import ArticleForm from './ArticleForm';

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

// export default function ArticleForm({ handleCreate, isEdit, article, user, users }) {

const onDelete = jest.fn();
const handleCreate = jest.fn();
describe('<ArticleForm />', () => {
  it('should render without errors', () => {
    const isEdit = true;
    const component = shallow(
      <ArticleForm
        users={mockUsers}
        article={mockArticle}
        onDelete={onDelete}
        user={mockUsers[0]}
        isEdit={isEdit}
        handleCreate={handleCreate}
      />,
    );
    const wrapper = component.find('.article-create-wrapper');
    expect(wrapper.length).toBe(1);
  });

  it('should display edit button when editing', () => {
    const isEdit = true;
    const component = shallow(
      <ArticleForm
        users={mockUsers}
        article={mockArticle}
        onDelete={onDelete}
        user={mockUsers[0]}
        isEdit={isEdit}
        handleCreate={handleCreate}
      />,
    );
    const editButton = component.find('#back-edit-article-button');
    expect(editButton.length).toBe(1);
    window.confirm = jest.fn().mockImplementation(() => false);
    history.push = jest.fn().mockImplementation((args) => true);
    editButton.simulate('click');
    expect(history.push).toBeCalledTimes(0);

    const createButton = component.find('#back-create-article-button');
    expect(createButton.length).toBe(0);
  });

  it('should display preview when preview tab clicked', () => {
    const isEdit = true;
    const component = shallow(
      <ArticleForm
        users={mockUsers}
        article={mockArticle}
        onDelete={onDelete}
        user={mockUsers[0]}
        isEdit={isEdit}
        handleCreate={handleCreate}
      />,
    );
    const writeButton = component.find('#write-tab-button');
    expect(writeButton.length).toBe(1);
    writeButton.simulate('click');
    const previewButton = component.find('#preview-tab-button');
    expect(previewButton.length).toBe(1);
    previewButton.simulate('click');
    const inputs = component.find('input');
    expect(inputs.length).toBe(0);
  });

  it('should be disabled when input length is zero', () => {
    const isEdit = false;
    const component = shallow(
      <ArticleForm
        users={mockUsers}
        onDelete={onDelete}
        user={mockUsers[0]}
        isEdit={isEdit}
        handleCreate={handleCreate}
      />,
    );
    const createButton = component.find('#confirm-create-article-button');
    expect(createButton.length).toBe(1);
    expect(createButton.props().disabled).toBe(true);
    const titleInput = component.find('#article-title-input');
    const contentInput = component.find('#article-content-input');
    const titleEvent = {
      preventDefault() {},
      target: { name: 'title', value: 'hello' },
    };
    titleInput.simulate('change', titleEvent);
    const contentEvent = {
      preventDefault() {},
      target: { name: 'content', value: 'hello' },
    };
    contentInput.simulate('change', contentEvent);
  });
});
