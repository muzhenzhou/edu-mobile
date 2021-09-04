<template>
  <div class="course-header">
    <van-image :src="require('@/assets/logo.jpg')"></van-image>
  </div>
</template>

<script>
import { Image } from 'vant'
export default {
  name: 'CourseHeader',
  components: {
    VanImage: Image
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
