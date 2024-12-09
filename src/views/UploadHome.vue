<template>
    <div>
    <div class="upload-home">
        <img id="bg1" class="background-image1" alt="Background Image"/>
        <img id="bg2" class="background-image2" alt="Background Image"/>
        <a href="https://github.com/MarSeventh/CloudFlare-ImgBed" class="corner-logo">
            <img class="logo" alt="Sanyue logo" :src="logoUrl"/>
        </a>
        <div class="toolbar">
            <el-tooltip :disabled="disableTooltip" content="上传设置" placement="left">
                <el-button class="toolbar-button" size="large" @click="openCompressDialog" circle>
                    <font-awesome-icon icon="cloud-upload" class="compress-icon" size="lg"/>
                </el-button>
            </el-tooltip>
            <el-tooltip :disabled="disableTooltip" content="链接格式" placement="left">
                <el-button class="toolbar-button" size="large" @click="openUrlDialog" circle>
                    <font-awesome-icon icon="link" class="link-icon" size="lg"/>
                </el-button>
            </el-tooltip>
            <el-tooltip :disabled="disableTooltip" content="管理页面" placement="left">
                <el-button class="toolbar-button" size="large" @click="handleManage" circle>
                    <font-awesome-icon icon="cog" class="config-icon" size="lg"/>
                </el-button>
            </el-tooltip>
            <el-tooltip :disabled="disableTooltip" content="退出登录" placement="left">
                <el-button class="toolbar-button" size="large" @click="handleLogout" circle>
                    <font-awesome-icon icon="sign-out-alt" class="sign-out-icon" size="lg"/>
                </el-button>
            </el-tooltip>
            <el-tooltip :disabled="disableTooltip" content="主题设置" placement="left">
                <el-button class="toolbar-button" size="large" @click="showThemeDialog = true" circle>
                    <div class="theme-color-dot" :style="{ backgroundColor: themeColor }"></div>
                </el-button>
            </el-tooltip>
        </div>
        <div class="header">
            <h1 class="title">
                <a class="main-title" href="https://github.com/MarSeventh/CloudFlare-ImgBed" target="_blank">
                    {{ ownerName }}
                </a>
            </h1>
        </div>
        <UploadForm 
            :selectedUrlForm="selectedUrlForm" 
            :customerCompress="customerCompress" 
            :compressQuality="compressQuality"
            :compressBar="compressBar"
            :serverCompress="serverCompress"
            :uploadChannel="uploadChannel"
            class="upload"
        />
        <el-dialog 
            title="选择复制链接格式" 
            v-model="showUrlDialog" 
            :width="dialogWidth" 
            :show-close="false"
            :bg-color="backgroundColor"
        >
            <el-radio-group v-model="selectedUrlForm" @change="changeUrlForm">
                <el-radio value="url">原始链接</el-radio>
                <el-radio value="md">MarkDown</el-radio>
                <el-radio value="html">HTML</el-radio>
                <el-radio value="ubb">BBCode</el-radio>
            </el-radio-group>
            <div class="dialog-action">
                <el-button type="primary" @click="showUrlDialog = false">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog 
            title="上传设置" 
            v-model="showCompressDialog" 
            :width="dialogWidth" 
            :show-close="false"
            :bg-color="backgroundColor"
        >
            <el-form label-width="25%">
                <p style="font-size: medium; font-weight: bold">上传渠道</p>
                <el-form-item label="选择上传渠道">
                    <el-radio-group v-model="uploadChannel">
                        <el-radio label="telegram">Telegram</el-radio>
                        <el-radio label="cfr2">Cloudflare R2</el-radio>
                    </el-radio-group>
                </el-form-item>
                <p style="font-size: medium; font-weight: bold">客户端压缩</p>
                <el-form-item label="开启压缩">
                    <el-switch
                        v-model="customerCompress"
                        active-text="开启"
                        inactive-text="关闭"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                </el-form-item>
                <el-form-item label="压缩阈值" v-if="customerCompress">
                    <el-slider v-model="compressBar" :min="1" :max="20" show-input/>
                </el-form-item>
                <el-form-item label="压缩后大小" v-if="customerCompress">
                    <el-slider v-model="compressQuality" :min="1" :max="compressBar" show-input/>
                </el-form-item>
                <p style="font-size: medium; font-weight: bold" v-if="uploadChannel === 'telegram'">服务端压缩</p>
                <el-form-item label="开启压缩" v-if="uploadChannel === 'telegram'">
                    <el-switch
                        v-model="serverCompress"
                        active-text="开启"
                        inactive-text="关闭"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                </el-form-item>
                <p style="text-align: left;font-size: small;">
                    <br/>*Tips: 
                    <br/>1.Telegram渠道和CloudFlare R2渠道配置方式不同，请根据文档分别配置后使用
                    <br/>2.压缩设置仅针对图片文件，单位为MB
                    <br/>3.客户端压缩指上传前压缩，服务端压缩仅作用于Telegram渠道
                    <br/>4.若图片大小>10MB，或压缩后图片大小>10MB，服务端压缩将自动效
                    <br/>5.若图片大小>20MB，将自动进行客户端压缩
                    <br/>6.若想要存储的图片和原图完全一致，可以将两个压缩设置均设置为关闭
                    <br/>7.若上传分辨率过大、透明背景等图片，建议关闭服务端压缩，否则可能出现未知问题
                </p>
                <div class="dialog-action">
                    <el-button type="primary" @click="showCompressDialog = false">确定</el-button>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog 
            title="主题设置" 
            v-model="showThemeDialog" 
            :width="dialogWidth" 
            :show-close="false"
            :bg-color="backgroundColor"
        >
            <div class="theme-settings">
                <el-color-picker
                    v-model="themeColor"
                    size="large"
                    :predefine="predefineColors"
                    @change="handleThemeChange"
                />
                <el-slider
                    v-model="opacity"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    :show-tooltip="false"
                    style="width: 200px"
                    @change="handleOpacityChange"
                />
                <el-switch
                    v-model="isDarkMode"
                    active-text="暗色"
                    inactive-text="明亮"
                    @change="handleDarkModeChange"
                />
            </div>
            <div class="dialog-action">
                <el-button type="primary" @click="showThemeDialog = false">确定</el-button>
            </div>
        </el-dialog>
    </div>
    <Footer class="footer"/>
    </div>
