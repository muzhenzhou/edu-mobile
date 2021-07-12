<template>
  <div class="course-content">
    <!-- 顶部广告轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 底部课程列表 -->
    <course-content-list :fetch-data="fetchData"></course-content-list>
  </div>
</template>

<script>
import { getAllAds, getQueryCourses } from '@/services/course.js'
import CourseContentList from '@/components/CourseContentList.vue'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  },
  created () {
    this.loadAds()
  },
  data () {
    return {
      adList: []
    }
  },
  methods: {
    fetchData (options) {
      return getQueryCourses(options)
    },
    async loadAds () {
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      this.adList = data.content[0].adDTOList
    }
  }
}
</script>

<style lang='scss' scoped>
.my-swipe {
  width: 100%;
}

.my-swipe .van-swipe-item {
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.my-swipe img {
  height: 170px;
}

.course-content-list {
  top: 240px;
  bottom: 50px;
}
</style>
