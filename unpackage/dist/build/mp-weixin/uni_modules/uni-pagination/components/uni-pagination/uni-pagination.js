"use strict";const e=require("../../../../common/vendor.js"),t=require("./i18n/index.js"),{t:n}=e.initVueI18n(t.messages),i={name:"UniPagination",emits:["update:modelValue","input","change","pageSizeChange"],props:{value:{type:[Number,String],default:1},modelValue:{type:[Number,String],default:1},prevText:{type:String},nextText:{type:String},piecePerPageText:{type:String},current:{type:[Number,String],default:1},total:{type:[Number,String],default:0},pageSize:{type:[Number,String],default:10},showIcon:{type:[Boolean,String],default:!1},showPageSize:{type:[Boolean,String],default:!1},pagerCount:{type:Number,default:7},pageSizeRange:{type:Array,default:()=>[20,50,100,500]}},data:()=>({pageSizeIndex:0,currentIndex:1,paperData:[],pickerShow:!1}),computed:{piecePerPage(){return this.piecePerPageText||n("uni-pagination.piecePerPage")},prevPageText(){return this.prevText||n("uni-pagination.prevText")},nextPageText(){return this.nextText||n("uni-pagination.nextText")},maxPage(){let e=1,t=Number(this.total),n=Number(this.pageSize);return t&&n&&(e=Math.ceil(t/n)),e},paper(){const e=this.currentIndex,t=this.pagerCount,n=this.total,i=this.pageSize;let r=[],a=[],u=Math.ceil(n/i);for(let h=0;h<u;h++)r.push(h+1);a.push(1);const c=r[r.length-(t+1)/2];return r.forEach(((n,i)=>{(t+1)/2>=e?n<t+1&&n>1&&a.push(n):e+2<=c?n>e-(t+1)/2&&n<e+(t+1)/2&&a.push(n):(n>e-(t+1)/2||u-t<n)&&n<r[r.length-1]&&a.push(n)})),u>t?((t+1)/2>=e?a[a.length-1]="...":e+2<=c?(a[1]="...",a[a.length-1]="..."):a[1]="...",a.push(r[r.length-1])):(t+1)/2>=e||e+2<=c||(a.shift(),a.push(r[r.length-1])),a}},watch:{current:{immediate:!0,handler(e,t){this.currentIndex=e<1?1:e}},value:{immediate:!0,handler(e){1===Number(this.current)&&(this.currentIndex=e<1?1:e)}},pageSizeIndex(e){this.$emit("pageSizeChange",this.pageSizeRange[e])}},methods:{pickerChange(e){this.pageSizeIndex=e.detail.value,this.pickerClick()},pickerClick(){},selectPage(e,t){if(parseInt(e))this.currentIndex=e,this.change("current");else{let e=Math.ceil(this.total/this.pageSize);if(t<=1)return void(this.currentIndex-5>1?this.currentIndex-=5:this.currentIndex=1);if(t>=6)return void(this.currentIndex+5>e?this.currentIndex=e:this.currentIndex+=5)}},clickLeft(){1!==Number(this.currentIndex)&&(this.currentIndex-=1,this.change("prev"))},clickRight(){Number(this.currentIndex)>=this.maxPage||(this.currentIndex+=1,this.change("next"))},change(e){this.$emit("input",this.currentIndex),this.$emit("update:modelValue",this.currentIndex),this.$emit("change",{type:e,current:this.currentIndex})}}};if(!Array){e.resolveComponent("uni-icons")()}Math;const r=e._export_sfc(i,[["render",function(t,n,i,r,a,u){return e.e({a:e.t(i.total),b:!0===i.showIcon||"true"===i.showIcon},!0===i.showIcon||"true"===i.showIcon?{c:e.p({color:"#666",size:"16",type:"left"})}:{d:e.t(u.prevPageText)},{e:e.n(1===a.currentIndex?"uni-pagination--disabled":"uni-pagination--enabled"),f:1===a.currentIndex?"":"uni-pagination--hover",g:e.o(((...e)=>u.clickLeft&&u.clickLeft(...e))),h:e.t(a.currentIndex),i:e.t(u.maxPage||0),j:e.f(u.paper,((t,n,i)=>({a:e.t(t),b:n,c:t===a.currentIndex?1:"",d:e.o((e=>u.selectPage(t,n)),n)}))),k:!0===i.showIcon||"true"===i.showIcon},!0===i.showIcon||"true"===i.showIcon?{l:e.p({color:"#666",size:"16",type:"right"})}:{m:e.t(u.nextPageText)},{n:e.n(a.currentIndex>=u.maxPage?"uni-pagination--disabled":"uni-pagination--enabled"),o:a.currentIndex===u.maxPage?"":"uni-pagination--hover",p:e.o(((...e)=>u.clickRight&&u.clickRight(...e)))})}],["__scopeId","data-v-f9256f81"]]);wx.createComponent(r);