</template>

<script>
import UploadForm from '@/components/UploadForm.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
import cookies from 'vue-cookies'
import { mapGetters } from 'vuex'

export default {
    name: 'UploadHome',
    data() {
        return {
            selectedUrlForm: ref(''),
            showUrlDialog: false,
            bingWallPaperIndex: 0,
            customWallPaperIndex: 0,
            showCompressDialog: false,
            customerCompress: true, //上传前压缩
            compressQuality: 4, //压缩后大小
            compressBar: 5, //压缩阈值
            serverCompress: true, //服务器端压缩
            uploadChannel: 'telegram', //上传渠道
            predefineColors: [
                '#409EFF',
                '#67C23A',
                '#E6A23C',
                '#F56C6C',
                '#909399'
            ],
            opacity: 0.7, // 默认透明度
            showThemeDialog: false, // 添加对话框显示状态
            isDarkMode: false,
        }
    },
    watch: {
        customerCompress(val) {
            this.updateCompressConfig('customerCompress', val)
        },
        compressQuality(val) {
            this.updateCompressConfig('compressQuality', val)
        },
        compressBar(val) {
            this.updateCompressConfig('compressBar', val)
        },
        serverCompress(val) {
            this.updateCompressConfig('serverCompress', val)
        },
        uploadChannel(val) {
            this.updateStoreUploadChannel(val)
        }
    },
    computed: {
        ...mapGetters(['userConfig', 'bingWallPapers', 'uploadCopyUrlForm', 'compressConfig', 'storeUploadChannel', 'themeColor', 'componentOpacity']),
        ownerName() {
            return this.userConfig?.ownerName || 'imghub'
        },
        logoUrl() {
            return this.userConfig?.logoUrl || require('../assets/logo.png')
        },
        bkInterval() {
            return this.userConfig?.bkInterval || 3000
        },
        bkOpacity() {
            return this.userConfig?.bkOpacity || 1
        },
        dialogWidth() {
            return window.innerWidth > 768 ? '40%' : '80%'
        },
        disableTooltip() {
            return window.innerWidth < 768
        },
        backgroundColor() {
            return this.isDarkMode ? 
                `rgba(30, 30, 30, ${this.componentOpacity})` : 
                `rgba(255, 255, 255, ${this.componentOpacity})`
        }
    },
    mounted() {
        const bg1 = document.getElementById('bg1')
        const bg2 = document.getElementById('bg2')
        if (this.userConfig?.uploadBkImg === 'bing') {
            //bing壁纸轮播
            this.$store.dispatch('fetchBingWallPapers').then(() => {
                bg1.src = this.bingWallPapers[this.bingWallPaperIndex]?.url
                bg1.onload = () => {
                    bg1.style.opacity = this.bkOpacity
                }
                setInterval(() => {
                    //如果bing壁纸组为空，跳过
                    let curBg = bg1.style.opacity != 0 ? bg1 : bg2
                    let nextBg = bg1.style.opacity != 0 ? bg2 : bg1
                    curBg.style.opacity = 0
                    this.bingWallPaperIndex = (this.bingWallPaperIndex + 1) % this.bingWallPapers.length
                    nextBg.src = this.bingWallPapers[this.bingWallPaperIndex]?.url
                    nextBg.onload = () => {
                        nextBg.style.opacity = this.bkOpacity
                    }
                }, this.bkInterval)
            })
        } else if (this.userConfig?.uploadBkImg instanceof Array && this.userConfig?.uploadBkImg?.length > 1) {
            //自定义壁纸组轮播
            bg1.src = this.userConfig.uploadBkImg[this.customWallPaperIndex]
            bg1.onload = () => {
                bg1.style.opacity = this.bkOpacity
            }
            setInterval(() => {
                let curBg = bg1.style.opacity != 0 ? bg1 : bg2
                let nextBg = bg1.style.opacity != 0 ? bg2 : bg1
                curBg.style.opacity = 0
                this.customWallPaperIndex = (this.customWallPaperIndex + 1) % this.userConfig.uploadBkImg.length
                nextBg.src = this.userConfig.uploadBkImg[this.customWallPaperIndex]
                nextBg.onload = () => {
                    nextBg.style.opacity = this.bkOpacity
                }
            }, this.bkInterval)
        } else if (this.userConfig?.uploadBkImg instanceof Array && this.userConfig?.uploadBkImg.length == 1) {
            //单张自定义壁纸
            bg1.src = this.userConfig.uploadBkImg[0]
            bg1.onload = () => {
                bg1.style.opacity = this.bkOpacity
            }
        } else {
            //默认壁纸
            bg1.src = require('@/assets/background.jpg')
            bg1.onload = () => {
                bg1.style.opacity = this.bkOpacity
            }
        }
        // 读取用户选择的链接格式
        this.selectedUrlForm = this.uploadCopyUrlForm || 'url'
        // 读取用户选择的压缩设置
        this.customerCompress = this.compressConfig.customerCompress
        this.compressQuality = this.compressConfig.compressQuality
        this.compressBar = this.compressConfig.compressBar
        this.serverCompress = this.compressConfig.serverCompress
        // 读取用户选择的上传渠道
        this.uploadChannel = this.storeUploadChannel
        this.opacity = this.$store.state.componentOpacity
        this.isDarkMode = this.$store.state.isDarkMode
    },
    components: {
        UploadForm,
        Footer
    },
    methods: {
        handleManage() {
            this.$router.push('/dashboard')
        },
        openUrlDialog() {
            this.showUrlDialog = true
        },
        handleLogout() {
            this.$router.push('/') 
            this.$message.success('已退出~')
        },
        changeUrlForm() {
            this.$store.commit('setUploadCopyUrlForm', this.selectedUrlForm)
        },
        openCompressDialog() {
            this.showCompressDialog = true
        },
        updateCompressConfig(key, value) {
            this.$store.commit('setCompressConfig', { key, value })
        },
        updateStoreUploadChannel(value) {
            this.$store.commit('setStoreUploadChannel', value)
        },
        handleThemeChange(color) {
            this.$store.commit('setThemeColor', color)
        },
        handleOpacityChange(value) {
            this.$store.commit('setComponentOpacity', value)
        },
        handleDarkModeChange(value) {
            this.$store.commit('setDarkMode', value)
        }
    }
}
</script>

