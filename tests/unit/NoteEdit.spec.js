import { shallowMount } from "@vue/test-utils";
import NoteEdit from "@/views/NoteEdit.vue";
import moment from "moment";
import Vue from "vue";

describe("NoteEdit.vue", () => {
  it("should mount without props", () => {
    const wrapper = shallowMount(NoteEdit);
    expect(wrapper.exists()).toBe(true);
  });

  it("should display passed props", async () => {
    const dummyDate = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
    const wrapper = shallowMount(NoteEdit, {
      propsData: {
        note: {},
        selected: true,
        creationDate: dummyDate,
      },
    });
    expect(wrapper.attributes().creationdate).toEqual(dummyDate);
  });

  it("should emit events for input change", async () => {
    const dummyNote = { name: "DummyNote", content: "dummy content" };
    const dummyDate = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
    const wrapper = shallowMount(NoteEdit, {
      propsData: {
        note: dummyNote,
        selected: true,
        creationDate: dummyDate,
      },
    });
    const textInput = wrapper.find("input");
    textInput.element.value = "value";
    await Vue.nextTick();

    expect(wrapper.find("input").element.value).toBe("value");

    const textAreaInput = wrapper.find("textarea");
    textAreaInput.element.value = "value";
    await Vue.nextTick();

    expect(wrapper.find("textarea").element.value).toBe("value");
  });
});
