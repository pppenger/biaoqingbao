"use strict";const t=require("../../../common/vendor.js"),e={components:{},onShareAppMessage:t=>("button"===t.from&&console.log(t.target),{title:"瑶一瑶小可爱的表情包",path:"pages/tabBar/home/home"}),data:()=>({currentSort:1,recordSort:1,currentPage:1,totalPageNum:50,pageSize:12,banner_info:[{url:"https://mmbiz.qpic.cn/mmbiz_png/NiaDlMDtNVMFaABHQ9n9F0FISFrJF1bcIrS3S5FQ2cHYjqmJBWia18r0o82iccp1tk3vnTjMb7OvjxOhLfX6K2vicA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1"}],modeIndex:-1,styleIndex:-1,current:0,mode:"default",dotsStyles:{},swiperDotIndex:0,title:"uni-fab",pattern:{color:"#7A7E83",backgroundColor:"#fff",selectedColor:"#7A7E83",buttonColor:"#fff",iconColor:"#7A7E83"},content:[{iconPath:"/static/pin.png",selectedIconPath:"/static/pin.png",text:"标记页面",active:!1},{iconPath:"/static/skip.png",selectedIconPath:"/static/skip.png",text:"前往标记",active:!1},{iconPath:"/static/arrow-left-circle.png",selectedIconPath:"/static/arrow-left-circle.png",text:"首页",active:!1}],dynamicList:[],list:[{url:"/static/c1.png",text:"Grid 1",badge:"1",type:"download"},{url:"/static/c2.png",text:"Grid 2",badge:"1",type:"download"},{url:"/static/c3.png",text:"Grid 3",badge:"99",type:"download"},{url:"/static/c4.png",text:"Grid 4",badge:"2",type:"download"},{url:"/static/c5.png",text:"Grid 5"},{url:"/static/c6.png",text:"Grid 6"},{url:"/static/c7.png",text:"Grid 7"},{url:"/static/c8.png",text:"Grid 8"},{url:"/static/c9.png",text:"Grid 9"}],sectionTip:"全部表情（不定期更新）"}),onLoad(){let e=this;const n=t.Ds.database();n.collection("update_record").where("k_type==1").orderBy("create_time desc").get().then((t=>{console.log(t),t.result.data.length>0&&(this.sectionTip=t.result.data[0].show_time)})).catch((t=>{console.log(t)})),n.collection("kids_emoticon").where("k_type==1").skip(0).limit(this.pageSize).orderBy("create_time desc").get().then((t=>{console.log(t),0==t.result.data.length?this.totalPageNum=1:(t.result.data.length<this.pageSize&&(this.totalPageNum=1),console.log(t),this.dynamicList=[],t.result.data.forEach(((t,e)=>{this.dynamicList.push({url:t.e_url})})))})).catch((t=>{console.log(t)})),n.collection("kids_emoticon").where("k_type==1").count().then((t=>{console.log(t),this.totalPageNum=t.result.total})).catch((t=>{console.log(t)})),t.index.getStorage({key:"current_sort_key",success:function(t){console.log("current_sort_key:",t.data),e.currentSort=t.data}})},methods:{shareImg(e){console.log(e),t.index.showLoading({title:"下载中..."}),t.wx$1.downloadFile({url:e,success:e=>{t.index.hideLoading(),t.wx$1.showShareImageMenu({path:e.tempFilePath})},fail:t=>{console.log("downloadFile fail, err is:",t)}})},downImg(){console.log("弹窗")},toggle(){console.log("弹窗"),this.$refs.popup[0].open("bottom")},jumpPage:function(e){console.log("===========jumpPage==============");let n=this.pageSize*(this.currentPage-1);t.Ds.database().collection("kids_emoticon").where("k_type==1").skip(n).limit(this.pageSize).orderBy("create_time desc").get().then((t=>{console.log(t),0==t.result.data.length?this.totalPageNum=this.pageSize*(this.currentPage-1):(t.result.data.length<this.pageSize&&(this.totalPageNum=this.pageSize*this.currentPage),console.log(t),this.dynamicList=[],t.result.data.forEach(((t,e)=>{this.dynamicList.push({url:t.e_url})})))})).catch((t=>{console.log(t)}))},changePage(t){console.log(t),this.currentPage=t.current,this.jumpPage(t.current)},changeBanner(t){this.current=t.detail.current},clickBannerItem(t){this.swiperDotIndex=t},trigger(e){console.log(e),this.content[e.index].active=!e.item.active;let n="确定前往首页吗？";"标记页面"==e.item.text?n="确定标记当前页面吗？":"前往标记"==e.item.text&&(n="确定前往上次标记的页面吗？");let o=this;t.index.showModal({title:"提示",content:n,success:function(n){n.confirm?(console.log("用户点击确定"),"标记页面"==e.item.text?(o.currentSort=o.currentPage,t.index.setStorage({key:"current_sort_key",data:o.currentSort,success:function(){console.log("setStorage success")}}),console.log(o.currentSort)):"前往标记"==e.item.text?(o.currentPage=o.currentSort,o.jumpPage(o.currentSort)):"首页"==e.item.text&&(o.currentPage=1,o.jumpPage(1))):n.cancel&&console.log("用户点击取消")}})},change_grid(e){console.log(e);let{index:n}=e.detail;t.index.showToast({title:`点击第${n+1}个宫格`,icon:"none"});let o=this.dynamicList[n];console.log(o)},add(){this.dynamicList.length<20?this.dynamicList.push({url:"/static/c1.png",text:`Grid ${this.dynamicList.length+1}`,color:this.dynamicList.length%2==0?"#f5f5f5":"#fff"}):t.index.showToast({title:"最多添加9个",icon:"none"})},del(){this.dynamicList.splice(this.dynamicList.length-1,1)},clickReqBut(){t.index.request({url:"https://service.zhichenghn.cn/api/v1/wallpaper/list",data:{cv:"JXLB2.1.0_Android_WECHAT_JXLB",openid:"oYUic4mLEujYRKRzIUnhwaKZ734o",uid:"12920072"},success:t=>{t.data.data.list.forEach(((t,e)=>{this.dynamicList.push({url:t,text:`Grid ${this.dynamicList.length+1}`,color:this.dynamicList.length%2==0?"#f5f5f5":"#fff"})}))}})}}};if(!Array){(t.resolveComponent("uni-swiper-dot")+t.resolveComponent("uni-fab")+t.resolveComponent("uni-icons")+t.resolveComponent("uni-grid-item")+t.resolveComponent("uni-grid")+t.resolveComponent("uni-pagination")+t.resolveComponent("uni-section"))()}Math||((()=>"../../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js")+(()=>"../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js")+(()=>"../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js")+(()=>"../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js")+(()=>"../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js")+(()=>"../../../uni_modules/uni-section/components/uni-section/uni-section.js"))();const n=t._export_sfc(e,[["render",function(e,n,o,i,c,s){return{a:t.f(c.banner_info,((t,e,n)=>({a:t.url,b:e}))),b:t.o(((...t)=>s.changeBanner&&s.changeBanner(...t))),c:c.swiperDotIndex,d:t.o(s.clickBannerItem),e:t.p({current:c.current,mode:c.mode}),f:t.sr("fab","542a2674-1"),g:t.o(s.trigger),h:t.p({horizontal:"right",vertical:"top",direction:"vertical",pattern:c.pattern,content:c.content}),i:t.f(c.dynamicList,((e,n,o)=>({a:e.url,b:t.o((t=>s.shareImg(e.url)),n),c:"542a2674-5-"+o+",542a2674-4-"+o,d:n,e:"542a2674-4-"+o+",542a2674-3",f:t.p({index:n})}))),j:t.p({type:"download-filled",size:"20",color:"#feb817"}),k:t.p({column:3,"show-border":!1,square:!1}),l:t.o(s.changePage),m:t.p({total:c.totalPageNum,pageSize:c.pageSize,current:c.currentPage,title:"分页"}),n:t.p({title:c.sectionTip,titleColor:"#fd6608",padding:!0})}}]]);e.__runtimeHooks=2,wx.createPage(n);
