
@[TOC](文章目录)

---

# 前言
今天把网站搬到新服务器上了...
然后出了一堆乱子, 其实主要还是忘记换接口, 和后端数据库连接对不上的问题, 刚解决完.
解决的过程里我试了各种方法, 初期没找到正确的原因, 错误的认为是跨域的问题, 想着反正早晚也要搞跨域, 今天刚好有个练手的机会, 练练得了...


---

# 一、vue.config.js
把这段直接放到 module.exports = {} 里;

target: 写后端接口的前缀(要能作为axios的baseURL);

secure:如果target没有SSL协议即不是https打头的话, 就填false;

pathRewrite: 就这样吧, 别动她, 看过不少proxy, 每个的pathRewrite都不一样什么写法都有, 一试就翻车, 但是这个肯定能用.

```javascript
    devServer: {
        proxy: {
            '/api': {
                target: 'http://x.xxx.xx.xxx:xxxx/',  //请求对象
                ws: true,//代理websocked
                changeOrigin: true,
                secure: false, //target是否为https接口
                pathRewrite: {
                    '^/api': ''  //更改请求URL
                }
            }
        }
    }
```

---

# 二、请求的改造
这样, 请求的url会在原本的基础上插入"/api"; 
```javascript
import axios from "axios";
axios.defaults.baseURL = "/api";

axios
  .post("/admin/insertComments", {})
    .then(() => {});
//等同于写了下面
axios
  .post("http://xxx.xxx.xx.xxx:3000/api/admin/insertComments", {})
    .then(() => {});
```
如果请求仍旧报错, 并且请求URL上已经出现了"/api", 那么大概率不是跨域未生效的问题.

# 总结
明天补全这样解决跨域的原理吧...