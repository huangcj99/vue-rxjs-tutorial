<template>
  <div>
    <h3>demo5 操控频率、延迟等operator</h3>
    <button class="btn" v-stream:click="getCount$">点击获取count$</button>
    <p>count$：{{ count$ }}</p>
    <input type="text" v-stream:keyup="getInput$">
    <p>value$: {{ value$  }}</p>
  </div>
</template>

<script>
import Rx from 'rxjs/Rx'

export default {
  data () {
    return {
      count: 0  
    }
  },
  domStreams: [
    'getCount$',
    'getInput$'
  ],
  subscriptions () {
    return {
      /**
       * throttleTime 3秒内若再有点击，则忽略，3秒内只允许一次点击
       * 可以用于防止用户点击频率过高
       * 滚动事件的触发频率过高可以用这个operator限制触发频率
       */
      count$: this.getCount$
        .throttleTime(3000)
        .map(data => this.count++),
      /**
       * 2秒后才将最新的值发出
       * 类似百度搜索关键词时控制发出请求的间隔
       */
      // value$: this.getInput$
      //   .debounceTime(2000)
      //   .map(e => {
      //     return e.event.target.value
      //   }),
      /**
       * 2秒后才将最新的值发出
       * 2秒后发出的值如果和之前发出的值一样则不发出
       * 类似百度搜索关键词时控制发出请求的间隔
       */
      value$: this.getInput$
        // 选取e.event.target.value
        .pluck('event', 'target', 'value')
        .debounceTime(2000)
        // 根据value值作比较，如果和上一次一样则不发出值
        .distinctUntilChanged()
        .map(value => {
          alert('值不一样')
          return value
        })
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.btn {
  border: 1px solid black;
}

input {
  border: 1px solid black;
}
</style>




