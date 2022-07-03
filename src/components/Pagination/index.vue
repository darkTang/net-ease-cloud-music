<template>
  <div class="pagination">
    <button
      :disabled="pageNo === 1"
      class="preOrNext"
      @click="$emit('getPageNo', pageNo - 1)"
    >
      <上一页
    </button>
    <button
      v-if="startNumAndEndNum.start >= 2"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start >= 3" style="cursor: default">
      ···
    </button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <button
      v-if="startNumAndEndNum.end + 1 < totalPage"
      style="cursor: default"
    >
      ···
    </button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      class="preOrNext"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页>
    </button>
  </div>
</template>


<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this
      let start = 0
      let end = 0
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - (Math.floor(continues / 2))
        end = pageNo + (Math.floor(continues / 2))
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  margin: 20px 0;
  text-align: center;
  button {
    margin: 0 2px;
    background-color: #fff;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 24px;
    height: 24px;
    line-height: 22px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #ccc;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #e1151d;
      border-color: #a2161b;
      color: #fff;
    }
    &:hover {
      border: 1px solid #000;
    }
  }
  .preOrNext {
    background-color: #ececec;
    &:hover {
      background-color: #efefef;
      border: 1px solid #ccc;
    }
  }
}
</style>