<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" v-on:click="clearTodo">Clear All</span>
    <i class="fab fa-500px"></i>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      clearTodo: 'clearAllItems'
    })
    // clearTodo() {
    //   this.$store.commit('clearAllItems');
    // },
  }
}
</script>

<style scoped>
  .clearAllContainer{
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 auto;
  }
  .clearAllBtn{
    color: #e20303;
    display: block;
  }
</style>