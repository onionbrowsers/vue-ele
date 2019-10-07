<template>
    <div class="ratingselcet">
        <div class="rating-type border-1px">
            <span class="block all" @click="select(2)"
            :class="{'active': selectTypes === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" @click="select(0)"
            :class="{'active': selectTypes === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative" @click="select(1)"
            :class="{'active': selectTypes === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent" :class="{'on': this.toggleContents === true}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
    props: {
        ratings: {
            type: Array,
            default () {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default () {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    data () {
        return {
            selectTypes: this.selectType,
            toggleContents: this.onlyContent
        }
    },
    methods: {
        select (type) {
            this.selectTypes = type
            this.$emit('ratingTypeSelect', type)
        },
        toggleContent () {
            this.toggleContents = !this.toggleContents
            this.$emit('contentToggle', this.toggleContents)
        }
    },
    computed: {
        positives () {
            return this.ratings.filter(rating => {
                return rating.rateType === POSITIVE
            })
        },
        negatives () {
            return this.ratings.filter(rating => {
                return rating.rateType === NEGATIVE
            })
        }
    }
}
</script>
<style lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .ratingselcet
        .rating-type
            padding 18px 0
            margin 0 18px
            border-1px(rgba(7, 17, 27, 0.1))
            font-size 0
            .block
                display inline-block
                padding 8px 12px
                margin-right 8px
                border-radius 1px
                color rgb(77, 85, 93)
                font-size 12px
                &.active
                    color #ffffff
                .count
                    font-size 8px
                    margin-left 2px
                    line-height 16px
                &.positive, &.all
                    background-color rgba(0, 160, 220, 0.2)
                    &.active
                        background-color rgb(0, 160, 220)
                &.negative
                    background-color rgba(77 ,85, 93, 0.2)
                    &.active
                        background-color rgb(77, 85, 93)
        .switch
            padding 12px 18px
            line-height 24px
            border-bottom 1px solid rgba(7, 17, 27, 0.1)
            color rgb(147, 153, 159)
            font-size 0
            &.on
                .icon-check_circle
                    color #00c850
            .icon-check_circle
                font-size 24px
                margin-right 4px
                display inline-block
                vertical-align top
            .text
                font-size 12px
                display inline-block
                vertical-align top
</style>
