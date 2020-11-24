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