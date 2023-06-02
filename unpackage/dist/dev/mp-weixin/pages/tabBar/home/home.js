"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "瑶一瑶小可爱的表情包",
      path: "pages/tabBar/home/home"
    };
  },
  data() {
    return {
      //标记
      currentSort: 1,
      recordSort: 1,
      // 分页
      currentPage: 1,
      totalPageNum: 50,
      pageSize: 12,
      //banner
      banner_info: [{
        url: "https://mmbiz.qpic.cn/mmbiz_png/NiaDlMDtNVMFaABHQ9n9F0FISFrJF1bcIrS3S5FQ2cHYjqmJBWia18r0o82iccp1tk3vnTjMb7OvjxOhLfX6K2vicA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1"
      }],
      modeIndex: -1,
      styleIndex: -1,
      current: 0,
      mode: "default",
      dotsStyles: {},
      swiperDotIndex: 0,
      //悬浮按钮
      title: "uni-fab",
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#7A7E83",
        buttonColor: "#fff",
        iconColor: "#7A7E83"
      },
      content: [
        {
          iconPath: "/static/pin.png",
          selectedIconPath: "/static/pin.png",
          text: "标记页面",
          active: false
        },
        {
          iconPath: "/static/skip.png",
          selectedIconPath: "/static/skip.png",
          text: "前往标记",
          active: false
        },
        {
          iconPath: "/static/arrow-left-circle.png",
          selectedIconPath: "/static/arrow-left-circle.png",
          text: "首页",
          active: false
        }
      ],
      //动态列表
      dynamicList: [],
      list: [
        {
          url: "/static/c1.png",
          text: "Grid 1",
          badge: "1",
          type: "download"
        },
        {
          url: "/static/c2.png",
          text: "Grid 2",
          badge: "1",
          type: "download"
        },
        {
          url: "/static/c3.png",
          text: "Grid 3",
          badge: "99",
          type: "download"
        },
        {
          url: "/static/c4.png",
          text: "Grid 4",
          badge: "2",
          type: "download"
        },
        {
          url: "/static/c5.png",
          text: "Grid 5"
        },
        {
          url: "/static/c6.png",
          text: "Grid 6"
        },
        {
          url: "/static/c7.png",
          text: "Grid 7"
        },
        {
          url: "/static/c8.png",
          text: "Grid 8"
        },
        {
          url: "/static/c9.png",
          text: "Grid 9"
        }
      ],
      sectionTip: "全部表情（不定期更新）"
    };
  },
  onLoad() {
    let that = this;
    const db = common_vendor.Ds.database();
    db.collection("update_record").where("k_type==1").orderBy("create_time desc").get().then((res) => {
      console.log(res);
      if (res.result.data.length > 0) {
        this.sectionTip = res.result.data[0].show_time;
      }
    }).catch((e) => {
      console.log(e);
    });
    db.collection("kids_emoticon").where("k_type==1").skip(0).limit(this.pageSize).orderBy("create_time desc").get().then((res) => {
      console.log(res);
      if (res.result.data.length == 0) {
        this.totalPageNum = 1;
      } else {
        if (res.result.data.length < this.pageSize) {
          this.totalPageNum = 1;
        }
        console.log(res);
        this.dynamicList = [];
        res.result.data.forEach((item, index) => {
          this.dynamicList.push({
            url: item.e_url
          });
        });
      }
    }).catch((e) => {
      console.log(e);
    });
    db.collection("kids_emoticon").where("k_type==1").count().then((res) => {
      console.log(res);
      this.totalPageNum = res.result.total;
    }).catch((e) => {
      console.log(e);
    });
    common_vendor.index.getStorage({
      key: "current_sort_key",
      success: function(res) {
        console.log("current_sort_key:", res.data);
        that.currentSort = res.data;
      }
    });
  },
  methods: {
    shareImg(u) {
      console.log(u);
      common_vendor.index.showLoading({
        title: "下载中..."
      });
      common_vendor.wx$1.downloadFile({
        url: u,
        success: (res) => {
          common_vendor.index.hideLoading();
          common_vendor.wx$1.showShareImageMenu({
            path: res.tempFilePath
          });
        },
        fail: (err) => {
          console.log("downloadFile fail, err is:", err);
        }
      });
    },
    downImg() {
      console.log("弹窗");
    },
    //弹窗
    toggle() {
      console.log("弹窗");
      this.$refs.popup[0].open("bottom");
    },
    jumpPage: function(currentPage) {
      console.log("===========jumpPage==============");
      let skipNum = this.pageSize * (this.currentPage - 1);
      const db = common_vendor.Ds.database();
      db.collection("kids_emoticon").where("k_type==1").skip(skipNum).limit(this.pageSize).orderBy("create_time desc").get().then((res) => {
        console.log(res);
        if (res.result.data.length == 0) {
          this.totalPageNum = this.pageSize * (this.currentPage - 1);
        } else {
          if (res.result.data.length < this.pageSize) {
            this.totalPageNum = this.pageSize * this.currentPage;
          }
          console.log(res);
          this.dynamicList = [];
          res.result.data.forEach((item, index) => {
            this.dynamicList.push({
              url: item.e_url
            });
          });
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    changePage(e) {
      console.log(e);
      this.currentPage = e.current;
      this.jumpPage(e.current);
    },
    changeBanner(e) {
      this.current = e.detail.current;
    },
    clickBannerItem(e) {
      this.swiperDotIndex = e;
    },
    trigger(e) {
      console.log(e);
      this.content[e.index].active = !e.item.active;
      let content = "确定前往首页吗？";
      if (e.item.text == "标记页面") {
        content = "确定标记当前页面吗？";
      } else if (e.item.text == "前往标记") {
        content = "确定前往上次标记的页面吗？";
      }
      let that = this;
      common_vendor.index.showModal({
        title: "提示",
        content,
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            if (e.item.text == "标记页面") {
              that.currentSort = that.currentPage;
              common_vendor.index.setStorage({
                key: "current_sort_key",
                data: that.currentSort,
                success: function() {
                  console.log("setStorage success");
                }
              });
              console.log(that.currentSort);
            } else if (e.item.text == "前往标记") {
              that.currentPage = that.currentSort;
              that.jumpPage(that.currentSort);
            } else if (e.item.text == "首页") {
              that.currentPage = 1;
              that.jumpPage(1);
            }
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //点击九宫格
    change_grid(e) {
      console.log(e);
      let {
        index
      } = e.detail;
      common_vendor.index.showToast({
        title: `点击第${index + 1}个宫格`,
        icon: "none"
      });
      let pic = this.dynamicList[index];
      console.log(pic);
    },
    add() {
      if (this.dynamicList.length < 20) {
        this.dynamicList.push({
          url: `/static/c${1}.png`,
          text: `Grid ${this.dynamicList.length + 1}`,
          color: this.dynamicList.length % 2 === 0 ? "#f5f5f5" : "#fff"
        });
      } else {
        common_vendor.index.showToast({
          title: "最多添加9个",
          icon: "none"
        });
      }
    },
    del() {
      this.dynamicList.splice(this.dynamicList.length - 1, 1);
    },
    clickReqBut() {
      common_vendor.index.request({
        url: "https://service.zhichenghn.cn/api/v1/wallpaper/list",
        //仅为示例，并非真实接口地址。
        data: {
          cv: "JXLB2.1.0_Android_WECHAT_JXLB",
          openid: "oYUic4mLEujYRKRzIUnhwaKZ734o",
          uid: "12920072"
        },
        success: (res) => {
          let data = res.data.data.list;
          data.forEach((item, index) => {
            this.dynamicList.push({
              url: item,
              text: `Grid ${this.dynamicList.length + 1}`,
              color: this.dynamicList.length % 2 === 0 ? "#f5f5f5" : "#fff"
            });
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_swiper_dot2 + _easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_pagination2 + _easycom_uni_section2)();
}
const _easycom_uni_swiper_dot = () => "../../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_pagination + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.banner_info, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    }),
    b: common_vendor.o((...args) => $options.changeBanner && $options.changeBanner(...args)),
    c: $data.swiperDotIndex,
    d: common_vendor.o($options.clickBannerItem),
    e: common_vendor.p({
      current: $data.current,
      mode: $data.mode
    }),
    f: common_vendor.sr("fab", "542a2674-1"),
    g: common_vendor.o($options.trigger),
    h: common_vendor.p({
      horizontal: "right",
      vertical: "top",
      direction: "vertical",
      pattern: $data.pattern,
      content: $data.content
    }),
    i: common_vendor.f($data.dynamicList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.o(($event) => $options.shareImg(item.url), index),
        c: "542a2674-5-" + i0 + "," + ("542a2674-4-" + i0),
        d: index,
        e: "542a2674-4-" + i0 + ",542a2674-3",
        f: common_vendor.p({
          index
        })
      };
    }),
    j: common_vendor.p({
      type: "download-filled",
      size: "20",
      color: "#feb817"
    }),
    k: common_vendor.p({
      column: 3,
      ["show-border"]: false,
      square: false
    }),
    l: common_vendor.o($options.changePage),
    m: common_vendor.p({
      total: $data.totalPageNum,
      pageSize: $data.pageSize,
      current: $data.currentPage,
      title: "分页"
    }),
    n: common_vendor.p({
      title: $data.sectionTip,
      titleColor: "#fd6608",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pppenger/Documents/HBuilderProjects/test3/pages/tabBar/home/home.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