<style scoped>
/* 定义顺时针和逆时针旋转动画 */
.rotate {
    animation: spin 2s ease-in-out; /* 动画时长为2秒，执行一次 */
}

/* 定义放大缩小动画 */
.scale {
    animation: scale 0.5s ease-in-out; /* 画时长为0.5秒，执行一次 */
}

/* 关键帧：先顺时针转，再逆时针旋转 */
@keyframes spin {
    0% {
        transform: rotate(0deg); /* 初始位置 */
    }
    50% {
        transform: rotate(360deg); /* 顺时针旋转一圈 */
    }
    100% {
        transform: rotate(0deg); /* 逆时针旋转回到初始位置 */
    }
}


/* 关键帧：旋转抖动 */
@keyframes rotate-shake {
    0% {
        transform: rotate(0deg); /* 初始位置 */
    }
    25% {
        transform: rotate(10deg); /* 顺时针旋转5度 */
    }
    50% {
        transform: rotate(0deg); /* 回到初始位置 */
    }
    75% {
        transform: rotate(-10deg); /* 逆针旋转5度 */
    }
    100% {
        transform: rotate(0deg); /* 回到初始位置 */
    }
}

/* 关键帧：左右抖动 */
@keyframes shake {
    0% {
        transform: translateX(0); /* 初始位置 */
    }
    25% {
        transform: translateX(5px); /* 左移5px */
    }
    50% {
        transform: translateX(0); /* 回到初始置 */
    }
    75% {
        transform: translateX(5px); /* 右移5px */
    }
    100% {
        transform: translateX(0); /* 回到初始位置 */
    }
}

