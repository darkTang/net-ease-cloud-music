<template>
  <div class="n-minelst n-minelst-2">
    <h2 class="f-ff1">云音乐特色榜</h2>
    <ul class="f-cb">
      <li
        class="mine"
        :class="{ 'z-selected': characToplist.selected }"
        v-for="(characToplist, index) in characTopList"
        :key="characToplist.id"
        @click="toggleTopList(characToplist)"
      >
        <div class="item f-cb">
          <div class="left">
            <a href="#" class="avatar">
              <img :src="characToplist.coverImgUrl" alt="" />
              <span class="mask"></span>
            </a>
          </div>
          <p class="name">
            <a href="#" class="s-fc0">{{ characToplist.name }}</a>
          </p>
          <p class="s-fc4">{{ characToplist.updateFrequency }}</p>
        </div>
      </li>
    </ul>

    <h2 class="scd f-ff1">全球媒体榜</h2>
    <ul class="f-cb">
      <li
        class="mine"
        :class="{ 'z-selected': globalToplist.selected }"
        v-for="(globalToplist, index) in globalTopList"
        :key="globalToplist.id"
        @click="toggleTopList(globalToplist)"
      >
        <div class="item f-cb">
          <div class="left">
            <a href="#" class="avatar">
              <img :src="globalToplist.coverImgUrl" alt="" />
              <span class="mask"></span>
            </a>
          </div>
          <p class="name">
            <a href="#" class="s-fc0">{{ globalToplist.name }}</a>
          </p>
          <p class="s-fc4">{{ globalToplist.updateFrequency }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['allTopList'],
  computed: {
    characTopList() {
      return this.allTopList.filter((item, index) => index < 4)
    },
    globalTopList() {
      return this.allTopList.filter((item, index) => index >= 4)
    }
  },
  methods: {
    toggleTopList(currentTopList) {
      this.allTopList.forEach(item => {
        item.selected = false
      })
      currentTopList.selected = true
      this.$route.meta.updateFrequency = currentTopList.updateFrequency
      this.$router.push(`/discover/toplist/?id=${currentTopList.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.n-minelst-2 {
  margin-top: 40px;
  li:hover {
    background-color: #e6e6e6;
  }
  .f-ff1 {
    font-family: simsun, \5b8b\4f53;
  }
  h2 {
    box-sizing: content-box;
    padding: 0 10px 12px 15px;
    font-size: 14px;
    color: #000;
  }
  .z-selected {
    background: #e6e6e6;
  }
  ul * {
    cursor: pointer;
    vertical-align: middle;
  }
  li {
    position: relative;
    zoom: 1;
    height: 42px;
    box-sizing: content-box;
    padding: 10px 0 10px 20px;
    .f-cb::after {
      clear: both;
      content: '.';
      display: block;
      height: 0;
      visibility: hidden;
    }
    .item {
      box-sizing: content-box;
      padding-left: 50px;
      .left {
        display: inline;
        float: left;
        margin-left: -50px;
        overflow: hidden;
        width: 40px;
        .avatar {
          display: block;
          position: relative;
          width: 40px;
          height: 40px;
          img {
            width: 40px;
            height: 40px;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            background-position: -310px -330px;
          }
        }
      }
      .name {
        width: 150px;
        overflow: hidden;
        margin-top: 2px;
        margin-bottom: 8px;
        .s-fc0 {
          color: #000;
        }
        a {
          white-space: nowrap;
        }
      }
      .s-fc4 {
        color: #999;
      }
    }
  }
  .scd {
    margin-top: 20px;
  }
}
</style>