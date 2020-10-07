import { shallowMount } from "@vue/test-utils";
import Note from "@/components/Note.vue";

describe("Note.vue", () => {
  it("should mount without props", () => {
    const wrapper = shallowMount(Note);
    expect(wrapper.exists()).toBe(true);
  });

  it("should display passed props", () => {
    const dummyNote = { name: "DummyNote", content: "dummy content" };
    const wrapper = shallowMount(Note, {
      propsData: {
        note: dummyNote,
        selected: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.element.firstChild.firstChild.textContent).toBe(
      dummyNote.name
    );
    expect(wrapper.element.firstChild.childNodes[2].textContent).toBe(
      dummyNote.content
    );
  });

  it("should emit event on click", async () => {
    const wrapper = shallowMount(Note, {
      propsData: {
        note: { name: "DummyNote", content: "dummy content" },
        selected: true,
      },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click").length).toEqual(1);
    await wrapper.find("div.delete").trigger("click");
    expect(wrapper.emitted("delete").length).toEqual(1);
  });
});
