import Vue from 'vue';
import { mount } from '@vue/test-utils';
import App from '../App';
import stats from './mock-stats.json';
import * as filters from '../filters';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    Object.keys(filters).forEach(filter => {
      Vue.filter(filter, filters[filter]);
    });
    wrapper = mount(App);
  });
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('should have the root "__gh-stats-for-npm" id', () => {
    expect(wrapper.contains('#__gh-stats-for-npm')).toBe(true);
  });
  it('should be initially rendered with a closed stats box modal ', () => {
    expect(wrapper.vm.statsBoxOpen).toBe(false);
  });
  it('should open stats box upon mouse enter', () => {
    wrapper.trigger('mouseenter');
    expect(wrapper.vm.statsBoxOpen).toBe(true);
  });
  it('should close stats box upon mouse leave', () => {
    wrapper.trigger('mouseenter');
    wrapper.trigger('mouseleave');
    expect(wrapper.vm.statsBoxOpen).toBe(false);
  });

  describe('Snapshot tests', () => {
    it('should render loader when no stats are available', () => {
      wrapper.setProps({ stats: null });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('should render appAnchor when stats are injected', () => {
      wrapper.setProps({ stats });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('should render appAnchor and statsBox when stats are injected and statsBoxOpen is set to true', () => {
      wrapper.setProps({ stats });
      wrapper.setData({ statsBoxOpen: true });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
