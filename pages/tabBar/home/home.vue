<template>



	<view class="warp">
		<!-- banner -->
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickBannerItem :current="current" :mode="mode">
			<swiper class="swiper-box" @change="changeBanner" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in banner_info" :key="index">
					<image :src="item.url" class="banner-image" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<!-- 悬浮按钮 -->
		<uni-fab class="fix_but" ref="fab" horizontal="right" vertical="top" direction="vertical" :pattern="pattern"
			:content="content" @trigger="trigger" />
<ad unit-id="adunit-1e7c67e8fa4ceb4e"></ad>

		<!-- 表情列表 -->
		<uni-section :title="sectionTip" titleColor="#fd6608" padding>
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			<view class="grid-dynamic-box">
				<!-- <uni-grid :column="3" :show-border="false" :square="false" @change="change_grid"> -->
				<uni-grid :column="3" :show-border="false" :square="false">
					<uni-grid-item v-for="(item, index) in dynamicList" :index="index" :key="index">
						<view class="grid-item-box">
							<image :src="item.url" class="grid-item-image" mode="aspectFill" />
							<view class="grid-dot">
								<uni-icons type="download-filled" size="20" color="#feb817"
									@click="shareImg(item.url)" />
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			<uni-pagination :total="totalPageNum" :pageSize="pageSize" :current="currentPage" title="分页"
				@change="changePage" />
		</uni-section>
<ad unit-id="adunit-5da47fe29e82f481" ad-type="video" ad-theme="white"></ad>
		<!-- <view class="content">
			<button @click="nextPage()">请求数据库</button>
		</view> -->

	</view>
</template>




