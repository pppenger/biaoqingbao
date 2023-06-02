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
      swiperDotIndex: 0
    };
  },
  methods: {
    clickBannerItem(e) {
      this.swiperDotIndex = e;
    },
    goNativeindex(id) {
      common_vendor.index.navigateToMiniProgram({
        appId: id,
        // 此为 开源字节 appid
        path: "pages/tabBar/home/home",
        // 此为开源字节首页路径
        envVersion: "release",
        success: (res) => {
          console.log("打开成功", res);
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_swiper_dot2 + _easycom_uni_list_chat2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_swiper_dot = () => "../../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_list_chat = () => "../../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_list_chat + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
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
    f: common_vendor.o(($event) => $options.goNativeindex("wxaa8393c4a5299fc8")),
    g: common_vendor.p({
      ["avatar-circle"]: true,
      title: "丸子妹表情包",
      avatar: "/static/wanzimei.jpeg",
      note: "点击打开丸子妹表情包小程序哦~",
      clickable: true
    }),
    h: common_vendor.p({
      border: true
    }),
    i: common_vendor.o(($event) => $options.goNativeindex("wx168440ed2b78d279")),
    j: common_vendor.p({
      ["avatar-circle"]: true,
      title: "黄夏温的表情包",
      avatar: "/static/huangxiawen.jpeg",
      note: "点击打开黄夏温表情包小程序哦~",
      clickable: true
    }),
    k: common_vendor.p({
      border: true
    }),
    l: common_vendor.p({
      title: "更多表情包推荐",
      titleColor: "#fd6608"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pppenger/Documents/HBuilderProjects/test3/pages/tabBar/other/other.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
