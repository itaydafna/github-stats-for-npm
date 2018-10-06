import { mount } from '@vue/test-utils';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ErrorMessage);
  });
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders an error message', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
