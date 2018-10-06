import Vue from 'vue';
import { mount } from '@vue/test-utils';
import AppAnchor from '../components/AppAnchor';
import stats from './mock-stats.json';
import * as filters from '../filters';

describe('AppAnchor', () => {
  let wrapper;
  beforeEach(() => {
    Object.keys(filters).forEach(filter => {
      Vue.filter(filter, filters[filter]);
    });
    wrapper = mount(AppAnchor, { propsData: { starsCount: 4321 } });
  });
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders AppAnchor component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('adds comma separation to long numbers', () => {
    wrapper.setProps({ starsCount: 7654321 });
    expect(wrapper.html()).toContain('7,654,321');
  });

  it('does not add comma separation to short numbers', () => {
    wrapper.setProps({ starsCount: 29 });
    expect(wrapper.html()).toContain('29');
  });
});
