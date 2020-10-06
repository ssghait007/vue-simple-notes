import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Note.vue", () => {
  it("should mount", () => {
    const wrapper = shallowMount(App, {
      propsData: { note: {} },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
