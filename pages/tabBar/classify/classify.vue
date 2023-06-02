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
		<!-- 分类 -->
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="currentItem" :values="listItems" style-type="text" active-color="#feb817"
				@clickItem="onClickItem" />
		</view>

		<!-- 表情列表 -->
		<view class="content">
			<view v-if="currentItem === 0">

				<view class="grid-dynamic-box">
					<uni-grid :column="3" :show-border="false" :square="false">
						<uni-grid-item v-for="(item, index) in dynamicList0" :index="index" :key="index">
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
				<uni-pagination :total="totalPageNum0" :pageSize="pageSize" :current="currentPage0" title="分页"
					@change="changePage" />
			</view>
			<view v-if="currentItem === 1">
				<view class="grid-dynamic-box">
					<!-- <uni-grid :column="3" :show-border="false" :square="false" @change="change_grid"> -->
					<uni-grid :column="3" :show-border="false" :square="false">
						<uni-grid-item v-for="(item, index) in dynamicList1" :index="index" :key="index">
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
				<uni-pagination :total="totalPageNum1" :pageSize="pageSize" :current="currentPage1" title="分页"
					@change="changePage" />
			</view>
			<view v-if="currentItem === 2">
				<view class="grid-dynamic-box">
					<!-- <uni-grid :column="3" :show-border="false" :square="false" @change="change_grid"> -->
					<uni-grid :column="3" :show-border="false" :square="false">
						<uni-grid-item v-for="(item, index) in dynamicList2" :index="index" :key="index">
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
				<uni-pagination :total="totalPageNum2" :pageSize="pageSize" :current="currentPage2" title="分页"
					@change="changePage" />
			</view>
			<view v-if="currentItem === 3">
				<view class="grid-dynamic-box">
					<uni-grid :column="3" :show-border="false" :square="false">
						<uni-grid-item v-for="(item, index) in dynamicList3" :index="index" :key="index">
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
				<uni-pagination :total="totalPageNum3" :pageSize="pageSize" :current="currentPage3" title="分页"
					@change="changePage" />
			</view>
		</view>


		<!-- <ad-custom unit-id="adunit-7188b06a96efdb1e" ad-intervals="30"></ad-custom> -->

