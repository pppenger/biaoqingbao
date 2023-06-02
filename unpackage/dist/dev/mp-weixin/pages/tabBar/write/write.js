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
      pageSize: 5,
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
        buttonColor: "#356dff",
        iconColor: "#ecf4ff"
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
      sectionTip: "您可以在这里分享你的想法或心事，按最新排序~\n每条消息会经过管理员的审核后才能呈现\n一旦发现违法违规/诱导消息等直接删除不予通知\n请注意保护个人隐私，谨防受骗\n",
      dynamicList: [],
      // {
      // 	title: '标题标题标题标题标题标题标题标题标题ss',
      // 	desc: '地址标题标题标题标题标题标题标题标题标题标题',
      // 	info: '这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。是一个ascac带头像和双标题的基础卡片，此示例展示了一个完整的卡片。是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。的ssdd',
      // }
      rules: {
        title: {
          rules: [{
            required: true,
            errorMessage: "标题不能为空"
          }, {
            validateFunction: (rule, value, data, callback) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value.replace(/[^\x00-\xff]/g, "01").length <= 32) {
                    resolve();
                  } else {
                    reject(new Error("字数必须小于16,2英文=1中文"));
                  }
                }, 200);
              });
            }
          }]
        },
        desc: {
          rules: [{
            validateFunction: (rule, value, data, callback) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value.replace(/[^\x00-\xff]/g, "01").length <= 40) {
                    resolve();
                  } else {
                    reject(new Error("字数必须小于20,2英文=1中文"));
                  }
                }, 200);
              });
            }
          }]
        },
        info: {
          rules: [{
            required: true,
            errorMessage: "内容不能为空"
          }, {
            validateFunction: (rule, value, data, callback) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value.replace(/[^\x00-\xff]/g, "01").length <= 1e3) {
                    resolve();
                  } else {
                    reject(new Error("字数必须小于500,2英文=1中文"));
                  }
                }, 200);
              });
            }
          }]
        }
      },
      valiFormData: {
        title: "",
        desc: "",
        info: ""
      }
    };
  },
  onLoad() {
    let that = this;
    const db = common_vendor.Ds.database();
    db.collection("update_record").where("k_type==-1").orderBy("create_time desc").get().then((res) => {
      if (res.result.data.length > 0) {
        this.sectionTip = res.result.data[0].show_time;
      }
    }).catch((e) => {
      console.log(e);
    });
    db.collection("write").where("status=='1'").skip(0).limit(this.pageSize).orderBy("create_time desc").get().then((res) => {
      if (res.result.data.length == 0) {
        this.totalPageNum = 1;
      } else {
        if (res.result.data.length < this.pageSize) {
          this.totalPageNum = 1;
        }
        this.dynamicList = [];
        res.result.data.forEach((item, index) => {
          this.dynamicList.push({
            title: item.title,
            desc: item.desc,
            info: item.info,
            extra: item.extra
          });
        });
      }
    }).catch((e) => {
      console.log(e);
    });
    db.collection("write").where("status=='1'").count().then((res) => {
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
    changePage(e) {
      console.log(e);
      this.currentPage = e.current;
      this.jumpPage(e.current);
    },
    jumpPage: function(currentPage) {
      console.log("===========jumpPage==============");
      let skipNum = this.pageSize * (this.currentPage - 1);
      const db = common_vendor.Ds.database();
      db.collection("write").where("status=='1'").skip(skipNum).limit(this.pageSize).orderBy("create_time desc").get().then((res) => {
        if (res.result.data.length == 0) {
          this.totalPageNum = this.pageSize * (this.currentPage - 1);
        } else {
          if (res.result.data.length < this.pageSize) {
            this.totalPageNum = this.pageSize * this.currentPage;
          }
          this.dynamicList = [];
          res.result.data.forEach((item, index) => {
            this.dynamicList.push({
              title: item.title,
              desc: item.desc,
              info: item.info,
              extra: item.extra
            });
          });
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    inputDialogToggle() {
      this.$refs.inputDialog.open();
    },
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        console.log("表单提交内容:", res);
        const db = common_vendor.Ds.database();
        var date = /* @__PURE__ */ new Date();
        var year = date.getFullYear() - 2e3;
        let month = date.getMonth() + 1;
        let strDate = year + "-" + month + "-" + date.getDate();
        let timeUnix = parseInt((/* @__PURE__ */ new Date()).getTime() / 1e3) + "";
        console.log(timeUnix);
        db.collection("write").add({
          title: res.title,
          desc: res.desc,
          info: res.info,
          // create_time: timeUnix,
          status: "0",
          extra: strDate
        }).then((res2) => {
          common_vendor.index.showToast({
            title: "提交成功"
          });
          this.valiFormData.title = "";
          this.valiFormData.desc = "";
          this.valiFormData.info = "";
          this.$refs.inputDialog.close();
        }).catch((err) => {
          common_vendor.index.showModal({
            content: err.message || "系统异常，等待修复",
            showCancel: false
          });
        });
      }).catch((err) => {
        console.log("err", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_swiper_dot2 + _easycom_uni_fab2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup2 + _easycom_uni_card2 + _easycom_uni_pagination2 + _easycom_uni_section2)();
}
const _easycom_uni_swiper_dot = () => "../../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_fab + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup + _easycom_uni_card + _easycom_uni_pagination + _easycom_uni_section)();
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
    d: common_vendor.p({
      current: $data.current,
      mode: $data.mode
    }),
    e: common_vendor.sr("fab", "bdc502b4-1"),
    f: common_vendor.o($options.trigger),
    g: common_vendor.p({
      horizontal: "right",
      vertical: "top",
      direction: "vertical",
      pattern: $data.pattern,
      content: $data.content
    }),
    h: common_vendor.o((...args) => $options.inputDialogToggle && $options.inputDialogToggle(...args)),
    i: common_vendor.o(($event) => $data.valiFormData.title = $event),
    j: common_vendor.p({
      maxlength: "51",
      placeholder: "不超过16个字",
      modelValue: $data.valiFormData.title
    }),
    k: common_vendor.p({
      label: "标题",
      required: true,
      name: "title"
    }),
    l: common_vendor.o(($event) => $data.valiFormData.desc = $event),
    m: common_vendor.p({
      maxlength: "50",
      placeholder: "不超过20个字",
      modelValue: $data.valiFormData.desc
    }),
    n: common_vendor.p({
      label: "简介/个签",
      name: "desc"
    }),
    o: common_vendor.o(($event) => $data.valiFormData.info = $event),
    p: common_vendor.p({
      type: "textarea",
      maxlength: "800",
      placeholder: "不超过500个字;请勿输入不良内容,注重保护个人隐私,未经管理员审核通过的直接删除不予发布,最终解释权归作者所有",
      modelValue: $data.valiFormData.info
    }),
    q: common_vendor.p({
      label: "内容",
      required: true,
      name: "info"
    }),
    r: common_vendor.sr("valiForm", "bdc502b4-4,bdc502b4-3"),
    s: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.valiFormData,
      ["label-position"]: "top"
    }),
    t: common_vendor.o(($event) => $options.submit("valiForm")),
    v: common_vendor.sr("inputDialog", "bdc502b4-3,bdc502b4-2"),
    w: common_vendor.p({
      type: "dialog"
    }),
    x: common_vendor.f($data.dynamicList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.info),
        b: "bdc502b4-11-" + i0 + ",bdc502b4-2",
        c: common_vendor.p({
          title: item.title,
          ["sub-title"]: item.desc,
          extra: item.extra
        }),
        d: index,
        e: index
      };
    }),
    y: common_vendor.o($options.changePage),
    z: common_vendor.p({
      total: $data.totalPageNum,
      pageSize: $data.pageSize,
      current: $data.currentPage,
      title: "分页"
    }),
    A: common_vendor.p({
      title: $data.sectionTip,
      titleColor: "#fd6608"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pppenger/Documents/HBuilderProjects/test3/pages/tabBar/write/write.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
