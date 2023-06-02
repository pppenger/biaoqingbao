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
        iconColor: "#fff"
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
      listItems: ["开心", "伤心", "生气", "其他"],
      currentItem: 0,
      currentEType: 1,
      // dynamicList0: ['https://mmbiz.qpic.cn/mmbiz_gif/NiaDlMDtNVMHYbPvdVHrn5LFIjnPS3a6BticV3icHz6FoL6ic5ShS0LTQDzhodH3vAmVbJd8CH9icu14VTUjJcgpibUA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1','https://mmbiz.qpic.cn/mmbiz_gif/NiaDlMDtNVMHYbPvdVHrn5LFIjnPS3a6BticV3icHz6FoL6ic5ShS0LTQDzhodH3vAmVbJd8CH9icu14VTUjJcgpibUA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1','https://mmbiz.qpic.cn/mmbiz_gif/NiaDlMDtNVMHYbPvdVHrn5LFIjnPS3a6BticV3icHz6FoL6ic5ShS0LTQDzhodH3vAmVbJd8CH9icu14VTUjJcgpibUA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1','https://mmbiz.qpic.cn/mmbiz_gif/NiaDlMDtNVMHYbPvdVHrn5LFIjnPS3a6BticV3icHz6FoL6ic5ShS0LTQDzhodH3vAmVbJd8CH9icu14VTUjJcgpibUA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1','https://mmbiz.qpic.cn/mmbiz_gif/NiaDlMDtNVMHYbPvdVHrn5LFIjnPS3a6BticV3icHz6FoL6ic5ShS0LTQDzhodH3vAmVbJd8CH9icu14VTUjJcgpibUA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1'],
      dynamicList0: [],
      dynamicList1: [],
      dynamicList2: [],
      dynamicList3: [],
      pageSize: 12,
      currentPage0: 1,
      totalPageNum0: 50,
      currentPage1: 1,
      totalPageNum1: 50,
      currentPage2: 1,
      totalPageNum2: 50,
      currentPage3: 1,
      totalPageNum3: 50,
      //标记
      currentSort0: 1,
      currentSort1: 1,
      currentSort2: 1,
      currentSort3: 1
    };
  },
  onLoad() {
    let that = this;
    that.currentItem = 0;
    this.loadThisListAllBQB();
  },
  methods: {
    clickBannerItem(e) {
      this.swiperDotIndex = e;
    },
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
    //根据列表下标获取表情类型
    getETypeByListNum: function(listNum) {
      if (listNum == 0) {
        this.currentEType = 1;
      } else if (listNum == 1) {
        this.currentEType = 2;
      } else if (listNum == 2) {
        this.currentEType = 3;
      } else if (listNum == 3) {
        this.currentEType = 4;
      }
    },
    //根据列表获取本地缓存，拿到跳转到哪一页
    getCurrentSortCacheByListNum: function(that, listNum) {
      let currentSortKey = "";
      if (listNum == 0) {
        currentSortKey = "current_sort_key_0";
      } else if (listNum == 1) {
        currentSortKey = "current_sort_key_1";
      } else if (listNum == 2) {
        currentSortKey = "current_sort_key_2";
      } else if (listNum == 3) {
        currentSortKey = "current_sort_key_3";
      }
      common_vendor.index.getStorage({
        key: currentSortKey,
        success: function(res) {
          console.log("currentSortKey:", res.data);
          if (listNum == 0) {
            that.currentSort0 = res.data;
          } else if (listNum == 1) {
            that.currentSort1 = res.data;
          } else if (listNum == 2) {
            that.currentSort2 = res.data;
          } else if (listNum == 3) {
            that.currentSort3 = res.data;
          }
        }
      });
    },
    //加载当前列表的总表情数量
    loadThisListTotalPageNum: function(listNum) {
      this.getETypeByListNum(listNum);
      this.getCurrentSortCacheByListNum(this, listNum);
      const db = common_vendor.Ds.database();
      db.collection("kids_emoticon").where("k_type==1").where("e_type==" + this.currentEType).count().then((res) => {
        console.log("当前表情包类型总数量");
        console.log(res.result.total);
        if (listNum == 0) {
          this.totalPageNum0 = res.result.total;
        } else if (listNum == 1) {
          this.totalPageNum1 = res.result.total;
        } else if (listNum == 2) {
          this.totalPageNum2 = res.result.total;
        } else if (listNum == 3) {
          this.totalPageNum3 = res.result.total;
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    changeFabStyle: function(listNum) {
      if (listNum == 0) {
        this.pattern.buttonColor = "#fbff65";
        this.pattern.iconColor = "#9ea3ab";
      } else if (listNum == 1) {
        this.pattern.buttonColor = "#5c6bff";
        this.pattern.iconColor = "#fff";
      } else if (listNum == 2) {
        this.pattern.buttonColor = "#fd636c";
        this.pattern.iconColor = "#fff";
      } else if (listNum == 3) {
        this.pattern.buttonColor = "#fd80f4";
        this.pattern.iconColor = "#fff";
      }
    },
    //跳到某哥指定列表的某一页，需要先指定列表，传页数过来
    jumpPage: function() {
      console.log("===========jumpPage==============");
      let pageSize = this.pageSize;
      let currentPage = this.currentPage0;
      this.getETypeByListNum(this.currentItem);
      if (this.currentItem == 1) {
        currentPage = this.currentPage1;
      } else if (this.currentItem == 2) {
        currentPage = this.currentPage2;
      } else if (this.currentItem == 3) {
        currentPage = this.currentPage3;
      }
      let skipNum = pageSize * (currentPage - 1);
      const db = common_vendor.Ds.database();
      db.collection("kids_emoticon").where("k_type==1").where("e_type==" + this.currentEType).skip(skipNum).limit(pageSize).orderBy("create_time desc").get().then((res) => {
        console.log(res);
        let totalPageNum = 0;
        let dynamicList = [];
        if (res.result.data.length == 0) {
          totalPageNum = pageSize * (currentPage - 1);
        } else {
          if (res.result.data.length < pageSize) {
            totalPageNum = pageSize * currentPage;
          }
          console.log(res);
          dynamicList = [];
          res.result.data.forEach((item, index) => {
            dynamicList.push({
              url: item.e_url
            });
          });
        }
        if (this.currentItem == 0) {
          if (totalPageNum > 0) {
            this.totalPageNum0 = totalPageNum;
          }
          this.dynamicList0 = dynamicList;
        } else if (this.currentItem == 1) {
          if (totalPageNum > 0) {
            this.totalPageNum1 = totalPageNum;
          }
          this.dynamicList1 = dynamicList;
        } else if (this.currentItem == 2) {
          if (totalPageNum > 0) {
            this.totalPageNum2 = totalPageNum;
          }
          this.dynamicList2 = dynamicList;
        } else if (this.currentItem == 3) {
          if (totalPageNum > 0) {
            this.totalPageNum3 = totalPageNum;
          }
          this.dynamicList3 = dynamicList;
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    //初始化本业表情
    loadThisListAllBQB: function() {
      let load = false;
      if (this.currentItem == 0 && this.dynamicList0.length == 0) {
        this.currentPage0 = 1;
        load = true;
      } else if (this.currentItem == 1 && this.dynamicList1.length == 0) {
        this.currentPage1 = 1;
        load = true;
      } else if (this.currentItem == 2 && this.dynamicList2.length == 0) {
        this.currentPage2 = 1;
        load = true;
      } else if (this.currentItem == 3 && this.dynamicList3.length == 0) {
        this.currentPage3 = 1;
        load = true;
      }
      if (load) {
        this.getETypeByListNum(this.currentItem);
        this.jumpPage();
        this.loadThisListTotalPageNum(this.currentItem);
        this.changeFabStyle(this.currentItem);
      }
    },
    //切换表情类型
    onClickItem(e) {
      if (this.currentItem !== e.currentIndex) {
        this.currentItem = e.currentIndex;
      }
      this.changeFabStyle(this.currentItem);
      this.loadThisListAllBQB();
    },
    //换页
    changePage(e) {
      console.log(e);
      if (this.currentItem == 0) {
        this.currentPage0 = e.current;
      } else if (this.currentItem == 1) {
        this.currentPage1 = e.current;
      } else if (this.currentItem == 2) {
        this.currentPage2 = e.current;
      } else if (this.currentItem == 3) {
        this.currentPage3 = e.current;
      }
      this.jumpPage();
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
              let key = that.getCurrentSortCacheByListNum(that, that.currentItem);
              let currentSort = 0;
              if (that.currentItem == 0) {
                that.currentSort0 = that.currentPage0;
                currentSort = that.currentPage0;
              } else if (that.currentItem == 1) {
                that.currentSort1 = that.currentPage1;
                currentSort = that.currentPage1;
              } else if (that.currentItem == 2) {
                that.currentSort2 = that.currentPage2;
                currentSort = that.currentPage2;
              } else if (that.currentItem == 3) {
                that.currentSort3 = that.currentPage3;
                currentSort = that.currentPage3;
              }
              common_vendor.index.setStorage({
                key,
                data: currentSort,
                success: function() {
                  console.log("setStorage success");
                }
              });
              console.log("缓存当前页" + currentSort);
            } else if (e.item.text == "前往标记") {
              if (that.currentItem == 0) {
                that.currentPage0 = that.currentSort0;
              } else if (that.currentItem == 1) {
                that.currentPage1 = that.currentSort1;
              } else if (that.currentItem == 2) {
                that.currentPage2 = that.currentSort2;
              } else if (that.currentItem == 3) {
                that.currentPage3 = that.currentSort3;
              }
              that.jumpPage();
            } else if (e.item.text == "首页") {
              if (that.currentItem == 0) {
                that.currentPage0 = 1;
              } else if (that.currentItem == 1) {
                that.currentPage1 = 1;
              } else if (that.currentItem == 2) {
                that.currentPage2 = 1;
              } else if (that.currentItem == 3) {
                that.currentPage3 = 1;
              }
              that.jumpPage();
            }
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_swiper_dot2 + _easycom_uni_fab2 + _easycom_uni_segmented_control2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_pagination2)();
}
const _easycom_uni_swiper_dot = () => "../../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_fab + _easycom_uni_segmented_control + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_pagination)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.banner_info, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    }),
    b: common_vendor.o((...args) => _ctx.changeBanner && _ctx.changeBanner(...args)),
    c: $data.swiperDotIndex,
    d: common_vendor.o($options.clickBannerItem),
    e: common_vendor.p({
      current: $data.current,
      mode: $data.mode
    }),
    f: common_vendor.sr("fab", "ff7d0134-1"),
    g: common_vendor.o($options.trigger),
    h: common_vendor.p({
      horizontal: "right",
      vertical: "top",
      direction: "vertical",
      pattern: $data.pattern,
      content: $data.content
    }),
    i: common_vendor.o($options.onClickItem),
    j: common_vendor.p({
      current: $data.currentItem,
      values: $data.listItems,
      ["style-type"]: "text",
      ["active-color"]: "#feb817"
    }),
    k: $data.currentItem === 0
  }, $data.currentItem === 0 ? {
    l: common_vendor.f($data.dynamicList0, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.o(($event) => $options.shareImg(item.url), index),
        c: "ff7d0134-5-" + i0 + "," + ("ff7d0134-4-" + i0),
        d: index,
        e: "ff7d0134-4-" + i0 + ",ff7d0134-3",
        f: common_vendor.p({
          index
        })
      };
    }),
    m: common_vendor.p({
      type: "download-filled",
      size: "20",
      color: "#feb817"
    }),
    n: common_vendor.p({
      column: 3,
      ["show-border"]: false,
      square: false
    }),
    o: common_vendor.o($options.changePage),
    p: common_vendor.p({
      total: $data.totalPageNum0,
      pageSize: $data.pageSize,
      current: $data.currentPage0,
      title: "分页"
    })
  } : {}, {
    q: $data.currentItem === 1
  }, $data.currentItem === 1 ? {
    r: common_vendor.f($data.dynamicList1, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.o(($event) => $options.shareImg(item.url), index),
        c: "ff7d0134-9-" + i0 + "," + ("ff7d0134-8-" + i0),
        d: index,
        e: "ff7d0134-8-" + i0 + ",ff7d0134-7",
        f: common_vendor.p({
          index
        })
      };
    }),
    s: common_vendor.p({
      type: "download-filled",
      size: "20",
      color: "#feb817"
    }),
    t: common_vendor.p({
      column: 3,
      ["show-border"]: false,
      square: false
    }),
    v: common_vendor.o($options.changePage),
    w: common_vendor.p({
      total: $data.totalPageNum1,
      pageSize: $data.pageSize,
      current: $data.currentPage1,
      title: "分页"
    })
  } : {}, {
    x: $data.currentItem === 2
  }, $data.currentItem === 2 ? {
    y: common_vendor.f($data.dynamicList2, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.o(($event) => $options.shareImg(item.url), index),
        c: "ff7d0134-13-" + i0 + "," + ("ff7d0134-12-" + i0),
        d: index,
        e: "ff7d0134-12-" + i0 + ",ff7d0134-11",
        f: common_vendor.p({
          index
        })
      };
    }),
    z: common_vendor.p({
      type: "download-filled",
      size: "20",
      color: "#feb817"
    }),
    A: common_vendor.p({
      column: 3,
      ["show-border"]: false,
      square: false
    }),
    B: common_vendor.o($options.changePage),
    C: common_vendor.p({
      total: $data.totalPageNum2,
      pageSize: $data.pageSize,
      current: $data.currentPage2,
      title: "分页"
    })
  } : {}, {
    D: $data.currentItem === 3
  }, $data.currentItem === 3 ? {
    E: common_vendor.f($data.dynamicList3, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.o(($event) => $options.shareImg(item.url), index),
        c: "ff7d0134-17-" + i0 + "," + ("ff7d0134-16-" + i0),
        d: index,
        e: "ff7d0134-16-" + i0 + ",ff7d0134-15",
        f: common_vendor.p({
          index
        })
      };
    }),
    F: common_vendor.p({
      type: "download-filled",
      size: "20",
      color: "#feb817"
    }),
    G: common_vendor.p({
      column: 3,
      ["show-border"]: false,
      square: false
    }),
    H: common_vendor.o($options.changePage),
    I: common_vendor.p({
      total: $data.totalPageNum3,
      pageSize: $data.pageSize,
      current: $data.currentPage3,
      title: "分页"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pppenger/Documents/HBuilderProjects/test3/pages/tabBar/classify/classify.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
