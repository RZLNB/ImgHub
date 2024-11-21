<template>
    <div class="blocked-image-page">
        <div>
            <div>
                抱歉，当前图片已被禁止访问。
                <br>
                Sorry, current image is prohibited from being accessed.
            </div>
            <br>
            <div>Powered By: 
                <span>
                <a href="https://github.com/MarSeventh/CloudFlare-ImgBed" style="color: cornflowerblue;">
                    CloudFlare-ImgBed
                </a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { useHead } from '@vueuse/head';

export default {
    name: 'BlockedImage',
    setup() {
        useHead({
            title: 'Blocked Image',
            meta: [
                { name: 'robots', content: 'noindex, nofollow' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { charset: 'UTF-8' }
            ],
        });
    },
    computed: {
        backgroundColor() {
            return this.isDarkMode ? 
                `rgba(30, 30, 30, ${this.componentOpacity})` : 
                `rgba(255, 255, 255, ${this.componentOpacity})`
        },
        textColor() {
            return this.isDarkMode ? '#ffffff' : '#000000'
        }
    }
}
</script>

<style scoped>
.blocked-image-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: v-bind('backgroundColor');
    color: v-bind('textColor');
}
</style>  