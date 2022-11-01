# Vue购物商城项目(二)
@[TOC](文章目录)

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 前言
1.这里面包含了大量的、我的个人理解与看法;

2.这是一个购物商城项目,目前阶段牵扯到路由, 插槽, axios数据请求, 数据存储与使用;

3.这篇只牵扯数据请求(axios), 数据使用;

4.现在这个项目已经全部完成;

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 一、请求数据
思路是在network文件夹的request.js和home.js请求到所有组件的数据传递到Home.vue,拆分数据后再由集中在此的组件模板将对应数据传至各个组件;

在request.js中封装一个request函数构成request.js的主体部分,这个request函数会在home.js里调用并传入axios配置对象,request()在拿到配置对象后会将其与自身内部axios.create()里的baseURL等公用配置进行拼合组成一个完整的配置对象,如此一来request函数就可以从服务器请求到一份数据,返回给Home.js;
## request.js
全部代码:

```typescript
import axios from 'axios'

export function request(config) {
    //创建axios示例;
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //axios拦截器;
    //请求拦截
         instance.interceptors.request.use(config => {
            return config
        }, error => {
            console.log(error);
        })
        //
        instance.interceptors.response.use(response => {
            return response.data
        }, error => {
            console.log(error);
        }) 

    return instance(config);
}

```
部分代码,说说我的一些认识
```typescript
//此处为request.js
import axios from 'axios'
//引入axios;
export function request(config) {
//request()接收从home.js传入的config配置对象;
    const instance = axios.create({
        //创建axios实例instance,现在可以instance()传入配置来进行请求;
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })
    return instance(config);
    //向instance中传入config配置对象;
    //以供instance内部进行对配置对象的组合;
}

```
request()中声明了一个axios实例,实例instance中可以包括众多axios全局配置用于拼接url和完善配置对象,
[配置对象的可包含内容见此](https://blog.csdn.net/qq_52697994/article/details/118496726),您当然可以声明多个instance实例对象,来定制多套axios配置,以备您接下来所要进行的各种不同请求,向不同的instance实例对象传入您所需要的配置对象来组成合适的请求方法,请求不同的数据;
## home.js
home.js中通过给request函数传入不同的配置对象,构建了两个方法:getHomeMultidata()和getHomeGoods(),因为这俩方法内置了request,传参进去能拿到数据,所以后面会被Home.vue调用:
```typescript
//此处为home.js
import { request } from "./request"
//引入request.js里的request方法;
export function getHomeMultidata() {
//暴露getHomeMultidata();
    return request({
        url: '/home/multidata',
    })
    //向request传参一个配置对象config,把request请求到的数据返回
    //存储到getHomeMultidata()中
}

export function getHomeGoods(type, page) {
//暴露getHomeGoods();
//getHomeGoods需要从Home.vue中获取type和page两个参数(参数仅针对本接口,请依请求的数据内容来决定)
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
    //向request传参一个配置对象config,把request请求到的数据返回
    //存储到getHomeGoods()中
}
```
## Home.vue
所有的数据集中于此,然后被发往各个组件...
补全-template部分代码:

```html
<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :proto-type-value="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- scroll.vue里的$emit自定义事件scroll触发methods里的contentScroll事件 -->
      <!-- v-bind传值时不加":"也能传过去,但是会不管三七二十一的传送字符串类型; -->
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" />
      <good-list :goods="goods['pop'].list" />
      <!--把goodsList里props的goods绑定到此处,向goodsList传data()中请求到的goods;-->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- 需要监听组件的原生事件时,必须给对应的事件加.native,否则就用@事件(麻烦) -->
  </div>
</template>
```
在methods里声明函数HomeMultidata()和HomeGoods(),在这俩函数的内部,分别调用getHomeMultidata()和getHomeGoods()并且传参数给getHomeGoods,如此一来只需在合适的生命周期调用HomeMultidata()和HomeGoods()即可拿到来自request.js的数据:

```typescript
export default {
  name: "Home",
  components: {
    //注册的各种组件巴拉巴拉...
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  created() {  //请求数据的话在mounte和create周期都是可以的. 
    //页面create完成, 马上就调用getHomeMultidata()请求数据;
    //生命周期函数里只调用方法,尽量不把方法写进去, 也不要写一些奇怪的东西...
    this.HomeMultidata();
    this.HomeGoods("pop");
    this.HomeGoods("new");
    this.HomeGoods("sell");
    //这里的"pop","new","sell"是data里的;
    //this:当前的组件对象;
    //this必须写,为了调用到methods里的getHomeMultidata();
  },
  methods: {
    HomeMultidata() {
      getHomeMultidata().then((response) => {
        this.banners = response.data.banner;
        this.recommends = response.data.recommend.list;
        //这段数据里需要的部分被从数据里取出来传到data()的banners和recommends两个数组里;
        //response是一个局部变量,在函数执行完就被销毁;
        //我们该马上取出需要的数据放到banners和recommends里;
      });
    },
    HomeGoods(type) {
      const page = this.goods[type].page + 1;
      //在此处理生成每次调用都不同的参数page,传给getHomeGoods();  
      //以保证请求到的数据是逐层递进而不是每次相同;
      getHomeGoods(type, page).then((response) => {
        this.goods[type].list.push(...response.data.list);
        //解析数组response.data.list，取出里面的数组元素,
        //push入this.goods[type].list里保存下来;
        this.goods[type].page += 1;
      });
    },
```

# 二、使用数据
现在我们拿到了数据,应该用了;
来自getHomeMultidata()的recommends和banners都在data()里
啊好吧来自getHomeGoods()的数据也被放到data()的good类的数组里了,这样看来所有的数据就是都在data里了;

```html
<!--突出下重点吧,我把大部分不往组件分发数据的代码都注释了 -->
<template>
  <div id="home" class="wrapper">
  <!--
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :proto-type-value="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      //scroll.vue里的$emit自定义事件scroll触发methods里的contentScroll事件
      //v-bind传值时不加":"也能传过去,但是会不管三七二十一的传送字符串类型; -->
      <recommend-view :recommends="recommends" />
 <!-- 
      <feature-view />
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" />
       -->
      <good-list :goods="goods['pop'].list" />
      //把goodsList里props的goods绑定到此处,
      //向goodsList传data()中请求到的goods;
 <!--   </scroll> -->
 <!-- 
      <back-top @click.native="backClick" v-show="isShowBackTop" />
   -->
      //需要监听组件的原生事件时,必须给对应的事件加.native,否则就用@事件(麻烦)
  </div>
</template>
```
好的,那么我们来看看RecommendView和GoodList是怎么接收数据的:
因为使用了v-for,你可以看到现在没有数据,RecommendView顶部商品推荐的DOM元素没有生成:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210717202519411.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzUyNjk3OTk0,size_16,color_FFFFFF,t_70#pic_center)


```html
<!-- RecommendView顶部商品推荐 -->
<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>
```
```typescript
//RecommendView
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      //限制:传入值必须为数组类型;
      default() {
        return [];
      },
      //默认值:空数组;
    },
  },
};
```
效果如下:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210717202755646.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzUyNjk3OTk0,size_16,color_FFFFFF,t_70#pic_center)

再看GoodList这边, 因为没有数据不知道该生成多少个GoodListItem,没有生成;
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210717202620122.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzUyNjk3OTk0,size_16,color_FFFFFF,t_70#pic_center)


```html
<!-- GoodList -->
<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods-item="item" />
    <!-- 把GoodsListItem里props的goodsItem绑定到这里,
    使其能拿到GoodsList的props里goods的值,
    而且是以goods的单个数组元素的形式拿过去;  -->
  </div>
</template>
```
```typescript
//GoodList
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      //限制:传入值必须为数组类型;
      default() {
        return [];
      },
      //默认值:空数组;
    },
  },
};
```
效果如下:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210717202250409.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzUyNjk3OTk0,size_16,color_FFFFFF,t_70#pic_center)

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">


# 总结
第一个拿来起手的Vue项目,前面说到我现在已经做完了(眼: 明白了 手: 啥?)但还是打算吃的透一点,现在开始找其他项目做了,目前打算找一个基于element-ui的,届时我也会在博客把我的看法分享给大家:)

第三篇会是这个项目的最后一篇文了,打算把下拉加载(再请求)的部分和better-scroll的bug改进做完,您要是有兴趣,可以再来看看.