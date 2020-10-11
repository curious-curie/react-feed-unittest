export const mockStore = {
  auth: {
    loading: false,
    error: false,
    user: { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'Software Lover', logged_in: true },
    users: [
      { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'Software Lover', logged_in: true },
      { id: 2, email: 'alan@turing.com', password: 'iluvswpp', name: 'Alan Turing', logged_in: false },
      { id: 3, email: 'edsger@dijkstra.com', password: 'iluvswpp', name: 'Edsger Dijkstra', logged_in: false },
    ],
  },
  article: {
    error: false,
    article: {
      id: 0,
      author_id: 1,
      title: '10 React JS Articles Every Web Developer Should Read',
      content:
        'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
    },
    articles: [
      {
        id: 0,
        author_id: 1,
        title: '10 React JS Articles Every Web Developer Should Read',
        content:
          'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
      },
      {
        id: 11,
        author_id: 2,
        title: 'React: A JavaScript library for building user interfaces',
        content:
          'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
      },
      {
        id: 12,
        author_id: 1,
        title: 'Building the New facebook.com with React, GraphQL and Relay',
        content:
          "Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook.",
      },
      {
        id: 13,
        author_id: 1,
        title: 'React State with Hooks: useReducer, useState, useContext',
        content:
          "If you haven't used state management excessively in React Function Components, this tutorial may help you to get a better understanding of how React Hooks -- such as useState, useReducer, and useContext -- can be used in combination for impressive state management in React applications. In this tutorial, we will almost reach the point where these hooks mimic sophisticated state management libraries like Redux for globally managed state. Let's dive into the application which we will implement together step by step.",
      },
    ],
  },
  comments: { error: false, comments: [] },
};

export const mockAuthStore = {
  auth: {
    loading: false,
    error: false,
    user: null,
    users: [
      { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'Software Lover', logged_in: true },
      { id: 2, email: 'alan@turing.com', password: 'iluvswpp', name: 'Alan Turing', logged_in: false },
      { id: 3, email: 'edsger@dijkstra.com', password: 'iluvswpp', name: 'Edsger Dijkstra', logged_in: false },
    ],
  },
  article: {
    error: false,
    article: {
      id: 0,
      author_id: 1,
      title: '10 React JS Articles Every Web Developer Should Read',
      content:
        'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
    },
    articles: [
      {
        id: 0,
        author_id: 1,
        title: '10 React JS Articles Every Web Developer Should Read',
        content:
          'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
      },
      {
        id: 11,
        author_id: 2,
        title: 'React: A JavaScript library for building user interfaces',
        content:
          'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
      },
      {
        id: 12,
        author_id: 1,
        title: 'Building the New facebook.com with React, GraphQL and Relay',
        content:
          "Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook.",
      },
      {
        id: 13,
        author_id: 1,
        title: 'React State with Hooks: useReducer, useState, useContext',
        content:
          "If you haven't used state management excessively in React Function Components, this tutorial may help you to get a better understanding of how React Hooks -- such as useState, useReducer, and useContext -- can be used in combination for impressive state management in React applications. In this tutorial, we will almost reach the point where these hooks mimic sophisticated state management libraries like Redux for globally managed state. Let's dive into the application which we will implement together step by step.",
      },
    ],
  },
  comments: { error: false, comments: [] },
};
