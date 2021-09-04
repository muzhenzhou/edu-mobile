<template>
  <div class="course-info">
    <van-cell-group :style="styleOptions">
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
      <van-cell class="course-detail">
        <!-- 选项卡 -->
        <van-tabs scrollspy sticky>
          <van-tab title="详情">
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            ></course-section>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button
        type="primary"
        @click="handlePay"
      >立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { Cell, CellGroup, Tab, Tabs, Tabbar, Button } from 'vant'
import { getCourseById, getSectionAndLesson } from '@/services/course.js'
import CourseSection from './components/CourseSection.vue'

export default {
  name: 'CourseInfo',
  components: {
    CourseSection,
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanTab: Tab,
    VanTabs: Tabs,
    VanTabbar: Tabbar,
    VanButton: Button
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 章节信息
      sections: {},
      // 样式信息
      styleOptions: {}
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
    this.loadSection()
  },
  methods: {
    handlePay () {
      if (this.$store.state.user) {
        // 如果已经登录，直接跳转支付页
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        // 如果未登录，则先跳转至登录页，完成登录后再跳转回当前页
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    },
    async loadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
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

.discounts {
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

// 添加底部导航后设置
.van-cell-group {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  font-size: 14px;
}

.van-button {
  width: 50%;
  height: 80%;
}
</style>
