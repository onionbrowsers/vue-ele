<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}\{{seller.deliveryTime}}分钟到达
                </div>
                <div v-if="seller.supports" class="supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" alt="">
        </div>
        <transition name="fade">
            <div class="detail"  v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size='48' :score='seller.score'></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <span class="icon-close"></span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import star from '*/star/star'
export default {
    name: 'Header',
    data () {
        return {
            detailShow: false
        }
    },
    props: {
        seller: {
            type: Object
        }
    },
    methods: {
        showDetail () {
            this.detailShow = true
        },
        hideDetail () {
            this.detailShow = false
        }
    },
    created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
        star
    }
}
</script>
<style lang='stylus'>
    @import '../../common/stylus/mixin.styl'
    .header
        position relative
        color #ffffff
        background-color rgba(7,17,27,0.4)
        overflow hidden
        .content-wrapper
            padding 24px 12px 28px 24px
            font-size 0px
            position relative
            .avatar
                display inline-block
                vertical-align top
                img
                    border-radius 2px
            .content
                display inline-block
                margin-left 16px
                .title
                    margin 2px 0 8px 0
                    .brand
                        width 30px
                        height 18px
                        display inline-block
                        bg-img('brand')
                        background-size 30px 18px
                        background-repeat no-repeat
                    .name
                        margin-left 6px
                        font-size 16px
                        line-height 18px
                        font-weight bold
                        vertical-align top
                .description
                    margin-bottom 10px
                    line-height 12px
                    font-size 12px
                .supports
                    .icon
                        vertical-align top
                        width 12px
                        height 12px
                        display inline-block
                        margin-right 4px
                        background-size 12px 12px
                        background-repeat no-repeat
                        &.decrease
                            bg-img('decrease_1')
                        &.discount
                            bg-img('discount_1')
                        &.guarantee
                            bg-img('guarantee_1')
                        &.invoice
                            bg-img('invoice_1')
                        &.special
                            bg-img('special_1')
                    .text
                        font-size 10px
                        line-height 12px
            .support-count
                position absolute
                right 12px
                bottom 22px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 14px
                background-color rgba(0, 0, 0, 0.2)
                text-align center
                .count
                    font-size 10px
                .icon-keyboard_arrow_right
                    font-size 7px
                    margin-left 5px
        .bulletin-wrapper
            height 28px
            line-height 28px
            padding 0px 22px 0px 12px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            position relative
            background-color rgba(7,17,27,0.2)
            .bulletin-title
                bg-img('bulletin')
                width 22px
                height 12px
                background-size 22px 12px
                display inline-block
                vertical-align top
                margin-top 9px
            .bulletin-text
                font-size 10px
                font-weight 200
                margin-right 4px
            .icon-keyboard_arrow_right
                font-size 10px
                position absolute
                right 10px
                top 8px
        .background
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            z-index -1
            filter blur(10px)
        .fade-leave-active, .fade-enter-active
            transition: opacity 0.7s
        .fade-enter, .fade-leave-to
            opacity 0
        .detail
            position fixed
            z-index 100
            width 100%
            height 100%
            overflow auto
            background-color rgba(7,17,27,0.8)
            top 0
            left 0
            -webkit-backdrop-filter blur(10px)
            .detail-wrapper
                min-height 100%
                width 100%
                .detail-main
                    margin-top 64px
                    padding-bottom 64px
                    .name
                        font-size 16px
                        text-align center
                        font-weight 700
                        line-height 16px
                    .star-wrapper
                        margin 18px
                        padding 2px 0
                        text-align center
                    .title
                        display flex
                        width 80%
                        margin 28px auto 24px
                        .line
                            flex 1
                            position relative
                            top -6px
                            border-bottom 1px solid rgba(255, 255, 255, 0.2)
                        .text
                            padding 0 12px
                            font-size 14px
                            font-weight 700
                    .supports
                        width 80%
                        margin 0 auto
                        .support-item
                            padding 0 12px
                            margin-bottom 12px
                            font-size 0
                            &:last-child
                                margin 0
                            .icon
                                display inline-block
                                width 16px
                                height 16px
                                vertical-align top
                                margin-right 6px
                                background-size 16px 16px
                                &.decrease
                                    bg-img('decrease_2')
                                &.discount
                                    bg-img('discount_2')
                                &.guarantee
                                    bg-img('guarantee_2')
                                &.invoice
                                    bg-img('invoice_2')
                                &.special
                                    bg-img('special_2')
                            .text
                                line-height 16px
                                font-size 12px
                    .bulletin
                        width 80%
                        margin 0 auto
                        .content
                            padding 0 12px
                            line-height 24px
                            font-size 12px
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto
                clear both
                font-size 32px
</style>
