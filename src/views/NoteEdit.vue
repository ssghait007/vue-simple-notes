<script>
import marked from "marked";
import "../markdown.scss";

export default {
  name: "note-edit",

  props: {
    note: { type: Object, default: () => ({}) },
  },

  data: () => ({
    previewMode: "plaintext",
  }),

  methods: {
    changePreviewMode(mode) {
      this.previewMode = mode;
    },

    getMarkdownPreview() {
      return marked(this.note.content);
    },
  },
};
</script>

<template>
  <div class="note-edit">
    <div class="title">
      <input class="name" @input="e => $emit('name', e)" :value="note.name" />
      <div class="date">{{ note.creationDate }}</div>
    </div>

    <div class="controls">
      <button
        @click="changePreviewMode('plaintext')"
        :class="{ active: previewMode === 'plaintext' }"
        class="control-btn"
      >Plaintext</button>
      <button
        @click="changePreviewMode('markdown')"
        :class="{ active: previewMode === 'markdown' }"
        class="control-btn"
      >Markdown</button>
    </div>

    <textarea
      v-if="previewMode === 'plaintext'"
      @input="e => $emit('content', e)"
      :value="note.content"
      placeholder="Note"
    />

    <div
      :class="{ 'markdown-body': true }"
      v-if="previewMode === 'markdown'"
      v-html="getMarkdownPreview()"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
$header-height: 60px;
$controls-height: 31px;

.note-edit {
  height: 100%;
  width: 100%;
  padding: 10px;

  .title {
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .name {
      width: 50%;
      background: transparent;
      border: none;
      outline: none;
      border-bottom: 1px solid #323231;
      margin-bottom: 6px;
      font-size: 26px;
      color: #f5f5f5;

      @media (max-width: 750px) {
        width: 100%;
      }
    }

    .date {
      height: 16px;
      font-size: 12px;
      font-style: italic;
      color: #888;
    }
  }

  textarea {
    height: calc(100% - #{$header-height} - #{$controls-height});
    width: 100%;
    background: #212121;
    border: none;
    outline: none;
    color: #f5f5f5;
  }

  .controls {
    display: flex;
    justify-content: center;
    margin: 0.5rem 0;

    @media (min-width: 750px) {
      justify-content: flex-end;
    }

    * + * {
      margin-left: 1rem;
    }
  }

  .control-btn {
    padding: 0.5rem 2rem;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 10px;
    background: none;
    cursor: pointer;
    transition: 0s background ease-in-out;

    &.active,
    &:hover {
      background: #fff;
      color: #212121;
    }
  }

  .markdown-body {
    height: calc(100% - #{$header-height} - #{$controls-height});
    padding: 0 1rem;
    text-align: left;
    overflow: auto;
  }
}
</style>
