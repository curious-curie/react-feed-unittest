import axios from 'axios';
import store from '../store';
import articleReducer, * as actionCreators from './articles';

const stubArticle = {
  id: 0,
  author_id: 1,
  title: '10 React JS Articles Every Web Developer Should Read',
  content:
    'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
};

describe('articleActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getArticles' should fetch articles correctly`, (done) => {
    const stubArticles = [stubArticle];

    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticles,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getArticles()).then(() => {
      const newState = store.getState();
      expect(newState.article.articles).toBe(stubArticles);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getArticle' should fetch articles correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getArticle()).then(() => {
      const newState = store.getState();
      expect(newState.article.article).toBe(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'createArticle' should post article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation((url, article) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.createArticle(stubArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'editArticle' should edit article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation((url, id) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.editArticle(stubArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'deleteArticle' should delete todo correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.deleteArticle()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

describe('Todo Reducer', () => {
  it('should return default state', () => {
    const newState = articleReducer(undefined, {}); // initialize
    expect(newState).toEqual({
      error: false,
      article: null,
      articles: [],
    });
  });

  it('should edit post', () => {
    const anotherArticle = {
      id: 11,
      author_id: 2,
      title: 'React: A JavaScript library for building user interfaces',
      content:
        'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
    };

    const newState = articleReducer(
      {
        error: false,
        article: null,
        articles: [stubArticle, anotherArticle],
      },
      {
        type: actionCreators.UPDATE_ARTICLE_SUCCESS,
        article: stubArticle,
      },
    );
    expect(newState).toEqual({
      articles: [stubArticle, anotherArticle],
      error: false,
      article: stubArticle,
    });
  });
});
