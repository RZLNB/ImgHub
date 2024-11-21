# imghub

### 本仓库是[MarSeventh/CloudFlare-ImgBed](https://github.com/MarSeventh/CloudFlare-ImgBed)的项目前端，详细介绍及部署方式请移步该仓库。
### 是对原前端[MarSeventh/Sanyue-ImgHub](https://github.com/MarSeventh/Sanyue-ImgHub)进行的diy

## 效果

![image](https://github.com/user-attachments/assets/23ab84f3-85a8-41c4-b5ae-70ff92ef4797)


## 新增功能

- 主题定制
  - 支持自定义主题色
  - 支持明暗模式切换
  - 支持组件透明度调整
  - 所有设置自动保存
- 界面优化
  - 统一的玻璃拟态风格
  - 动态主题色跟随
  - 优化动画效果


## Deployment

如果要在**完整项目基础上使用该前端**，只需要三步（**前提是你需要有基本的`git`、`nodejs`等工具的使用能力**）：

1. 将该项目拉到本地，`npm install`，修改环境变量`.env`中的`VUE_APP_SITE_URL`为你自己图床的URL
2. `npm run build`，进入打包好的`/dist`目录，将里面的所有内容复制到`CloudFlare-ImgBed`项目的根目录
3. 将修改好的`CloudFlare-ImgBed`项目部署上去即可，具体方法参照完整项目的文档

## Theme
![image](https://github.com/user-attachments/assets/2788fe9c-6c54-44a6-bb99-a37a11da85ec)

- 主题色：可以通过右侧工具栏的主题设置按钮进行调整
- 明暗模式：支持明亮和暗黑两种模式，可以在主题设置中切换
- 透明度：可以调整所有半透明组件的透明度
- 所有设置都会被保存，刷新页面后依然生效

## TIPS

**如果觉得项目不错希望您能给个免费的star✨✨✨，非常感谢！**

## Credits

感谢原项目作者 [MarSeventh](https://github.com/MarSeventh)
