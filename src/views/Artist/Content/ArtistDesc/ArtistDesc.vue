<template>
  <div class="n-artdesc">
    <h2>
      <i>&nbsp;</i>
      {{ artistInfo.name }}简介
    </h2>
    <p>
      {{ briefDesc }}
    </p>
    <div v-for="(intro, index) in introduction" :key="index">
      <h2>{{ intro.ti }}</h2>
      <p class="z-indent" v-for="(value, indexes) in intro.txtList" :key="indexes">
        {{ value }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      briefDesc: '',
      introduction: []
    }
  },
  async created() {
    const result = await this.$API.artist.reqGetArtistDesc(this.$route.query.id)
    this.briefDesc = result.briefDesc
    result.introduction.forEach(item => {
      item.txtList = item.txt.split('\n')
    })
    this.introduction = result.introduction
    console.log(result);
  },
  props: ['artistInfo']
}
</script>

<style lang="less" scoped>
.n-artdesc {
  margin-top: 30px;
  p {
    line-height: 25px;
    color: #666;
    text-indent: 2em;
  }
  h2 {
    margin: 28px 0 8px 0;
    color: #333;
    font-size: 14px;
    i {
      height: 14px;
      width: 3px;
      margin-right: 7px;
      background: #c10d0c;
    }
  }
  .z-indent {
    text-indent: 0;
  }
}
</style>