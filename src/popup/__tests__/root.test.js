import { mount } from '@vue/test-utils';
import root from '../root';

describe('Popup root', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(root);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders popup', () => {
    const wrapper = mount(root);
    expect(wrapper.element).toMatchSnapshot();
  });
});