<ad unit-id="adunit-5da47fe29e82f481" ad-type="video" ad-theme="white"></ad>
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
					iconColor: '#fff'
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
				listItems: ['开心', '伤心', '生气', '其他'],
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

			}
		},


		onLoad() {

			let that = this;
			that.currentItem = 0
			this.loadThisListAllBQB()
		},

		methods: {

			clickBannerItem(e) {
				this.swiperDotIndex = e
			},
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

			//根据列表下标获取表情类型
			getETypeByListNum: function(listNum) {

				if (listNum == 0) {
					this.currentEType = 1
				} else if (listNum == 1) {
					this.currentEType = 2
				} else if (listNum == 2) {
					this.currentEType = 3
				} else if (listNum == 3) {
					this.currentEType = 4
				}
			},


			//根据列表获取本地缓存，拿到跳转到哪一页
			getCurrentSortCacheByListNum: function(that, listNum) {
				let currentSortKey = ''
				if (listNum == 0) {
					currentSortKey = 'current_sort_key_0'
				} else if (listNum == 1) {
					currentSortKey = 'current_sort_key_1'
				} else if (listNum == 2) {
					currentSortKey = 'current_sort_key_2'
				} else if (listNum == 3) {
					currentSortKey = 'current_sort_key_3'
				}

				uni.getStorage({
					key: currentSortKey,
					success: function(res) {
						console.log("currentSortKey:", res.data);
						if (listNum == 0) {
							that.currentSort0 = res.data
						} else if (listNum == 1) {
							that.currentSort1 = res.data
						} else if (listNum == 2) {
							that.currentSort2 = res.data
						} else if (listNum == 3) {
							that.currentSort3 = res.data
						}
					}
				});
			},


			//加载当前列表的总表情数量
			loadThisListTotalPageNum: function(listNum) {
				this.getETypeByListNum(listNum)
				this.getCurrentSortCacheByListNum(this, listNum)

				const db = uniCloud.database()
				db.collection('kids_emoticon')
					.where('k_type==1')
					.where('e_type==' + this.currentEType)
					.count()
					.then((res) => {
						console.log('当前表情包类型总数量')
						console.log(res.result.total)
						if (listNum == 0) {
							this.totalPageNum0 = res.result.total
						} else if (listNum == 1) {
							this.totalPageNum1 = res.result.total
						} else if (listNum == 2) {
							this.totalPageNum2 = res.result.total
						} else if (listNum == 3) {
							this.totalPageNum3 = res.result.total
						}
					}).catch((e) => {
						console.log(e)
					});
			},


			changeFabStyle: function(listNum) {

				if (listNum == 0) {
					this.pattern.buttonColor = '#fbff65'
					this.pattern.iconColor = '#9ea3ab'
				} else if (listNum == 1) {
					this.pattern.buttonColor = '#5c6bff'
					this.pattern.iconColor = '#fff'
				} else if (listNum == 2) {
					this.pattern.buttonColor = '#fd636c'
					this.pattern.iconColor = '#fff'
				} else if (listNum == 3) {
					this.pattern.buttonColor = '#fd80f4'
					this.pattern.iconColor = '#fff'
				}
			},


			//跳到某哥指定列表的某一页，需要先指定列表，传页数过来
			jumpPage: function() {
				console.log("===========jumpPage==============")
				let pageSize = this.pageSize
				let currentPage = this.currentPage0
				this.getETypeByListNum(this.currentItem)
				if (this.currentItem == 1) {
					currentPage = this.currentPage1
				} else if (this.currentItem == 2) {
					currentPage = this.currentPage2
				} else if (this.currentItem == 3) {
					currentPage = this.currentPage3
				}

				let skipNum = pageSize * (currentPage - 1)
				const db = uniCloud.database()
				db.collection('kids_emoticon')
					.where('k_type==1')
					.where('e_type==' + this.currentEType)
					.skip(skipNum)
					.limit(pageSize)
					.orderBy('create_time desc')
					.get().then((res) => {
						// res 为数据库查询结果
						console.log(res)
						let totalPageNum = 0
						let dynamicList = []
						if (res.result.data.length == 0) {
							totalPageNum = pageSize * (currentPage - 1)
						} else {
							if (res.result.data.length < pageSize) {
								totalPageNum = pageSize * currentPage
							}
							console.log(res)
							dynamicList = [];
							res.result.data.forEach((item, index) => { //js遍历数组
								dynamicList.push({
									url: item.e_url,
								})
							});
						}

						if (this.currentItem == 0) {
							if (totalPageNum > 0) {
								this.totalPageNum0 = totalPageNum
							}
							this.dynamicList0 = dynamicList
						} else if (this.currentItem == 1) {
							if (totalPageNum > 0) {
								this.totalPageNum1 = totalPageNum
							}
							this.dynamicList1 = dynamicList
						} else if (this.currentItem == 2) {
							if (totalPageNum > 0) {
								this.totalPageNum2 = totalPageNum
							}
							this.dynamicList2 = dynamicList
						} else if (this.currentItem == 3) {
							if (totalPageNum > 0) {
								this.totalPageNum3 = totalPageNum
							}
							this.dynamicList3 = dynamicList
						}



					}).catch((e) => {
						console.log(e)
					});
			},

			//初始化本业表情
			loadThisListAllBQB: function() {
				//如果列表为空，那就需要初始化页面数据
				let load = false
				if (this.currentItem == 0 && this.dynamicList0.length == 0) {
					this.currentPage0 = 1
					load = true
				} else if (this.currentItem == 1 && this.dynamicList1.length == 0) {
					this.currentPage1 = 1
					load = true
				} else if (this.currentItem == 2 && this.dynamicList2.length == 0) {
					this.currentPage2 = 1
					load = true
				} else if (this.currentItem == 3 && this.dynamicList3.length == 0) {
					this.currentPage3 = 1
					load = true
				}
				if (load) {
					//获取表情类型
					this.getETypeByListNum(this.currentItem)
					//获取跳转页面表情包
					this.jumpPage()
					//加载总页数和初始化缓存标志
					this.loadThisListTotalPageNum(this.currentItem)

					this.changeFabStyle(this.currentItem)
				}
			},

			//切换表情类型
			onClickItem(e) {
				if (this.currentItem !== e.currentIndex) {
					this.currentItem = e.currentIndex
				}

				this.changeFabStyle(this.currentItem)
				this.loadThisListAllBQB()
			},


			//换页
			changePage(e) {
				console.log(e)
				if (this.currentItem == 0) {
					this.currentPage0 = e.current
				} else if (this.currentItem == 1) {
					this.currentPage1 = e.current
				} else if (this.currentItem == 2) {
					this.currentPage2 = e.current
				} else if (this.currentItem == 3) {
					this.currentPage3 = e.current
				}
				this.jumpPage()
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
								let key = that.getCurrentSortCacheByListNum(that, that.currentItem)
								let currentSort = 0
								if (that.currentItem == 0) {
									that.currentSort0 = that.currentPage0
									currentSort = that.currentPage0
								} else if (that.currentItem == 1) {
									that.currentSort1 = that.currentPage1
									currentSort = that.currentPage1
								} else if (that.currentItem == 2) {
									that.currentSort2 = that.currentPage2
									currentSort = that.currentPage2
								} else if (that.currentItem == 3) {
									that.currentSort3 = that.currentPage3
									currentSort = that.currentPage3
								}
								uni.setStorage({
									key: key,
									data: currentSort,
									success: function() {
										console.log('setStorage success');
									}
								});
								console.log('缓存当前页' + currentSort)
							} else if (e.item.text == "前往标记") {

								if (that.currentItem == 0) {
									that.currentPage0 = that.currentSort0
								} else if (that.currentItem == 1) {
									that.currentPage1 = that.currentSort1
								} else if (that.currentItem == 2) {
									that.currentPage2 = that.currentSort2
								} else if (that.currentItem == 3) {
									that.currentPage3 = that.currentSort3
								}
								that.jumpPage()
							} else if (e.item.text == "首页") {
								if (that.currentItem == 0) {
									that.currentPage0 = 1
								} else if (that.currentItem == 1) {
									that.currentPage1 = 1
								} else if (that.currentItem == 2) {
									that.currentPage2 = 1
								} else if (that.currentItem == 3) {
									that.currentPage3 = 1
								}
								that.jumpPage()
							}
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}

	.uni-common-mt {
		// margin-top: 10px;
	}

	.swiper-box {
		height: 100px;
	}

	.uni-padding-wrap {
		width: 750rpx;
		padding: 0px 0px 5px 0px;
	}

	.content {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 440px;
		text-align: center;
	}

	.banner-image {
		width: 750rpx;
		height: 100px;
	}

	.content-text {
		font-size: 14px;
		color: #666;
	}

	.color-tag {
		width: 25px;
		height: 25px;
	}

	.uni-list {
		flex: 1;
	}

	.uni-list-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		background-color: #FFFFFF;
	}


	.uni-list-item__container {
		padding: 12px 15px;
		width: 100%;
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eee;
	}

	.uni-list-item__content-title {
		font-size: 14px;
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
		padding: 3px 5px;
	}

	.grid-item-image {
		width: 95px;
		height: 90px;
		padding-left: 10px;
	}


	.grid-dot {
		position: absolute;
		top: 7px;
		right: 35px;
	}
</style>