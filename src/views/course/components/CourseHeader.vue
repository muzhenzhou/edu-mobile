<template>
  <div class="course-header">
    <van-image :src="require('@/assets/logo.jpg')"></van-image>
  </div>
</template>

<script>
export default {
  name: 'CourseHeader',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
.course-header {
  height: 70px;
}
.van-image {
  width: 30px;
  margin-left: 15px;
  margin-top: 15px;
}
</style>
