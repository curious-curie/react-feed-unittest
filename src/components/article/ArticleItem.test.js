import React from 'react';
import { shallow } from 'enzyme';
import ArticleItem from './ArticleItem';
import CommentSection from './comments/CommentSection';
// article, onDelete, users, user, comments

jest.mock('./comments/CommentSection', () => {
  return jest.fn((props) => {
    return <div className="comment-section">{props.comments.length}</div>;
  });
});

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

describe('<ArticleItem />', () => {
  it('should render without errors', () => {
    const component = shallow(
      <ArticleItem
        users={mockUsers}
        user={mockUsers[0]}
        comments={mockComments}
        article={mockArticle}
        onDelete={onDelete}
      />,
    );
    const wrapper = component.find('.article-list-item');
    expect(wrapper.length).toBe(1);
    const title = component.find('.article-title');
    expect(title.text()).toEqual('10 React JS Articles Every Web Developer Should Read');
  });

  it('should render title and author correctly', () => {
    const component = shallow(
      <ArticleItem
        users={mockUsers}
        user={mockUsers[0]}
        comments={mockComments}
        article={mockArticle}
        onDelete={onDelete}
      />,
    );
    const title = component.find('.article-title');
    expect(title.text()).toEqual('10 React JS Articles Every Web Developer Should Read');
    title.simulate('click');
    const author = component.find('.article-author');
    expect(author.text()).toEqual('Software Lover');
  });

  it('should have correct button and function call on click', () => {
    const component = shallow(
      <ArticleItem
        users={mockUsers}
        user={mockUsers[0]}
        comments={mockComments}
        article={mockArticle}
        onDelete={onDelete}
      />,
    );

    const buttons = component.find('button');
    expect(buttons.length).toBe(2);
    buttons.at(0).simulate('click');
    buttons.at(1).simulate('click');
    expect(onDelete).toHaveBeenCalled();
  });
});
