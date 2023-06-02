<template>
	<view>
		<!-- banner -->
		<uni-swiper-dot class="uni-swiper-dot-box" :current="current" :mode="mode">
			<swiper class="swiper-box" @change="changeBanner" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in banner_info" :key="index">
					<image :src="item.url" class="banner-image" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<!-- 悬浮按钮 -->
		<uni-fab class="fix_but" ref="fab" horizontal="right" vertical="top" direction="vertical" :pattern="pattern"
			:content="content" @trigger="trigger" />

		<uni-section :title="sectionTip" titleColor="#fd6608">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>

			<button class="button inputBut" @click="inputDialogToggle"><text class="button-text">发送信息到树洞</text></button>
			<view>
				<!-- 输入框示例 -->
				<uni-popup ref="inputDialog" type="dialog">
					<!-- <uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
						@confirm="dialogInputConfirm"></uni-popup-dialog>
						<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
							@confirm="dialogInputConfirm"></uni-popup-dialog>
							<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
								@confirm="dialogInputConfirm"></uni-popup-dialog> -->
					<view class="form_info">
						<!-- 基础表单校验 -->
						<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData" label-position="top">
							<uni-forms-item label="标题" required name="title">
								<uni-easyinput v-model="valiFormData.title" maxlength="51" placeholder="不超过16个字" />
							</uni-forms-item>
							<uni-forms-item label="简介/个签" name="desc">
								<uni-easyinput v-model="valiFormData.desc" maxlength="50" placeholder="不超过20个字" />
							</uni-forms-item>
							<uni-forms-item label="内容" required name="info">
								<uni-easyinput class="text_input" type="textarea" style="height:36px;" maxlength="800"
									v-model="valiFormData.info"
									placeholder="不超过500个字;请勿输入不良内容,注重保护个人隐私,未经管理员审核通过的直接删除不予发布,最终解释权归作者所有" />
							</uni-forms-item>
						</uni-forms>
						<button class="inputBut" @click="submit('valiForm')">提交</button>
					</view>
				</uni-popup>
			</view>


			<view class="section_info" v-for="(item, index) in dynamicList" :index="index" :key="index">
				<uni-card :title="item.title" :sub-title="item.desc" :extra="item.extra" class="card_info">
					<text class="uni-body" v-text="item.info"></text>
				</uni-card>
			</view>

			<uni-pagination :total="totalPageNum" :pageSize="pageSize" :current="currentPage" title="分页"
				@change="changePage" />
		</uni-section>
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
				pageSize: 5,

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
					buttonColor: '#356dff',
					iconColor: '#ecf4ff'
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

				sectionTip: '您可以在这里分享你的想法或心事，按最新排序~\n每条消息会经过管理员的审核后才能呈现\n一旦发现违法违规/诱导消息等直接删除不予通知\n请注意保护个人隐私，谨防受骗\n',

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
							errorMessage: '标题不能为空'
						}, {
							validateFunction: (rule, value, data, callback) => {
								// 异步需要返回 Promise 对象
								return new Promise((resolve, reject) => {
									setTimeout(() => {
										if (value.replace(/[^\x00-\xff]/g, '01').length <=
											32) {
											// 通过返回 resolve
											resolve()
										} else {
											// 不通过返回 reject(new Error('错误信息'))
											reject(new Error('字数必须小于16,2英文=1中文'))
										}
									}, 200)
								})
							}
						}]
					},
					desc: {
						rules: [{
							validateFunction: (rule, value, data, callback) => {
								// 异步需要返回 Promise 对象
								return new Promise((resolve, reject) => {
									setTimeout(() => {
										if (value.replace(/[^\x00-\xff]/g, '01').length <=
											40) {
											// 通过返回 resolve
											resolve()
										} else {
											// 不通过返回 reject(new Error('错误信息'))
											reject(new Error('字数必须小于20,2英文=1中文'))
										}
									}, 200)
								})
							}
						}]
					},
					info: {
						rules: [{
							required: true,
							errorMessage: '内容不能为空'
						}, {
							validateFunction: (rule, value, data, callback) => {
								// 异步需要返回 Promise 对象
								return new Promise((resolve, reject) => {
									setTimeout(() => {
										if (value.replace(/[^\x00-\xff]/g, '01').length <=
											1000) {
											// 通过返回 resolve
											resolve()
										} else {
											// 不通过返回 reject(new Error('错误信息'))
											reject(new Error('字数必须小于500,2英文=1中文'))
										}
									}, 200)
								})
							}
						}]
					}
				},
				valiFormData: {
					title: '',
					desc: '',
					info: '',
				},
			}
		},

		onLoad() {

			let that = this;
			const db = uniCloud.database()
			db.collection('update_record')
				.where('k_type==-1')
				.orderBy('create_time desc')
				.get().then((res) => {
					// res 为数据库查询结果
					if (res.result.data.length > 0) {
						this.sectionTip = res.result.data[0].show_time
					}
				}).catch((e) => {
					console.log(e)
				});


			db.collection('write')
				.where("status=='1'")
				.skip(0)
				.limit(this.pageSize)
				.orderBy('create_time desc')
				.get().then((res) => {
					// res 为数据库查询结果
					if (res.result.data.length == 0) {
						this.totalPageNum = 1
					} else {
						if (res.result.data.length < this.pageSize) {
							this.totalPageNum = 1
						}
						this.dynamicList = [];
						res.result.data.forEach((item, index) => { //js遍历数组
							this.dynamicList.push({
								title: item.title,
								desc: item.desc,
								info: item.info,
								extra: item.extra,
							})
						});
					}
				}).catch((e) => {
					console.log(e)
				});

			//加载总个数
			db.collection('write')
				.where("status=='1'")
				.count()
				.then((res) => {
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
			changePage(e) {
				console.log(e)
				this.currentPage = e.current
				this.jumpPage(e.current)
			},

			jumpPage: function(currentPage) {
				console.log("===========jumpPage==============")
				// this.currentPage = currentPage
				let skipNum = this.pageSize * (this.currentPage - 1)
				const db = uniCloud.database()
				db.collection('write')
				.where("status=='1'")
					.skip(skipNum)
					.limit(this.pageSize)
					.orderBy('create_time desc')
					.get().then((res) => {
						// res 为数据库查询结果
						if (res.result.data.length == 0) {
							this.totalPageNum = this.pageSize * (this.currentPage - 1)
						} else {
							if (res.result.data.length < this.pageSize) {
								this.totalPageNum = this.pageSize * this.currentPage
							}
							this.dynamicList = [];
							res.result.data.forEach((item, index) => { //js遍历数组
								this.dynamicList.push({
									title: item.title,
									desc: item.desc,
									info: item.info,
									extra: item.extra,
								})
							});
						}
					}).catch((e) => {
						console.log(e)
					});
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},

			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('表单提交内容:', res);
					const db = uniCloud.database();

					var date = new Date();
					var year = date.getFullYear() - 2000;
					let month = date.getMonth() + 1; //月份从0~11，所以加一
					let strDate = year + "-" + month + "-" + date.getDate();
					let timeUnix = parseInt(new Date().getTime() / 1000) + '';
					console.log(timeUnix);
					db.collection("write")
						.add({
							title: res.title,
							desc: res.desc,
							info: res.info,
							// create_time: timeUnix,
							status: "0",
							extra: strDate,
						})
						.then((res) => {
							uni.showToast({
								title: '提交成功'
							})
							this.valiFormData.title = ''
							this.valiFormData.desc = ''
							this.valiFormData.info = ''
							this.$refs.inputDialog.close()
						})
						.catch((err) => {
							uni.showModal({
								content: err.message || '系统异常，等待修复',
								showCancel: false
							})
						})
				}).catch(err => {
					console.log('err', err);
				})
			},


		}
	}
</script>

<style lang="scss">
	.swiper-box {
		height: 100px;
	}

	.inputBut {

		color: #fff;
		background-color: #feb817;
	}

	.banner-image {
		width: 750rpx;
		height: 100px;
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: #feb817;
	}

	.card_info {
		border-color: #feb817;
	}

	.section_info {
		// color: #2e2309;
		background-color: #ffe6ba;
		padding: 5rpx 5rpx 5rpx 5rpx;
		// border-radius: 5%;
		// border-color: #2e2309;
	}

	.form_info {
		padding: 20px;
		width: 600rpx;
		background-color: #fff;
		border-radius: 5%;
	}

	// .text_input{

	// 	height: 1126px;
	// }
</style>