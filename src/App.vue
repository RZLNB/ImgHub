<template>
  <router-view/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userConfig', 'themeColor'])
  },
  watch: {
    themeColor: {
      immediate: true,
      handler(newColor) {
        // 添加空值检查
        if (!newColor) return

        // 动态更新 Element Plus 主题色
        const style = document.documentElement.style
        style.setProperty('--el-color-primary', newColor)
        // 生成不同深度的主题色
        for (let i = 1; i <= 9; i++) {
          const color = this.getLightenColor(newColor, i * 0.1)
          style.setProperty(`--el-color-primary-light-${i}`, color)
        }
        // 设置深色主题色
        style.setProperty('--el-color-primary-dark-2', this.getDarkenColor(newColor, 0.2))
      }
    }
  },
  mounted() {
    this.setSiteTitle()
    this.setSiteIcon()
  },
  methods: {
    setSiteTitle() {
      document.title = this.userConfig?.siteTitle || 'imghub'
    },
    setSiteIcon() {
      const link = document.createElement('link')
      link.rel = 'icon'
      link.href = this.userConfig?.siteIcon || '/logo.png'
      document.head.appendChild(link)
    },
    // 获取更亮的颜色
    getLightenColor(color, level) {
      if (!color) return '#681780'
      let rgb = this.hexToRgb(color)
      rgb = rgb.map(c => Math.round(c + (255 - c) * level))
      return this.rgbToHex(rgb)
    },
    // 获取更暗的颜色
    getDarkenColor(color, level) {
      if (!color) return '#681780'
      let rgb = this.hexToRgb(color)
      rgb = rgb.map(c => Math.round(c * (1 - level)))
      return this.rgbToHex(rgb)
    },
    // 十六进制转RGB
    hexToRgb(hex) {
      if (!hex) return [104, 23, 128]
      hex = hex.replace('#', '')
      return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16)
      ]
    },
    // RGB转十六进制
    rgbToHex(rgb) {
      return '#' + rgb.map(c => {
        const hex = c.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
    }
  }
}
</script>

<style>
#app {
  font-family: 'HarmonyOS Sans SC', 'Source Han Sans CN', 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}
</style>
