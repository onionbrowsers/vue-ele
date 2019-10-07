<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="img-header">
                    <img :src='food.image'>
                    <div class="back" @click="hide">
                        <span class="icon-arrow_lift"></span>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food='food'></cartcontrol>
                    </div>
                    <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品详情</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split v-show="food.info"></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :select-type='selectType' @ratingTypeSelect = "ratingTypeSelects"
                    @contentToggle = "contentToggles"
                    :only-content='onlyContent' :desc='desc' :ratings='food.ratings'></ratingselect>
                </div>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)"
                        v-for="(rating, index) in food.ratings" :key="index">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                            <div class="text">
                                <span :class="{'icon-thumb_up': rating.rateType === 0,
                                'icon-thumb_down': rating.rateType === 1}">{{rating.text}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                        暂无评价
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '*/cartcontrol/cartcontrol'
import split from '*/split/split'
import ratingselect from '*/ratingselect/ratingselect'
import {formatDate} from '@/common/js/date.js'

const ALL = 2

export default {
    props: {
        food: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '满意',
                negative: '吐槽'
            }
        }
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    methods: {
        show () {
            this.showFlag = true
            this.selectType = ALL
            this.onlyContent = true
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        hide () {
            this.showFlag = false
        },
        addFirst () {
            this.$set(this.food, 'count', 1)
        },
        needShow (type, text) {
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        },
        ratingTypeSelects (type) {
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        contentToggles (content) {
            this.onlyContent = content
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    }
}
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .food
        position fixed
        left 0
        bottom 48px
        width 100%
        height 100%
        background #ffffff
        z-index 30
        transition all 0.2s linear
        .img-header
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back
                position absolute
                top 48px
                left 0
                .icon-arrow_lift
                    display block
                    padding 10px
                    font-size 20px
                    color #aaa
        .content
            padding 18px
            position relative
            .title
                margin-bottom 8px
                line-height 14px
                font-size 14px
                font-weight 700
                color rgb(7, 17, 27)
            .detail
                margin-bottom 8px
                line-height 10px
                height 10px
                font-size 0
                .sell-count, .rating
                    font-size 10px
                    color rgb(147, 153, 159)
                .sell-count
                    margin-right 12px
            .price
                font-size 0px
                font-weight 700
                line-height 24px
                .now
                    margin-right 8px
                    font-size 14px
                    color rgb(240, 20, 20)
                .old
                    font-size 10px
                    text-decoration line-through
                    color rgb(147, 153, 159)
            .cartcontrol-wrapper
                position absolute
                right 12px
                bottom 12px
            .buy
                position absolute
                right 18px
                bottom 18px
                z-index 10
                height 24px
                line-height 24px
                padding 0 12px
                box-sizing border-box
                font-size 10px
                border-radius 12px
                color #ffffff
                background-color rgb(0, 160, 220)
        .info
            padding 18px
            .title
                margin-bottom 16px
                line-height 14px
                font-size 14px
                color rgb(7, 17, 27)
            .text
                color rgb(77, 85, 93)
                line-height 24px
                font-size 12px
                font-weight 200
                padding 0 8px
        .rating
            padding-top 18px
            .title
                margin-left 18px
                line-height 14px
                font-size 14px
                color rgb(7, 17, 27)
        .rating-wrapper
            padding 0 16px
            .rating-item
                position relative
                padding 16px 0
                border-1px(rgba(7, 17, 27, 0.1))
                .user
                    position absolute
                    right 0
                    top 16px
                    font-size 0
                    line-height 12px
                    .name
                        display inline-block
                        vertical-align top
                        font-size 10px
                        color rgb(147, 153, 159)
                        margin-right 6px
                    .avatar
                        border-radius 50%
                .time
                    font-size 10px
                    line-height 12px
                    color rgb(147, 153, 159)
                    margin-bottom 6px
                .text
                    line-height 12px
                    font-size 12px
                    color rgb(7, 17, 27)
                    .icon-thumb_up, .icon-thumb_down
                        margin-right 4px
                        line-height 12px
                        font-size 12px
                        &::before
                            margin-right 4px
                    .icon-thumb_up
                        color rgb(0, 160, 220)
                    .icon-thumb_down
                        color rgb(147, 153, 159)
            .no-rating
                padding 16px 0
                font-size 12px
                color rgb(147, 153, 159)
    .move-enter-active, .move-leave-active
        transform translate3d(0, 0, 0)
    .move-enter, .move-leave-to
        transform translate3d(100%, 0, 0)
</style>
