//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    /**
      * 页面配置
      */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },

  onLoad: function () {
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 滑动切换tab
   */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
  * 点击分享
  */
  onShareAppMessage: function () {
    return {
      title: '舰百小程序',
      path: '/page/user?id=123'
    }
  },

  navTo: function(e) {
    var page = e.target.dataset.index.toString();
    wx.navigateTo({
      url: '../' + page + '/' + page
    })
  },

  backTo: function (e) {
    var page = e.target.dataset.index.toString();
    wx.navigateTo({
      url: '../' + page + '/' + page
    })
  },

})
