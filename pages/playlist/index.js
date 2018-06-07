// pages/songListDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playInfo: {},  // 播放信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },
  /**
   * 获取歌单详情
   */
  getDetail: function (id) {
    wx.request({
      url: 'http://172.16.110.32:3000/playlist/detail',
      data: {
        id
      },
      success: (res) => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.setData({
            playInfo: res.data.playlist
          })
        }
      }
    })
  },

  /**
   * 跳转评论页
   */
  gotoComment: function (event) {
    const { playInfo } = this.data;
    // wx.setStorage({  // 把当前表单详情信息存到缓存里， 在评论页获取使用
    //   key: 'songlistDetail',
    //   data: {
    //     id: playInfo.id,
    //     coverImgUrl: playInfo.coverImgUrl,
    //     name: playInfo.name,
    //     nickname: playInfo.creator.nickname,
    //     userId: playInfo.creator.userId,
    //   },
    // });
    wx.setStorageSync('songlistDetail', {
      id: playInfo.id,
      coverImgUrl: playInfo.coverImgUrl,
      name: playInfo.name,
      nickname: playInfo.creator.nickname,
      userId: playInfo.creator.userId,
    });

    wx.navigateTo({
      url: `/pages/comments/index?id=${playInfo.id}`,
    })
  },

  playSong: function (event) {
    const index = parseInt(event.currentTarget.id);
    wx.setStorage({
      key: 'play-list',
      data: this.data.playInfo.tracks,
    });
    wx.setStorage({
      key: 'player-setting',
      data: {
        index
      },
    });
    wx.navigateTo({
      url: '/pages/song/index',
    })
  }
})