<script>
// export default{} allows you to use the component within the project
export default {
   // Name: Component name
   name: 'note',

   // Props: Add properties to the object
   props: {
      note: { type: Object, default: () => ({}) },
      selected: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div :class="['note', { selected }]" @click="$emit('click')">
      <section class="data">
         <div class="name">{{ note.name }}</div>
         <div class="content">{{ note.content }}</div>
      </section>

      <div class="delete" title="Delete" @click="(e) => $emit('delete', e)">
         &times;
      </div>
   </div>
</template>

<style scoped lang="scss">
.note {
   width: 100%;
   height: 40px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   border-left: 5px solid transparent;
   border-bottom: 1px solid #323231;
   padding: 4px 6px;
   transition: 0.15s background ease-in-out;
   &:last-child {
      border-bottom: none;
   }
   &:hover {
      background: rgba(255, 255, 255, 0.08);
   }
   &.selected {
      border-left-color: #faa500;
   }

   .data {
      height: 100%;
      width: calc(100% - 16px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div {
         width: 100%;
         text-align: left;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }

      .content {
         font-size: 12px;
         color: #888888;
      }
   }

   .delete {
      width: 16px;
      font-size: 16px;
      opacity: 0.5;
      cursor: pointer;
      transition: 0.15s opacity ease-in-out;
      &:hover {
         opacity: 1;
      }
   }
}
</style>
