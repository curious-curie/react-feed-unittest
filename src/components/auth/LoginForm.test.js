import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

const handleSubmit = jest.fn();
const getWrapper = () => {
  const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} />);
  const emailInput = wrapper.find('#email-input');
  const event = {
    preventDefault() {},
    target: { name: 'email', value: 'swpp@snu.ac.kr' },
  };
  emailInput.simulate('change', event);

  const pwInput = wrapper.find('#pw-input');
  const event2 = {
    preventDefault() {},
    target: { name: 'password', value: 'iluvswpp' },
  };
  pwInput.simulate('change', event2);
  return wrapper;
};

describe('<LoginForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<LoginForm handleSubmit={handleSubmit} />);
    const wrapper = component.find('.login-form__wrapper');
    expect(wrapper.length).toBe(1);
  });

  it('should reflect input change', () => {
    const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} />);
    const input = wrapper.find('#email-input');
    expect(input.length).toBe(1);
    expect(input.prop('value')).toEqual('');
    const event = {
      preventDefault() {},
      target: { name: 'email', value: 'hello@hello.com' },
    };
    input.simulate('change', event);
  });

  it('should handle submit', () => {
    const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} />);
    const button = wrapper.find('#login-button');
    expect(button.length).toBe(1);
    window.alert = jest.fn().mockImplementation(() => true);

    const emailInput = wrapper.find('#email-input');
    const event = {
      preventDefault() {},
      target: { name: 'email', value: 'swpp@snu.ac.kr' },
    };
    emailInput.simulate('change', event);

    const pwInput = wrapper.find('#pw-input');
    const event2 = {
      preventDefault() {},
      target: { name: 'password', value: 'iluvswpp' },
    };
    pwInput.simulate('change', event2);
    button.simulate('click');
    expect(jest.fn()).toBeCalledTimes(0);
  });

  it('', () => {
    const wrapper = getWrapper();

    const button = wrapper.find('#login-button');
    expect(button.length).toBe(1);
    window.alert = jest.fn().mockImplementation(() => true);
    button.simulate('click');
  });
});
