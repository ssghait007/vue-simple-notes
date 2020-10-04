<script>
export default {
  name: 'note-edit',

  props: {
     note: { type: Object, default: () => ({}) },
  },
};
</script>

<template>
  <div class="note-edit">
     <div class="title">
        <input class="name" @input="e => $emit('name', e)" :value="note.name" />
        <div class="date">{{ note.creationDate }}</div>
     </div>

      <textarea
         :value="note.content"
         @input="e => $emit('content', e)"
         placeholder="Note"
      />
  </div>
</template>

<style lang="scss" scoped>
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
      }

      .date {
         height: 16px;
         font-size: 12px;
         font-style: italic;
         color: #888;
      }
   }

   textarea {
      height: calc(100% - 60px);
      width: 100%;
      background: #212121;
      border: none;
      outline: none;
      color: #f5f5f5;
   }
}
</style>
