<template>
    <div class="cartcontrol">
        <transition name="decrease">
            <div class="cart-decrease"
        v-show="this.food.count > 0" @click.stop.prevent="decreaseCart">
                <span class="icon-remove_circle_outline inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="this.food.count > 0">{{food.count}}</div>
        <div class="cart-add" @click.stop.prevent="addCart($event)">
            <span class="icon-add_circle inner"></span>
        </div>
    </div>
</template>
<script>
import {eventBus} from '@/main.js'
export default {
    name: 'cartcontrol',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart (e) {
            if (!this.food.count) {
                this.$set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
            eventBus.$emit('cart.add', e.target)
        },
        decreaseCart () {
            this.food.count--
        }
    }
}
</script>
<style lang="stylus">
    .cartcontrol
        font-size 0
        .cart-decrease, .cart-count, .cart-add
            display inline-block
        .cart-decrease, .cart-add
            padding 6px
            .inner
                display inline-block
                font-size 24px
                line-height 24px
                color rgb(0, 160, 220)
                transition all 0.4s linear
                transform rotate(0)
        .cart-decrease
            transition all 0.4s linear
        .cart-count
            font-size 10px
            line-height 24px
            vertical-align top
            width 12px
            padding-top 6px
            text-align center
        .decrease-enter-active, .decrease-leave-active
            opacity 1
            transform translate3d(0, 0, 0)
        .decrease-enter, .decrease-leave-to
            opacity 0
            transform translate3d(24px, 0, 0)
            .inner
                transform rotate(180deg)
</style>
