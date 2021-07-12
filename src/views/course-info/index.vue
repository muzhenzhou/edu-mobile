<template>
  <div class="course-info">
    <van-cell-group>
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-description">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail"></van-cell>
    </van-cell-group>
    <!-- 选项卡 -->
    <van-tabs scrollspy sticky>
      <van-tab title="详情">
        <div v-html="course.courseDescription"></div>
      </van-tab>
      <van-tab title="内容">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course.js'

export default {
  name: 'CourseInfo',
  components: {
  },
  data () {
    return {
      // 课程信息
      course: {}
    }
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    }
  }
}
</script>

<style lang='scss' scoped>
.van-cell {
  padding: 0;
}
.course-img {
  height: 280px;
}

.course-description {
  padding: 10px 20px;
  height: 150px;
}

.course-sale-info {
  display: flex;
}

.course-price {
  flex: 1;
  margin: 0;
}

.course-price .discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}

.course-sale-info .tag {
  margin-left: 10px;
  padding: 7px 8px;
  line-height: 15px;
  background-color: #f8f9fa;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 700;
  color: #666;

}
</style>
