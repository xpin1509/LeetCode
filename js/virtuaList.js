/**
 * 虚拟列表
 * 模拟用背景支撑滚动
 * 只展示当前页面条数
 */
`
<template>
  <div class="list-view" @scroll="handleScroll">
      <div class="list-view-phantom" :style="{ height: contentHeight }"></div>
      <div class="list-view-content" ref="content">
          <div v-for="(el, idx) in visibleData" :key="idx" class="list-view-item">{{el.id}}</div>
      </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Mixins, Prop } from "vue-property-decorator"
@Component({})
export default class vsnode extends Vue {
    list: Array<Object> = []
    visibleData: Array<Object> = []
    itemHeight: number = 30

    get contentHeight () {
        return this.list.length * this.itemHeight} + 'px'
    }
    created () {
        let i = 0
        while (i++ < 10000) {
            this.list.push({
                id: Math.ceil(Math.random() * 1000)
            })
        }
    }
    mounted () {
        this.updateVisibleData()
    }
    updateVisibleData(scrollTop ?: number) {
        scrollTop = scrollTop || 0;
        const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
      const start = Math.floor(scrollTop / this.itemHeight);
      const end = start + visibleCount;
      this.visibleData = this.list.slice(start, end);
      const $el = this.$refs.content as HTMLElement
      $el.style.webkitTransform = 'translate3d(0, ' + start * this.itemHeight + 'px, 0)'
    }
    handleScroll() {
      const scrollTop = this.$el.scrollTop;
      this.updateVisibleData(scrollTop);
    }
}
</script>
<style lang="stylus" scoped>
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #aaa;
}
.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
.list-view-item {
    color: #666;
    line-height 30px
}
</style>
`