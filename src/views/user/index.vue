<template>
  <div class="user">
    <!-- 顶部导航 -->
    <van-cell-group>
      <!-- 用户信息区域 -->
      <van-cell class="user-info" :border="false">
        <van-image
          width="50"
          height="50"
          round
          :src="userInfo.portrait || 'https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png'"
        />
        <div class="user-info-content">
          <h3 v-text="userInfo.userName">昵称</h3>
          <span>
            <van-icon name="edit" />
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <!-- 账户信息区域 -->
      <van-cell class="account-info">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-value">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">200</span>
            <span>钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">1</span>
            <span>优惠券</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">213</span>
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <!-- 底部菜单 -->
      <van-cell icon="user-o" title="分销中心" is-link value="收益200元"></van-cell>
      <van-cell icon="setting-o" title="个性化设置" is-link></van-cell>
      <van-cell icon="down" title="我的下载" is-link></van-cell>
      <van-cell icon="question-o" title="帮助与反馈" is-link></van-cell>
      <van-cell icon="info-o" title="关于拉勾教育" is-link></van-cell>
    </van-cell-group>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import { CellGroup, Cell, Image, Icon, Grid, GridItem } from 'vant'
import LayoutFooter from '@/components/LayoutFooter.vue'
import { getInfo } from '@/services/user.js'
export default {
  name: 'User',
  components: {
    LayoutFooter,
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanImage: Image,
    VanIcon: Icon,
    VanGrid: Grid,
    VanGridItem: GridItem
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getInfo()
      if (data.state === 1) {
        this.userInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户信息
.user-info {
  padding: 30px 20px;
  background-color: rgb(248, 150, 3);
}

.user-info .van-cell__value {
  display: flex;
}

.user-info .user-info-content {
  padding-left: 15px;
}

.user-info .user-info-content h3 {
  font-size: 18px;
  margin: 5px;
}

// 账户信息
.account-info {
  background-color: rgb(248, 150, 3);
  margin-top: -1px;
}

.account-info .van-cell__value {
  border-radius: 15px;
}

// .account-info .van-grid {
//   border-radius: 15px;
//   overflow: hidden;
// }

.account-info .grid-item-value {
  font-size: 22px;
  font-weight: 700;
}
</style>
