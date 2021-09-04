<template>
  <div class="course-section">
    <!-- 章节 -->
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时 -->
    <p
      class="lesson"
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      @click="handleClick(item)"
    >
      <!-- 课时标题 -->
      <span v-text="item.theme"></span>
      <!-- 课时图标 -->
      <van-icon v-if="item.canPlay" name="play-circle" size="20" />
      <van-icon v-else name="lock" size="20" />
    </p>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  name: 'CourseSection',
  components: {
    VanIcon: Icon
  },
  data () {
    return {
    }
  },
  props: {
    // 章节数据
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick (lessonInfo) {
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.course-section {
  padding: 0 20px;
}

.lesson {
  display: flex;
  justify-content: space-between;
}
</style>
