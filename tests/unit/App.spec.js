import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Note.vue", () => {
  global.confirm = jest.fn(() => true);

  it("should mount", () => {
    const wrapper = shallowMount(App, {
      propsData: { note: {} },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should have corect computed property", async () => {
    const dummyNote1 = {
      name: "New Note1",
      content: "",
      creationDate: "October 6th 2020, 10:59:43 pm",
    };
    const dummyNote2 = {
      name: "New Note2",
      content: "",
      creationDate: "October 6th 2020, 10:59:43 pm",
    };
    const dummyNote3 = {
      name: "New Note3",
      content: "",
      creationDate: "October 6th 2020, 10:59:43 pm",
    };
    const wrapper = shallowMount(App, {
      data: () => ({ notes: [] }),
    });
    await wrapper.setData({ notes: [dummyNote1, dummyNote2, dummyNote3] });
    expect(wrapper.vm.filteredNotes.length).toBe(3);
    await wrapper.setData({ search: "New Note1" });
    expect(wrapper.vm.filteredNotes.length).toBe(1);
    expect(wrapper.vm.filteredNotes).toStrictEqual([dummyNote1]);
  });

  it("should have correct CRUD methods", async () => {
    const wrapper = shallowMount(App, {
      data: () => ({ notes: [] }),
    });
    await wrapper.vm.newNote();
    expect(wrapper.vm.filteredNotes.length).toBe(1);
    await wrapper.setData({ selected: 0 });
    await wrapper.vm.editNote("name", { target: { value: "Note1" } });
    await wrapper.vm.editNote("content", { target: { value: "NoteContent" } });
    expect(wrapper.vm.filteredNotes[0].name).toStrictEqual("Note1");
    expect(wrapper.vm.filteredNotes[0].content).toStrictEqual("NoteContent");
    const e = { stopPropagation: jest.fn() };
    await wrapper.vm.deleteNote(e, 0);
    expect(wrapper.vm.filteredNotes.length).toBe(0);
  });
});
