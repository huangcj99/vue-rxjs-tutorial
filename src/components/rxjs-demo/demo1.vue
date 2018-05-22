<template>
  <div>
    <h3>demo1 原始使用rxjs与集成vue-rx的区别</h3>

    <p>原始rxjs使用方式: </p>
    <p style="color: red;">{{ testRx$ }}</p>
    <p>集成vue-rx后rxjs使用方式: </p>
    <p style="color: red;">{{ testVueRx$ }}</p>
  </div>
</template>

<script>
import Rx from 'rxjs/Rx'

export default {
  data () {
    return {
      // 表示rx数据流的值，统一末尾加$
      testRx$: ''
    }
  },
  created () {
    Rx.Observable.of('这是testRx$')
      // 原始rx使用需要调用subscribe订阅后，Observable发出的值'这是testRx$'才会被发送到出去
      .subscribe(data => {
        this.testRx$ = data
      })
  },
  /**
   * 集成了vue-rx后，vue中多了subscriptions这个钩子,用法与data类似
   * 只是值用Observable表示
   * 并且默认调用subscribe进行订阅，将返回的值赋给testVueRx$
   * testVueRx$就会与视图进行绑定
   * 这里我们在订阅后马上发出‘test’这个值
   */
  subscriptions () {
    return {
      testVueRx$: Rx.Observable.of('这是testVueRx$')
    }
  }
}
</script>