<script>
	export default {
		components: {},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '瑶一瑶小可爱的表情包',
				path: 'pages/tabBar/home/home'
			}
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
					url: 'https://mmbiz.qpic.cn/mmbiz_png/NiaDlMDtNVMFaABHQ9n9F0FISFrJF1bcIrS3S5FQ2cHYjqmJBWia18r0o82iccp1tk3vnTjMb7OvjxOhLfX6K2vicA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1',
				}, ],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {},
				swiperDotIndex: 0,
				//悬浮按钮
				title: 'uni-fab',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#7A7E83',
					buttonColor: '#fff',
					iconColor: '#7A7E83'
				},
				content: [{
						iconPath: '/static/pin.png',
						selectedIconPath: '/static/pin.png',
						text: '标记页面',
						active: false
					},
					{
						iconPath: '/static/skip.png',
						selectedIconPath: '/static/skip.png',
						text: '前往标记',
						active: false
					},
					{
						iconPath: '/static/arrow-left-circle.png',
						selectedIconPath: '/static/arrow-left-circle.png',
						text: '首页',
						active: false
					}
				],

				//动态列表
				dynamicList: [],
				list: [{
						url: '/static/c1.png',
						text: 'Grid 1',
						badge: '1',
						type: "download"
					},
					{
						url: '/static/c2.png',
						text: 'Grid 2',
						badge: '1',
						type: "download"
					},
					{
						url: '/static/c3.png',
						text: 'Grid 3',
						badge: '99',
						type: "download"
					},
					{
						url: '/static/c4.png',
						text: 'Grid 4',
						badge: '2',
						type: "download"
					},
					{
						url: '/static/c5.png',
						text: 'Grid 5'
					},
					{
						url: '/static/c6.png',
						text: 'Grid 6'
					},
					{
						url: '/static/c7.png',
						text: 'Grid 7'
					},
					{
						url: '/static/c8.png',
						text: 'Grid 8'
					},
					{
						url: '/static/c9.png',
						text: 'Grid 9'
					}
				],
				sectionTip: '全部表情（不定期更新）'
			}
		},

		onLoad() {

			let that = this;
			const db = uniCloud.database()

//查询当前日期更新提醒
			db.collection('update_record')
				.where('k_type==1')
				.orderBy('create_time desc')
				.get().then((res) => {
					// res 为数据库查询结果
					console.log(res)
					if (res.result.data.length > 0) {
						this.sectionTip = res.result.data[0].show_time
					}
				}).catch((e) => {
					console.log(e)
				});

//初始化列表数据，兼容总个数为0的情况
			db.collection('kids_emoticon')
				.where('k_type==1')
				.skip(0)
				.limit(this.pageSize)
				.orderBy('create_time desc')
				.get().then((res) => {
					// res 为数据库查询结果
					console.log(res)
					if (res.result.data.length == 0) {
						// this.totalPageNum = this.pageSize * (e.current - 1)
						this.totalPageNum = 1
					} else {
						if (res.result.data.length < this.pageSize) {
							// this.totalPageNum = this.pageSize * e.current
							this.totalPageNum = 1
						}
						console.log(res)
						this.dynamicList = [];
						res.result.data.forEach((item, index) => { //js遍历数组
							this.dynamicList.push({
								url: item.e_url,
							})
						});
					}
				}).catch((e) => {
					console.log(e)
				});

//加载总个数
			db.collection('kids_emoticon')
				.where('k_type==1')
				.count()
				.then((res) => {
					console.log(res)
					this.totalPageNum = res.result.total
				}).catch((e) => {
					console.log(e)
				});

			//拿本地缓存，找到当前要跳到哪一页数
			uni.getStorage({
				key: 'current_sort_key',
				success: function(res) {
					console.log("current_sort_key:", res.data);
					that.currentSort = res.data
				}
			});

		},
		methods: {
			shareImg(u) {
				console.log(u)
				uni.showLoading({
					title: '下载中...'
				})
				wx.downloadFile({
					url: u,
					success: (res) => {
						uni.hideLoading();
						wx.showShareImageMenu({
							path: res.tempFilePath
						})
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err)
					}
				})
			},

			downImg() {
				console.log('弹窗')

			},


			//弹窗
			toggle() {
				console.log('弹窗')
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup[0].open('bottom')
				// console.log(this.$refs.popup)
			},


			jumpPage: function(currentPage) {
				console.log("===========jumpPage==============")
				// this.currentPage = currentPage
				let skipNum = this.pageSize * (this.currentPage - 1)
				const db = uniCloud.database()
				db.collection('kids_emoticon')
					.where('k_type==1')
					.skip(skipNum)
					.limit(this.pageSize)
					.orderBy('create_time desc')
					.get().then((res) => {
						// res 为数据库查询结果
						console.log(res)
						if (res.result.data.length == 0) {
							this.totalPageNum = this.pageSize * (this.currentPage - 1)
						} else {
							if (res.result.data.length < this.pageSize) {
								this.totalPageNum = this.pageSize * this.currentPage
							}
							console.log(res)
							this.dynamicList = [];
							res.result.data.forEach((item, index) => { //js遍历数组
								this.dynamicList.push({
									url: item.e_url,
								})
							});
						}
					}).catch((e) => {
						console.log(e)
					});
			},

			changePage(e) {
				console.log(e)
				this.currentPage = e.current
				this.jumpPage(e.current)
			},

			changeBanner(e) {
				this.current = e.detail.current
			},
			clickBannerItem(e) {
				this.swiperDotIndex = e
			},

			trigger(e) {
				console.log(e)
				this.content[e.index].active = !e.item.active
				let content = "确定前往首页吗？"
				if (e.item.text == "标记页面") {
					content = "确定标记当前页面吗？"
				} else if (e.item.text == "前往标记") {
					content = "确定前往上次标记的页面吗？"
				}
				let that = this
				uni.showModal({
					title: '提示',
					content: content,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if (e.item.text == "标记页面") {
								that.currentSort = that.currentPage
								uni.setStorage({
									key: 'current_sort_key',
									data: that.currentSort,
									success: function() {
										console.log('setStorage success');
									}
								});
								console.log(that.currentSort)
							} else if (e.item.text == "前往标记") {
								that.currentPage = that.currentSort
								that.jumpPage(that.currentSort)
							} else if (e.item.text == "首页") {
								that.currentPage = 1
								that.jumpPage(1)
							}
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},



			//点击九宫格
			change_grid(e) {
				console.log(e)
				let {
					index
				} = e.detail
				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
				let pic = this.dynamicList[index]
				console.log(pic)
			},
			add() {
				if (this.dynamicList.length < 20) {
					this.dynamicList.push({
						url: `/static/c${1}.png`,
						text: `Grid ${this.dynamicList.length+1}`,
						color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
					})
				} else {
					uni.showToast({
						title: '最多添加9个',
						icon: 'none'
					});
				}
			},
			del() {
				this.dynamicList.splice(this.dynamicList.length - 1, 1)
			},
			clickReqBut() {
				uni.request({
					url: 'https://service.zhichenghn.cn/api/v1/wallpaper/list', //仅为示例，并非真实接口地址。
					data: {
						cv: 'JXLB2.1.0_Android_WECHAT_JXLB',
						openid: 'oYUic4mLEujYRKRzIUnhwaKZ734o',
						uid: '12920072',
					},
					success: (res) => {
						let data = res.data.data.list;
						data.forEach((item, index) => { //js遍历数组
							this.dynamicList.push({
								url: item,
								text: `Grid ${this.dynamicList.length+1}`,
								color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
							})
						});
					}
				});
			}
		},


	}
</script>



<style lang="scss">
	.downloadPopupBut {
		display: flex;
		flex-direction: row;

		.button {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			flex: 1;
			height: 35px;
			margin: 15px;
			padding: 25px;
			border-radius: 10px;
			// background-color:#ffc58c;

		}

		.button-text {
			color: #7f7781;
		}
	}

	.swiper-box {
		height: 100px;
	}

	.banner-image {
		width: 750rpx;
		height: 100px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100px;
		color: #fff;
	}


	.uni-margin-wrap {
		width: 690px;
		width: 100%;
		height: 100px;
	}

	.swiper {
		height: 100px;
	}

	.swiper-item {
		display: block;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}


	.grid-item-image {
		width: 110px;
		height: 110px;
	}


	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: #feb817;
	}

	.grid-dynamic-box {
		margin-bottom: 5px;
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 100px;
		padding: 3px 11px;
	}


	.grid-dot {
		position: absolute;
		top: 7px;
		right: 20px;
	}

	.swiper {
		height: 420px;
	}

	/* #ifdef H5 */
	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

	/* #endif */
</style>
