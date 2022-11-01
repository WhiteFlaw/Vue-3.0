# Vue购物商城项目

@[TOC](文章目录)

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 前言
1.这里面包含了大量的、我的个人理解与看法;

2.这是一个购物商城项目,目前阶段牵扯到路由, 插槽, axios数据请求, 数据存储与使用;

3.这篇只牵扯路由配置, 组件插槽;

4.现在这个项目已经完成了一小部分,不过我还是打算把前面写的文件都记录一遍;

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 一、Cli4生成项目
略略略;
[使用Vue-cli4.5x快速搭建项目](https://blog.csdn.net/qq_52697994/article/details/117382460)
头铁,全用最新版了;
| 插件 | 版本 |
|--|--|
| Vue | ^3.0.0 |
| vue-router | ^4.0.0-0 |
| axios | ^0.21.1 |
| css-loader | ^3.6.0 |
| style-loader | ^1.1.3 |
文章阶段性同步, 插件部分目前就用到了这些;

# 二、路由配置
我想了一下,还是决定返回来先把路由写上,因为TabBarItem需要用到路由来判断高亮显示与否;

```typescript
//这是在index.js里;
import { createRouter, createWebHistory } from 'vue-router'
//cli4真的就只需要引入这俩了;
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('../views/classify/classify.vue')
  },
  {
    path: '/shoppingcar',
    name: 'shoppingcar',
    component: () => import('../views/shoppingcar/shoppingcar.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my/my.vue')
  }
]
/*我们一共有四个页面,需要四条路由; */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  /* 
  把路由表(就是上面的那个装着对象的数组)放在这里,
  在下面一起导出,供组件使用 
 */
})

export default router
/* 导出路由表 */
```
[Cli4.x路由配置详解](https://blog.csdn.net/qq_52697994/article/details/118055292)
# 三、tabBar制作
我想你可能见过那种固定定位,不会随着页面滚动的底部横条?
这部分共包括三个组件;

 1. TabBar
 2. TabBarItem
 3. MainTabBar

 TabBar和TabBarItem有插槽关系,TabBar有一个插槽, 在MainTabBar处可以传入所有的(4个)TabBarItem;
 
 每个TabBarItem有三个插槽,在MainTabBar处可以传入各个TabBarItem的内容;
 
我们先看TabBar和TabBarItem, 封装完这两个我们才能封装MainTabBar;
<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

## 1.TabBar组件
TabBar只有一个插槽和一些样式,这个插槽需要被传入四个TabBarItem(四个底部栏选项);
```typescript
//这是在src/components/common/tabbar/TabBar.vue里;
<template>
  <div id="tab-bar">
    <slot></slot>//插槽;
  </div>
</template>

<script>
</script>
//下面这个样式可以选择不看;
<style scoped>
#tab-bar {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.2);
}
</style>
```
<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

## 2.TabBarItem组件
考虑到我难以把说明对应到代码位置,下面的说明基本都写在代码注释里,如果你想要看某段代码的说明,请在这段代码下方寻找;

template标签用来写组件模板,在Cli4里,根元素不再只能有唯一一个,你可以在里面写多个根元素(不过下面这个还是只写了一个tab-bar-item);
```typescript
//这是在src/components/common/tabbar/TabBarItem.vue里;
<template>
  <div class="tab-bar-item">
    <div><slot name="item-icon"></slot></div>
    <div><slot name="item-icon-active"></slot></div>
    <div><slot name="item-text"></slot></div>
    /*
     这里全部采用ver2.6.0后的具名插槽,
     防止传入混乱导致的无法传入;
   */ 
  </div>
</template>
  /*
   我们的每个TabBarItem都由三个插槽组成:
   item-icon需要被传入未点击时的图标
   item-icon-active需要被传入点击时的高亮图标
   item-text需要被传入一个放入了文本的div;
 */
<script>
/* 为了不影响浏览,控制未触发图标和高亮图标切换的代码写在下面了 */
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  margin-left: 23px;
  text-align: center;
}
</style>
```
我们现在来完成TabBarItem图标点击高亮的功能,虽然图标还没传入,看不到效果;
<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

## 3.TabBarItem图标活跃高亮
思路是根据该TabBarItem对应的页面的路由是否活跃, 来控制变量isActive的布尔值, v-if和v-else根据isActive的布尔值, 决定是否采用新的文字样式和高亮图标(罢说了, 我拉上去补路由表了);

```typescript
//这还是在src/components/common/tabbar/TabBarItem.vue里;
<template>
  <div class="tab-bar-item">
    <div v-if="!isActive">
    <slot name="item-icon"></slot>
    </div>
    
    <div v-else>
    <slot name="item-icon-active"></slot>
    </div>
    
    <div :style="activeStyle">
    <slot name="item-text"></slot>
    </div>
    /*
     这个div已经绑定style属性到了activeStyle()方法,
     现在activeStyle返回的值会被直接添加进它的style属性里; 
   */
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
     /*
      MainTabBar传值限制:
      传入值类型:String;
      默认值:red; 
    */
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
     /*
      检索tabbaritem的$route.path属性,
      是否与这个tabbaritem对应的页面在路由表上对应的路径path相同,
      如果相同就说明用户现在在这个tabbaritem对应的页面,
      就该返回true来让activeStyle()返回高亮颜色给插槽item-text;
    */
     /*
       indexOf: 检索需要检索的字符串,
      第一个参数是目标字符串,
      第二个是开始检索的位置(整数,省略则从头开始检索) 
    */
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
      /*
       依据isActive()的返回值检索当前tab-bar-item是否处于活跃,
      如是则返回{ color: this.activeColor }否则返回空对象 
     */
     /*
      activeColor是注册在props中的属性,
      接收由MainTabBar传入的颜色传到这里,假设接收到的是天蓝,
      那么activeStyle()返回的就是:{ color: skyblue } 
    */
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  margin-left: 23px;
  text-align: center;
}

.active {
  color: rgba(20, 97, 241, 0.788);
}
</style>
```
<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 四、MainTabBar组件
不打算在项目里引入TabBar和TabBarItem就封装的彻底一点吧，到时候只引入MainTabBar就好了；

```typescript
//这是在src/components/content/mainTabBar/MainTabBar.vue里;
//这里的~assets是因为定义了别名,如果没有定义别名还是要中规中矩写...
//四个对tabbaritem的插槽传入,因为结构都相同,注释只在前两个;
<template>
  <tab-bar>
  /*从此处向下,到</tab-bar>截止,都是给TabBar的插槽传的内容 */
    <router-link to="/">
      <tab-bar-item activeColor="rgba(4, 39, 238, 0.856)">
      /*
        tab-bar-item:从此处开始到首个</tab-bar-item>,
        是给第一个tabbaritem的插槽传入的内容;
     */
      /*
        activeColor:其值传给TabBarItem组件中的props,
        必须是一个颜色值;
     */
        <template v-slot:item-icon>
          <img src="~assets/img/icon/Brightness.png" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/Brightness2.png" />
        </template>
        <template v-slot:item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>
    </router-link>

 /* 我们需要分别给四个tabbaritem插槽传内容 */
 
    <router-link to="/classify">
      <tab-bar-item activeColor="rgba(4, 39, 238, 0.856)">
        <template v-slot:item-icon>
          <img src="~assets/img/icon/Gear.png" />
        </template>
        /*
         还记得在做TabBarItem时的具名插槽吗?
         你可以在这里规定这份template里的html要传到哪个插槽了,
         嗯,用v-slot对应name属性; 
        */
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/Gear2.png" />
        </template>
        <template v-slot:item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>
    </router-link>

    <router-link to="/shoppingcar">
      <tab-bar-item activeColor="rgba(4, 39, 238, 0.856)">
        <template v-slot:item-icon>
          <img src="~assets/img/icon/unlock.png" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/Lock.png" />
        </template>
        <template v-slot:item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>
    </router-link>

    <router-link to="/my">
      <tab-bar-item activeColor="rgba(4, 39, 238, 0.856)">
        <template v-slot:item-icon>
          <img src="~assets/img/icon/Task.png" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/icon/Task2.png" />
        </template>
        <template v-slot:item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </router-link>
  </tab-bar>
  <router-view />
  /*
   把router-view写在template里,
   不然就等着tabbar跑顶部去吧...
 */
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem,
  },
};
  /* 
   引入TabBar和TabBarItem,注册一下以备使用; 
 */
</script>

<style>
/* 
你可以在这里写文字的样式,
router-link标签默认会被渲染成<a>标签; 
*/
</style>
```
## 五、Icon路径
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210703102957444.jpg#pic_center)

# 总结
以上是我据本阶段的学习得出的一些经验与心得，如果帮到了您，在下十分荣幸；若是您发现了不足，您可以在评论区指出, 我会感谢您的指点的!