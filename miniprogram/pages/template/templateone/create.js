const app = getApp();
const util = require('../../../Utils/Util.js');
const fs = wx.getFileSystemManager()
Page({
  data: {
    AnimateArray: [
      app.globalData.AnimateList,
      app.globalData.AnimateSpeed,
      app.globalData.AnimateDelay,
      app.globalData.AnimateInfinite
    ],
    ColorList: app.globalData.ColorList,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    title: '',
    titleColor: 'white',
    titleIndex: '14',
    subTitle: '',
    subTitleColor: 'white',
    subTitleIndex: '14',
    content: '',
    contentColor: 'white',
    contentIndex: '14',
    buttonName: '提交',
    buttonColor: 'white',
    buttonIndex: '14',
    pageIndex: '0',
    pageArray: [{
      name: '选择页面',
      type: '99'
    },
    {
      name: '通用',
      type: '1'
    },
    {
      name: '地点',
      type: '2'
    },
    {
      name: '联系方式',
      type: '3'
    },
    ],
    titleMultiIndex: [22, 3, 0, 0],
    titleAnimate: 'animated fadeInDown slower',
    subTitleMultiIndex: [22, 3, 0, 0],
    subTitleAnimate: 'animated fadeInDown slower',
    contentMultiIndex: [22, 3, 0, 0],
    contentAnimate: 'animated fadeInDown slower',
    buttonMultiIndex: [22, 3, 0, 0],
    buttonAnimate: 'animated fadeInDown slower',
    date: '2018-12-25',
    time: '12:01',
    selectMapLocation: {
      name: '地图选择'
    },
    files: '',
    pageData: {

    }
  },

  /** 页面类型选择 */
  PagePickerChange(e) {
    console.log(e);
    this.setData({
      pageIndex: e.detail.value
    })
  },
  /** 标题颜色选择 */
  TitleColorPickerChange(e) {
    let ColorList = this.data.ColorList
    let colorIndex = e.detail.value
    this.setData({
      titleIndex: colorIndex,
      titleColor: ColorList[colorIndex].name
    })
  },
  SetTitleValue(e) {
    console.log(e)
    this.setData({
      title: e.detail.value
    })
  },
  /** 子标题颜色选择 */
  SubTitleColorPickerChange(e) {
    let ColorList = this.data.ColorList
    let colorIndex = e.detail.value
    this.setData({
      subTitleIndex: colorIndex,
      subTitleColor: ColorList[colorIndex].name
    })
  },
  SetSubTitleValue(e) {
    console.log(e)
    this.setData({
      subTitle: e.detail.value
    })
  },
  /** 文案颜色选择 */
  ContentColorPickerChange(e) {
    let ColorList = this.data.ColorList
    let colorIndex = e.detail.value
    this.setData({
      contentIndex: e.detail.value,
      contentColor: ColorList[colorIndex].name
    })
  },
  SetContentValue(e) {
    this.setData({
      content: e.detail.value
    })
  },

  /** 按钮颜色选择 */
  ButtonColorPickerChange(e) {
    let ColorList = this.data.ColorList
    let colorIndex = e.detail.value
    this.setData({
      buttonIndex: e.detail.value,
      buttonColor: ColorList[colorIndex].name
    })
  },
  SetButtonNameValue(e) {
    this.setData({
      buttonName: e.detail.value
    })
  },
  /** 标题动画选择 */
  TitleMultiChange(e) {
    let AnimateArray = this.data.AnimateArray
    let animateArray = e.detail.value
    this.setData({
      titleAnimate: ''
    }, () => {
      this.setData({
        titleMultiIndex: animateArray,
        titleAnimate: 'animated ' + AnimateArray[0][animateArray[0]].code + ' ' + AnimateArray[1][animateArray[1]].code + ' ' + AnimateArray[2][animateArray[2]].code + ' ' + AnimateArray[3][animateArray[3]].code
      })
    })

  },
  /** 子标题动画选择 */
  SubTitleMultiChange(e) {
    let AnimateArray = this.data.AnimateArray
    let animateArray = e.detail.value
    this.setData({
      subTitleAnimate: ''
    }, () => {
      this.setData({
        subTitleMultiIndex: animateArray,
        subTitleAnimate: 'animated ' + AnimateArray[0][animateArray[0]].code + ' ' + AnimateArray[1][animateArray[1]].code + ' ' + AnimateArray[2][animateArray[2]].code + ' ' + AnimateArray[3][animateArray[3]].code
      })
    })

  },
  /** 文案动画选择 */
  ContentMultiChange(e) {
    let AnimateArray = this.data.AnimateArray
    let animateArray = e.detail.value
    this.setData({
      contentAnimate: ''
    }, () => {
      this.setData({
        contentMultiIndex: e.detail.value,
        contentAnimate: 'animated ' + AnimateArray[0][animateArray[0]].code + ' ' + AnimateArray[1][animateArray[1]].code + ' ' + AnimateArray[2][animateArray[2]].code + ' ' + AnimateArray[3][animateArray[3]].code
      })
    })
  },
  /** 按钮动画选择 */
  ButtonMultiChange(e) {
    let AnimateArray = this.data.AnimateArray
    let animateArray = e.detail.value
    this.setData({
      contentAnimate: ''
    }, () => {
      this.setData({
        buttonMultiIndex: e.detail.value,
        buttonAnimate: 'animated ' + AnimateArray[0][animateArray[0]].code + ' ' + AnimateArray[1][animateArray[1]].code + ' ' + AnimateArray[2][animateArray[2]].code + ' ' + AnimateArray[3][animateArray[3]].code
      })
    })
  },

  /** 宴会日期选择器 */
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /** 宴会地点选择 */
  MapSelect(e) {
    console.log(e)
    wx.chooseLocation({
      success: (data) => {
        console.log(data);
        this.setData({
          selectMapLocation: data
        })
      }
    })
  },
  ChooseImage() {
    let d = this.data
    let that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        console.log(res)
        // that.transformBase(res);

        let path = 'user/background-' + util.getTimeStamp() + '.png'
        wx.cloud.uploadFile({
          cloudPath: path,
          filePath: res.tempFilePaths[0],
        }).then(res => {
          console.log(res)
          that.setData({
            files: res.fileID
          })
        })

        // this.setData({
        //   files: res.tempFilePaths[0]
        // })
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      current: this.data.files
    });
  },
  /** 文件上传 最后修改成本地文件 到时候在处理 */
  DelImg(e) {
    wx.showModal({
      title: '背景图片删除',
      content: '确定要删除这张背景🐎？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.setData({
            files: ''
          })
        }
      }
    })
  },
  showCreate(e) {
    let d = this.data
    let pageData = {}

    /** 选择通用页面 */
    if (d.pageIndex === '1') {
      pageData = {
        type: '1',
        backgroundImg_url: d.files,
        title: d.title,
        titleColor: d.titleColor,
        titleAnimate: d.titleAnimate,
        subTitle: d.subTitle,
        subTitleColor: d.subTitleColor,
        subTitleAnimate: d.subTitleAnimate,
        content: d.content,
        contentColor: d.contentColor,
        contentAnimate: d.contentAnimate
      }
    }

    /** 选择地图页面 */
    if (d.pageIndex === '2') {
      pageData = {
        type: '2',
        backgroundImg_url: d.files,
        title: d.title,
        titleColor: d.titleColor,
        titleAnimate: d.titleAnimate,
        subTitle: d.subTitle,
        subTitleColor: d.subTitleColor,
        subTitleAnimate: d.subTitleAnimate,
        date: d.date,
        location: d.selectMapLocation
      }
    }

    /** 选择表格页面 */
    if (d.pageIndex === '3') {
      pageData = {
        type: '3',
        backgroundImg_url: d.files,
        title: d.title,
        titleColor: d.titleColor,
        titleAnimate: d.titleAnimate,
        content: d.content,
        contentColor: d.contentColor,
        contentAnimate: d.contentAnimate,
        buttonName: d.buttonName,
        buttonAnimate: d.buttonAnimate,
        buttonColor: d.buttonColor
      }
    }

    if (d.pageIndex !== '0') {
      wx.navigateTo({
        url: 'templateone?type=1&page=' + JSON.stringify(pageData)
      })
    }

  }
})