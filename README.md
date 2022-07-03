# net-ease-cloud-music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Header 静态组件

```css
<!-- 标题如何去设置 -->
<h1 class="title">
	<a href="#">网易云音乐</a>
</h1>
<!-- 为了SEO -->
.title {
    width: 176px;
    height: 69px;
    background-color: aqua;
    background: url(./images/topbar.png) no-repeat 0 0;
    a {
        display: inline-block;
        width: 177px;
        height: 69px;
        text-indent: -9999px; // 只能给块级元素设置
    }
}
```



