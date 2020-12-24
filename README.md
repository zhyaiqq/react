## 前端代码检查与代码规范配置

eslint配置['https://blog.csdn.net/song_de/article/details/106102775']

本来想做代码规范的但是试了好久eslint一直不通过，先放弃了，后面在研究


## webpack配置alias简写文件路径
执行`npm run eject`命令，生成`config`和`scripts`文件夹，把webpack配置暴露出来，这样我们就可以修改自定义webpack

在`config/webpack.config.js`中间中配置alias
```
alias: {
  ...
  '@': path.resolve(__dirname, '../src')
}
```

上面这样配置之后还是不行，还需要在`tsconfig.json`中添加下面配置
```
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

## 首页Header头组件
`src/components/Header`文件里面封装了头部组件，里面用到了`useRouteMatch`这个钩子，匹配当前路径做一些判断，第一次用这个，详细见代码


## 推荐页中轮播组件TopBanner
`src\pages\Discover\child-pages\recommend\components\top-banners`文件中存在一个问题：调用ant ui的轮播图切换的方法，由于使用的typescript，一直找不到`next` `pre`方法（在看到别人写法后，已解决）

这里可以深入去看看`forwardRef` `ForwardRefRenderFunction` `useImperativeHandle` `useRef`，后面自己尝试写一个子组件暴露一些方法，让父组件调用

## react使用本地图片注意
```
<img src="../../assets/images/mymusic.png" style={{width: '100%'}}/>
```
在我的音乐页面中`src\pages\Mine`写了上面这一段代码，但是图片怎么都不显示，后来才知道create-react-app只支持public文件夹下的图片读取，src下的图片读取需要以下方式：
```
<img src={require('../../assets/images/mymusic.png')} style={{width: '100%'}}/>
```