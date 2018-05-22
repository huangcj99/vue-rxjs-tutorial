<template>
  <div>
    <h3>demo2 创建将数据转化成Observable方式</h3>
    <p>字符串：{{ str$ }}</p>
    <p>
      数组: 
      <span v-for="(num, index) in arr$" :key="index">{{ num }}</span>
    </p>
    <p>对象：{{ obj$.a }}</p>
    <p>布尔值：{{ bool$ }}</p>
    <p>promise：{{ promise$ }}</p>
    <p>interval: {{ interval$ }}</p>
  </div>
</template>

<script>
import Rx from 'rxjs/Rx'

export default {
  subscriptions () {
    return {
      /**
       * 普通数据类型都可以用of进行转换
       * promise对象可用from或者fromPromise
       * interval可在给定时间区间内发出自增数字
       */
      str$: Rx.Observable.of('str'),
      arr$: Rx.Observable.of([1, 2, 3]),
      obj$: Rx.Observable.of({ 
        a: 'test-obj' 
      }),
      bool$: Rx.Observable.of(true),
      promise$: Rx.Observable.fromPromise(this.getPromise()),
      interval$: Rx.Observable.interval(1000)
    }
  },
  methods: {
    getPromise () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('promise')
        }, 1000)
      })
    }
  }
}
</script>



