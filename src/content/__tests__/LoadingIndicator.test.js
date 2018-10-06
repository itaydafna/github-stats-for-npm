import { mount } from '@vue/test-utils';
import LoadingIndicator from '../components/LoadingIndicator';

describe('LoadingIndicator', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(LoadingIndicator);
  });
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders a loading indicator', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
