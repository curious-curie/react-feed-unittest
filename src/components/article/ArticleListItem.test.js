import React from 'react';
import { shallow } from 'enzyme';
import ArticleListItem from './ArticleListItem';

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

describe('<ArticleListItem />', () => {
  it('should render without errors', () => {
    const component = shallow(<ArticleListItem users={mockUsers} article={mockArticle} />);
    const wrapper = component.find('.article-list-item');
    expect(wrapper.length).toBe(1);
    const title = component.find('.article-title__button');
    expect(title.text()).toEqual('10 React JS Articles Every Web Developer Should Read');
  });

  it('click button should work', () => {
    const component = shallow(<ArticleListItem users={mockUsers} article={mockArticle} />);
    const titleButton = component.find('.article-title__button');
    expect(titleButton.text()).toEqual('10 React JS Articles Every Web Developer Should Read');
    titleButton.simulate('click');
  });
});
