import axios from 'axios';
import store from '../store';
import commentReducer, * as actionCreators from './comments';

const stubComments = [
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

const stubComment = stubComments[0];

describe('commentActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getComments' should fetch comments correctly`, (done) => {
    const stubComments = [stubComment];

    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubComments,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getComments()).then(() => {
      const newState = store.getState();
      expect(newState.comments.comments).toBe(stubComments);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'createComment' should post comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation((url, comment) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubComment,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.createComment(stubComment)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'editComment' should edit comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation((url, id) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubComment,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.editComment(stubComment)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'deleteComment' should delete todo correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.deleteComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

// describe('Todo Reducer', () => {
//   it('should return default state', () => {
//     const newState = commentReducer(undefined, {}); // initialize
//     expect(newState).toEqual({
//       error: false,
//       comment: null,
//       comments: [],
//     });
//   });

//   it('should edit post', () => {
//     const newState = commentReducer(
//       {
//         error: false,
//         comment: null,
//         comments: [stubComment],
//       },
//       {
//         type: actionCreators.UPDATE_ARTICLE_SUCCESS,
//         comment: stubComment,
//       },
//     );
//     expect(newState).toEqual({
//       comments: [stubComment],
//       error: false,
//       comment: stubComment,
//     });
//   });
// });
