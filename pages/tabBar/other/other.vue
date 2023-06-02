<template>
	<view>

		<!-- banner -->
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickBannerItem :current="current" :mode="mode">
			<swiper class="swiper-box" @change="changeBanner" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in banner_info" :key="index">
					<image :src="item.url" class="banner-image" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</uni-swiper-dot>


		<uni-section title="更多表情包推荐" titleColor="#fd6608">

			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			<uni-list>
				<uni-list :border="true">
					<uni-list-chat :avatar-circle="true" title="丸子妹表情包" avatar="/static/wanzimei.jpeg"
						note="点击打开丸子妹表情包小程序哦~" clickable @click="goNativeindex('wxaa8393c4a5299fc8')">
					</uni-list-chat>
				</uni-list>
				<uni-list :border="true">
					<uni-list-chat :avatar-circle="true" title="黄夏温的表情包" avatar="/static/huangxiawen.jpeg"
						note="点击打开黄夏温表情包小程序哦~" clickable @click="goNativeindex('wx168440ed2b78d279')">
					</uni-list-chat>
				</uni-list>
			</uni-list>
		</uni-section>
<ad-custom unit-id="adunit-0bf9d10c06f4f401"></ad-custom>
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

			}
		},
		methods: {

			clickBannerItem(e) {
				this.swiperDotIndex = e
			},
			goNativeindex(id) {
				uni.navigateToMiniProgram({
					appId: id, // 此为 开源字节 appid
					path: 'pages/tabBar/home/home', // 此为开源字节首页路径
					envVersion: "release",
					success: res => {
						// 打开成功
						console.log("打开成功", res);
					},
					fail: err => {
						console.log(err);
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.swiper-box {
		height: 100px;
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
</style>