<template>
    <div class="page-footer">
        <div class="footer-content">
            <p class="warning-text">请勿上传违反中国大陆和香港法律的图片，违者后果自负</p>
            <p class="copyright-text">
                Thank you 
                <a class="footer-name" href="https://github.com/MarSeventh/CloudFlare-ImgBed" target="_blank">CloudFlare-ImgBed</a> 
                and deployed with 
                <a class="footer-name" href="https://dash.cloudflare.com/" target="_blank">Cloudflare</a> Pages. |
                <a class="footer-name" :href="footerLink" target="_blank">Find me</a>
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Footer',
    computed: {
        ...mapGetters(['userConfig', 'componentOpacity', 'themeColor']),
        footerLink() {
            return this.userConfig?.footerLink || 'https://blog.rzlnb.top/'
        },
        isDarkMode() {
            return this.$store.state.isDarkMode
        },
        backgroundColor() {
            return this.isDarkMode ? 
                `rgba(30, 30, 30, ${this.componentOpacity})` : 
                `rgba(245, 245, 245, ${this.componentOpacity})`
        },
        textColor() {
            return this.isDarkMode ? '#ffffff' : '#000000'
        }
    }
}
</script>

<style scoped>
.page-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px 0;
    background: v-bind('backgroundColor');
    backdrop-filter: blur(8px);
    position: fixed;
    bottom: 0;
    left: 0;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.warning-text {
    color: v-bind('textColor');
    font-size: 14px;
    margin: 0;
}

.copyright-text {
    color: v-bind('textColor');
    font-size: 14px;
    margin: 0;
}

.footer-name {
    color: v-bind('themeColor');
    font-weight: 600;
    text-decoration: none;
    padding: 0 5px;
    transition: all 0.3s ease;
}

.footer-name:hover {
    opacity: 0.8;
}

.footer-link-icon {
    color: #000000;
    margin-left: 8px;
    transition: all 0.3s ease;
}

.footer-link-icon:hover {
    color: v-bind('themeColor');
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .warning-text,
    .copyright-text {
        font-size: 13px;
        text-align: center;
    }
}
</style>