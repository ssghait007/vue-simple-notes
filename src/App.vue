<script>
import moment from 'moment';
import Note from '@/components/Note.vue';
import NoteEdit from '@/views/NoteEdit.vue';

class NoteClass {
   constructor() {
      this.name = 'New Note';
      this.content = '';
      this.creationDate = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
   }
}

export default {
   name: 'app',

   components: { Note, NoteEdit },

   data: () => ({
      notes: [],
      search: '',
      selected: 0,
      lastSaved: '',
      interval: '',
   }),

   computed: {
      filteredNotes() {
         if (this.search) {
            return this.notes.filter(note => {
               return note.name.toLowerCase().includes(this.search.toLowerCase());
            });
         }

         return this.notes;
      },
   },

   created() {
      const notes = JSON.parse(localStorage.getItem('simple-notes'));
      if (notes) {
         this.notes = notes
      } else {
         localStorage.setItem('simple-notes', JSON.stringify([]));
      }

      this.autoSave();
   },

   destroyed() {
      clearInterval(this.interval);
   },

   methods: {
      autoSave() {
         this.interval = setInterval(() => {
            localStorage.setItem('simple-notes', JSON.stringify(this.notes));
            this.lastSaved = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
         }, 1000 * 5); // save every 5 seconds
      },

      newNote() {
         this.notes.unshift(new NoteClass());
      },

      selectNote(index) {
         this.selected = index;
      },

      editNote(key, e) {
         this.notes[this.selected][key] = e.target.value;
      },

      deleteNote(index) {
         const newNotes = [...this.notes];
         newNotes.splice(index, 1);
         this.notes = newNotes;
      },
   },
};
</script>

<template>
   <div id="app">
      <header class="header">
         <div>Simple Notes</div>
         <div v-show="lastSaved" class="last-saved">Last Save: {{ lastSaved }}</div>
      </header>

      <div class="body">
         <section class="nav">
            <div class="search">
               <input placeholder="Search" v-model="search" />
            </div>

            <button class="new-note" @click="newNote">New Note</button>

            <div class="notes">
               <Note
                  v-for="(note, i) in filteredNotes"
                  :key="i"
                  :note="note"
                  :selected="selected === i"
                  @click="selectNote(i)"
                  @delete="deleteNote(i)"
               />
            </div>
         </section>

         <section class="window">
            <NoteEdit
               :note="notes[selected]"
               @name="e => editNote('name', e)"
               @content="e => editNote('content', e)"
            />
         </section>
      </div>
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
   justify-content: space-between;
   align-items: center;
   padding: 0px 30px;
   position: relative;
   z-index: 10;
   box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);

   .last-saved {
      color: #888;
      font-size: 12px;
   }
}

.body {
   height: calc(100% - 40px);
   width: 100%;
   display: flex;

   .nav {
      height: 100%;
      width: 240px;
      padding-top: 10px;
      position: relative;
      z-index: 9;
      box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.25);

      .search {
         height: 26px;
         width: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;

         input {
            height: 100%;
            width: 100%;
            background: $dark;
            color: $white;
            border: 1px solid $dark;
            border-right: 1px solid $darker;
            padding: 0px 6px;
            outline: none;
            &:focus { border: 1px solid #888888 }
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

   .window {
      height: 100%;
      width: calc(100% - 240px);
   }
}

</style>
