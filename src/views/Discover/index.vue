<template>
  <div>
    <Banner />
    <div class="g-mn">
      <div class="g-mn1">
        <Recommend />
        <Person v-if="token" />
        <Disk />
        <List />
      </div>
      <div class="g-sd1">
        <Aside />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import Recommend from './Recommend'
import Disk from './Disk'
import List from './List'
import Aside from './Aside'
import Person from './Person'
import { getToken } from '@/utils/auth'
export default {
  components: {
    Banner,
    Recommend,
    Disk,
    List,
    Aside,
    Person
  },
  computed: {
    token() {
      return getToken()
    }
  }
}
</script>

<style lang="less" scoped>
.g-mn {
  display: flex;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .g-mn1 {
    flex: 1;
    padding: 20px 20px 40px;
    border-right: 1px solid #ccc;
  }
  .g-sd1 {
    position: relative;
    width: 250px;
  }
}
</style>