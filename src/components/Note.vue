<script>
export default {
   name: 'note',

   props: {
      note: { type: Object, default: () => ({}) },
      selected: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div :class="['note', { selected }]" @click="$emit('click')">
      {{ note.name }}
   </div>
</template>

<style scoped lang="scss">
.note {
   width: 100%;
   height: 40px;
   border-left: 5px solid transparent;
   border-bottom: 1px solid #323231;
   cursor: pointer;
   transition: .15s background ease-in-out;
   &:first-child { border-top: 1px solid #323231; }
   &:hover { background: rgba(255, 255, 255, 0.08); }
   &.selected {
      border-left-color: #faa500;
   }
}
</style>
