<script>
import Note from '@/components/Note.vue';

class NoteClass {
   constructor(date) {
      this.name = 'New Note';
      this.content = '';
      this.creationDate = date;
   }
}

export default {
   name: 'app',

   components: { Note },

   data: () => ({
      notes: [
         { name: 'Note 1', content: '' },
      ],
      search: '',
      selected: 0,
   }),

   methods: {
      newNote() {
         this.notes.unshift(new NoteClass(new Date()));
         this.selected = this.selected + 1;
      },

      selectNote(index) {
         this.selected = index;
      },
   },
};
</script>

<template>
   <div id="app">
      <header class="header">Simple Notes</header>

      <section class="nav">
         <div class="search">
            <input placeholder="Search" v-model="search" />
            <button>Find</button>
         </div>

         <button class="new-note" @click="newNote">New Note</button>

         <div class="notes">
            <Note
               v-for="(note, i) in notes"
               :key="i"
               :note="note"
               :selected="selected === i"
               @click="selectNote(i)"
            />
         </div>
      </section>

      <router-view/>
   </div>
</template>

<style lang="scss">
$dark: #323231;
$darker: #212121;
$white: #f5f5f5;

#app {
   height: 100vh;
   max-height: 100vh;
   width: 100%;
   background: $darker;
   overflow: hidden;
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: $white;
}

.header {
   height: 40px;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
}

.nav {
   height: calc(100% - 40px);
   width: 240px;
   box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.25);

   .search {
      height: 26px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
         height: 100%;
         width: 200px;
         background: $dark;
         color: $white;
         border: 1px solid $dark;
         border-right: 1px solid $darker;
         padding: 0px 6px;
         outline: none;
         &:focus { border: 1px solid #faa500 }
      }

      button {
         height: 100%;
         width: 40px;
         display: flex;
         background: $dark;
         justify-content: center;
         align-items: center;
         border: none;
         color: $white;
         cursor: pointer;
         outline: none;
         transition: .15s background ease-in-out;
         &:hover { background: rgba(255, 255, 255, 0.25); }
         &:active { background: rgba(255, 255, 255, 0.12); }
      }
   }

   .new-note {
      height: 20px;
      width: 100%;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0px;
      border: 1px solid aqua;
      color: $white;
      cursor: pointer;
      transition: .15s background ease-in-out;
      &:hover {
         background: rgba(255, 255, 255, 0.12);
      }
   }

   .notes {
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar { width: 6px; }
      &::-webkit-scrollbar-track { background: transparent; }
      &::-webkit-scrollbar-thumb { background: #faa500; }
   }
}
</style>
