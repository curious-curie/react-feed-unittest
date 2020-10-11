import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CommentItem from './CommentItem';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { mockStore } from '../../../mockStore';
import history from '../../../history';
import rootReducer from '../../../modules';
import { useDispatch } from 'react-redux';

const mockComment = {
  id: 1,
  article_id: 0,
  author_id: 1,
  content: 'What do you mean wow?',
};

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<CommentItem /> unit test', () => {
  const store = createStore(rootReducer, mockStore, composeWithDevTools(applyMiddleware(thunk)));

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <CommentItem comment={mockComment} />
        </Router>
      </Provider>,
    );

  it('CommentItem should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('CommentItem').length).toBe(1);
  });

  it('Should display edit/delete button when user is author', () => {
    const wrapper = getWrapper();
    const editButton = wrapper.find('#edit-comment-button');
    const deleteButton = wrapper.find('#delete-comment-button');
    expect(editButton.length).toBe(1);
    expect(deleteButton.length).toBe(1);
    window.prompt = jest.fn().mockImplementation(() => 'test');

    editButton.simulate('click');
    expect(window.prompt).toBeCalled();

    deleteButton.simulate('click');
  });

  // it('change value when input value changes', () => {
  //   const wrapper = getWrapper();
  //   const input = wrapper.find('#new-comment-content-input');
  //   expect(input.prop('value')).toEqual('');
  //   // const setStateSpy = jest.spyOn(LazyloadProvider.prototype, 'setState');

  //   // input.simulate('change', { target: { value: 'Hello' } });
  //   // expect(input.prop('value')).toEqual('Hello');
  //   const event = {
  //     preventDefault() {},
  //     target: { value: 'hello' },
  //   };
  //   input.simulate('change', event);
  // });

  // it('should return when creating blank comment', () => {
  //   const wrapper = getWrapper();
  //   const confirmButton = wrapper.find('#confirm-create-comment-button');
  //   expect(confirmButton.length).toBe(1);
  //   expect(confirmButton.text()).toEqual('comment');
  //   confirmButton.simulate('click');
  // });

  // it('should create comment on button click', () => {
  //   jest.mock('react-redux', () => ({
  //     useSelector: jest.fn((fn) => fn()),
  //     useDispatch: () => jest.fn(),
  //   }));
  //   const wrapper = getWrapper();
  //   const input = wrapper.find('#new-comment-content-input');
  //   expect(input.prop('value')).toEqual('');
  //   const event = {
  //     preventDefault() {},
  //     target: { value: 'hello' },
  //   };
  //   input.simulate('change', event);

  //   const confirmButton = wrapper.find('#confirm-create-comment-button');

  //   expect(confirmButton.length).toBe(1);
  //   expect(confirmButton.text()).toEqual('comment');
  //   confirmButton.simulate('click');

  //   expect(input.prop('value')).toEqual('');
  // });
});
