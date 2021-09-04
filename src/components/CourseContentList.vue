<template>
  <div class="course-content-list">
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
    >
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          @click="$router.push({
            name: 'course-info',
            params: {
              courseId: item.id
            }
          })"
        >
          <!-- 课程左侧图片 -->
          <div class="course-img">
            <img :src="item.courseImgUrl || item.image" alt="">
          </div>
          <!-- 课程右侧信息 -->
          <div class="course-info">
            <h3 v-text="item.courseName || item.name"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <p v-if="item.price" class="price-container">
              <span class="course-discounts">￥{{ item.discounts }}</span>
              <s class="course-price">￥{{ item.price }}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List, Cell, Toast } from 'vant'
export default {
  name: 'CourseContentList',
  components: {
    VanPullRefresh: PullRefresh,
    VanList: List,
    VanCell: Cell
  },
  props: {
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 数据列表
      list: [],
      // 是否处于加载中
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 是否处于刷新中
      isRefreshing: false
    }
  },
  methods: {
    async onRefresh () {
      // 还原数据页为1
      this.currentPage = 1
      // 重新请求数据
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.content && data.content.records && data.content.records.length !== 0) {
        this.list = data.content.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      Toast.success('刷新成功')
      this.isRefreshing = false
    },
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.content.records && data.content.records.length !== 0) {
        this.list.push(...data.content.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.course-content-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

.van-cell__value {
  height: 100px;
  padding: 10px 0;
  display: flex;
}

.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

p, h3 {
  margin: 0;
}

.course-info .course-preview {
  flex-grow: 1;
}

.course-info .course-discounts {
  color: #ff7452;
  margin-right: 8px;
}
</style>
