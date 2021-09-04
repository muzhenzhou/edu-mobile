<template>
  <div class="learn">
    <!-- 顶部功能 -->
    <van-nav-bar title="已购课程" />
    <!-- 主体课程列表 -->
    <course-content-list :fetch-data="fetchData"></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import CourseContentList from '@/components/CourseContentList.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import { getPurchaseCourse } from '@/services/course.js'
export default {
  name: 'Learn',
  components: {
    LayoutFooter,
    CourseContentList,
    VanNavBar: NavBar
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    }
  },
  data () {
    return {
      courseList: []
    }
  }
}
</script>

<style lang='scss' scoped>
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
