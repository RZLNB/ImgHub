import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    userConfig: null,
    bingWallPapers: [],
    uploadCopyUrlForm: '',
    compressConfig: {
      customerCompress: true,
      compressQuality: 4,
      compressBar: 5,
      serverCompress: true,
    },
    storeUploadChannel: 'telegram',
    themeColor: '#681780',
    componentOpacity: 0.7,
    isDarkMode: false,
  },
  getters: {
    userConfig: state => state.userConfig,
    bingWallPapers: state => state.bingWallPapers,
    uploadCopyUrlForm: state => state.uploadCopyUrlForm,
    compressConfig: state => state.compressConfig,
    storeUploadChannel: state => state.storeUploadChannel,
    themeColor: state => state.themeColor,
    componentOpacity: state => state.componentOpacity,
    isDarkMode: state => state.isDarkMode,
  },
  mutations: {
    setUserConfig(state, userConfig) {
      state.userConfig = userConfig;
    },
    setBingWallPapers(state, bingWallPapers) {
      state.bingWallPapers = bingWallPapers;
    },
    setUploadCopyUrlForm(state, uploadCopyUrlForm) {
      state.uploadCopyUrlForm = uploadCopyUrlForm;
    },
    setCompressConfig(state, { key, value }) {
      state.compressConfig[key] = value;
    },
    setStoreUploadChannel(state, uploadChannel) {
      state.storeUploadChannel = uploadChannel;
    },
    setThemeColor(state, color) {
      state.themeColor = color || '#681780'
    },
    setComponentOpacity(state, opacity) {
      state.componentOpacity = opacity
    },
    setDarkMode(state, isDark) {
      state.isDarkMode = isDark;
    }
  },
  actions: {
    async fetchUserConfig({ commit }) {
      try {
        const response = await fetch('/userConfig');
        const userConfig = await response.json();
        commit('setUserConfig', userConfig);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBingWallPapers({ commit }) {
      try {
        const response = await fetch('/api/bing/wallpaper');
        const jsonResponse = await response.json();
        const wallpapers = jsonResponse.data;
        const bingWallPapers = wallpapers.map(wallpaper => {
          return {
            url: 'https://www.bing.com' + wallpaper.url,
          };
        }
        );
        //预加载图片，阻塞直到图片加载完成
        await Promise.all(bingWallPapers.map(wallpaper => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = wallpaper.url;
          });
        }));
        commit('setBingWallPapers', bingWallPapers);
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
