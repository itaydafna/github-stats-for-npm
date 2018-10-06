import Vue from 'vue';
import { mount } from '@vue/test-utils';
import StatsBox from '../components/StatsBox';
import stats from './mock-stats.json';
import * as filters from '../filters';

describe('StatsBox', () => {
  let wrapper;
  beforeEach(() => {
    Object.keys(filters).forEach(filter => {
      Vue.filter(filter, filters[filter]);
    });
    wrapper = mount(StatsBox, { propsData: { repoData: stats } });
  });
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders stats box', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
