<template>
  <div>
    <h3>demo3 原始使用rxjs与集成vue-rx的区别(事件)</h3>
    <h4>未集成vue-rx:</h4>
    <button class="btn" ref="btn">点击获取数据</button>
    <p>{{ data }}</p>
    <h4>集成vue-rx:</h4>
    <button class="btn" v-stream:click="getData$">点击获取数据</button>
    <p>{{ data$ }}</p>
    <h4>v-stream传输额外数据(点击对应数字下方显示):</h4>
    <ul>
      <li v-for="(num, index) in numList" v-stream:click="{
        subject: getNum$,
        data: {
          'index': index,
          'num': num
        }
      }">{{ num }}</li>
    </ul>
    <p>点击的数字为：{{ num$.index }}</p>
    <p>点击的数字下标为：{{ num$.num }}</p>
  </div>
</template>

<script>
import Rx from 'rxjs/Rx'

export default {
  data () {
    return {
      data: '',
      numList: [1, 2, 3]
    }
  },
  // 需要获取dom，所以必须是mounted后执行才能成功
  mounted () {
    // fromEvent可以将dom绑定事件并转化成Observable可观察对象
    Rx.Observable.fromEvent(this.$refs['btn'], 'click')
      .subscribe(e => {
        this.data = '成功获取data'
      })
  },
  // v-stream事件可以统一写在这里，具体可以看vue-rx的使用
  domStreams: [
    'getData$',
    'getNum$'
  ],
  subscriptions () {
    return {
      data$: this.getData$
        // map操作符主要用于映射数据进来，可以在函数中对数据进行一些处理再往下传
        .map(e => {
          return '成功获取data'
        }),
      num$: this.getNum$
        // 从传入的对象中获取key为data的value,传入下一个operator
        .pluck('data')
        .map(data => data)
        // 因为视图引用了num$.index，所以这里要初始化num$为对象，避免报错
        .startWith({})
    }
  }
}
</script>

<style scoped>
.btn {
  border: 1px solid black;
}

ul li {
  width: 200px;
  height: 40px;
  line-height: 40px;
  background-color: black;
  color: white;
  text-align: center;
  margin-bottom: 10px;
}
</style>




