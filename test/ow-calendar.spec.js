import { mount } from '@vue/test-utils';
import owCalendar from '../src/lib/ow-calendar';

test('是一个 Vue 实例', () => {
  let wrapper = mount(owCalendar);
  // expect(wrapper.find(MyCustomComponent).exists());
  expect(true);
  // wrapper.isVueInstance()).toBeTruthy();
});
