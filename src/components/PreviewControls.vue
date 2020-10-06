<script>
export default {
  name: "preview-controls",

  props: {
    mode: { type: String, default: () => "plaintext" },
  },

  methods: {
    changePreviewMode(mode) {
      this.$emit("modeChange", mode);
    },
  },
};
</script>

<template>
  <div class="controls">
    <button
      @click="changePreviewMode('plaintext')"
      :class="{ active: mode === 'plaintext' }"
      class="control-btn"
    >Plaintext</button>
    <button
      @click="changePreviewMode('markdown')"
      :class="{ active: mode === 'markdown' }"
      class="control-btn"
    >Markdown</button>
  </div>
</template>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;

  @media (min-width: 750px) {
    justify-content: flex-end;
    margin: 0.5rem 0;
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
</style>