/* 关键帧：放大缩小 */
@keyframes scale {
    0% {
        transform: scale(1); /* 初大小 */
    }
    25% {
        transform: scale(1.2); /* 放大20% */
    }
    50% {
        transform: scale(1); /* 回到初始大小 */
    }
    75% {
        transform: scale(1.2); /* 放大20% */
    }
    100% {
        transform: scale(1); /* 回到初始大小 */
    }
}

/* 非移动端时的图标动画样式 */
@media (min-width: 768px) {
    .compress-icon:hover {
        animation: scale 1s ease-in-out;
    }
    .config-icon:hover {
        animation: spin 2s ease-in-out;
    }
    .link-icon:hover {
        animation: rotate-shake 0.5s ease-in-out;
    }
    .sign-out-icon:hover {
        animation: shake 0.8s ease-in-out;
    }
}

.toolbar {
    position: fixed;
    bottom: 8vh;
    right: 1.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
}
.toolbar-button {
    border: none;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    margin-left: 0;
    background-color: v-bind('backgroundColor');
    backdrop-filter: blur(10px);
    color: v-bind('themeColor');
}
@media (min-width: 768px) {
    .toolbar-button:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
        background-color: v-bind('backgroundColor');
        opacity: 0.95;
    }
}
:deep(.el-dialog) {
    border-radius: 12px;
    background-color: v-bind('backgroundColor') !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border: 3px solid transparent;
}

:deep(.el-dialog:hover) {
    border-color: v-bind('themeColor');
}

:deep(.el-dialog__title) {
    color: v-bind('isDarkMode ? "#ffffff" : "#000000"');
    opacity: 1 !important;
}

:deep(.el-radio__label) {
    color: v-bind('textColor');
}

:deep(.el-form-item__label) {
    color: v-bind('textColor');
}

:deep(.el-text) {
    color: v-bind('textColor');
}

:deep(.el-switch__label) {
    color: v-bind('textColor');
}

.dialog-action {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    margin-top: 2vh;
    color: blanchedalmond;
    user-select: none;
    text-decoration: none;
}
.main-title {
    color: v-bind('themeColor');
    text-decoration: none;
}
.logo {
    height: 90px;
    width: 90px;
    margin-right: 5px;
    border: 3px solid transparent;
    border-radius: 15px;
}
.title {
    font-size: 2.5em;
    font-weight: 700;
    font-family: 'Noto Sans SC', sans-serif;
}
.upload-home {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 94vh;
    padding-top: 2vh;
}
.upload {
    margin-bottom: 5px;
}
.footer {
    height: 6vh;
}
.background-image1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0;
    transition: all 1s ease-in-out;
}
.background-image2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0;
    transition: all 1s ease-in-out;
}
.toolbar-theme {
    margin-bottom: 10px;
    padding: 15px 10px;
    background-color: rgba(255, 255, 255, v-bind('componentOpacity'));
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.toolbar-theme:hover {
    border-color: v-bind('themeColor');
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
    background-color: rgba(255, 255, 255, 0.9);
}

.toolbar-theme :deep(.el-color-picker__trigger) {
    border: none;
    width: 24px;
    height: 24px;
    padding: 2px;
}

.toolbar-theme :deep(.el-slider__runway) {
    background-color: #e4e7ed;
    height: 4px;
    position: relative;
}

.toolbar-theme :deep(.el-slider__runway)::before {
    content: '';
    position: absolute;
    left: -10px;
    right: -10px;
    top: 0;
    bottom: 0;
    cursor: pointer;
}

.toolbar-theme :deep(.el-slider__bar) {
    background-color: v-bind('themeColor');
    height: 4px;
}

.toolbar-theme :deep(.el-slider__button-wrapper) {
    display: none;
}

.theme-color-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.theme-settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.theme-settings :deep(.el-slider__runway) {
    background-color: #e4e7ed;
    height: 4px;
    position: relative;
}

.theme-settings :deep(.el-slider__runway)::before {
    content: '';
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: 0;
    right: 0;
    cursor: pointer;
}

.theme-settings :deep(.el-slider__bar) {
    background-color: v-bind('themeColor');
    height: 4px;
}

.theme-settings :deep(.el-slider__button-wrapper) {
    display: none;
}

.corner-logo {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 100;
}

.logo {
    height: 90px;
    width: 90px;
    border: 3px solid transparent;
    border-radius: 15px;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    margin-top: 2vh;
    color: blanchedalmond;
    user-select: none;
    text-decoration: none;
}
</style>