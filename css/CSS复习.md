## 																						CSS + HTML复习

### 一、W3C标准

- w3c(万维网联盟)

  ![image-20210309215659286](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210309215659286.png)

  ![image-20210309215736617](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210309215736617.png)

### 二、盒子模型

组成

- 边框（*border-width,border-style(solid,dashed,dotted),border-color*）

  ```css
   .border{
              width:100px;
              height:100px;
              border:1px solid red;
              border-collapse: collapse;/*把相邻的边框合并*/
          }
  
  ```

  注意：border会改变盒子的大小，外面变大

- 外边距 

  ```css
  margin:0 auto;
  ```

  - 外边距的塌陷问题：

    ```css
    .father{
                width:200px;
                height:200px;
                background-color: red;
                margin-top: 30px;
            }
    .son{
        width:100px;
        height:100px;
        background-color: blue;
        margin-top: 20px;
    }
    /*子元素带着父元素下移*/
    <div class="father">
        <div class="son"></div>
    </div>
    ```

    解决：

    1. 给父元素加上边框
    2. 为父元素定义内边距
    3. 为父元素加上overflow:hidden
    4. 定位，浮动

- 内部边距 padding

  - 注意：padding会改变盒子的大小，里面被撑大

  - 当盒子本身没有设置width和height的时候，padding不会撑开盒子的大小。

  - 清除内外边距

    ```css
    *{
        margin:0;
        padding:0;
    }
    ```

  **注意：行内元素尽量只设置左右内外边距**

- 内容

### 三、快速代码

<img src="C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210310235932254.png" alt="image-20210310235932254" style="zoom:67%;" />



### 四、伪类选择器

- 经常用来选择第几个元素或者给某些选择器添加特殊的效果。

- 特征    **：**

- 种类：

  1. 链接伪类(使用LVHA的顺序    love hate)

     a:link(未访问过的链接), a:visted, a:hover, a:activited

     input :focus

  2. 结构伪类

     - ul li:first-child    ul li:last-child

     - ul li:nth-child(n)   选择 ul中的第n个li  
     -  ()里面可以是公式或者数字，关键字
       1. 公式 ul li:nth-child(n)   依次找到 0,1,2,3,4...的孩子
       2. 关键字  even偶数    odd奇数
     - ul li:nth-of-type() 使用起来和nth-child()一模一样 
     - 区别：
       1. nth-child会将所有的孩子进行一个编号，执行的时候会先匹配选择的编号，再去看选择的元素。
       2.  nth-of-type 会把所指定的元素进行一个排序，再匹配所选择的编号。

### 五、伪元素选择器

1. 为什么叫伪类选择器

   因为我们利用它创建了盒子，但是我们在html结构中却找不到它。

2. div::before  div::after

   before和after都会作为div的孩子，放在div里面的最前或者最后，**默认是行内元素，标签选择器和伪元素选择器的权重都为1**

   ```css
   div::after{
       /*content必须写*/
       content:'我'
   }
   ```

3. 注意点

   ```shell
   1.伪类元素是行内元素，直接设置宽和高是没有反应的，使用相对定位  absolute  或者给伪类元素加  display:block/inline-block 才能设置宽高
   
   2.要注意content中如果设置图片后，无法控制其大小
   将图片用作背景效果，通过background-size控制其大小，而且要注意先写background：url()再写background-size否则效果无法实现
   
   section ul a:nth-child(2):before {
       content: '';
       position: absolute;
       top: -69px;
       left: 12px;
       width: 4.5rem;
       height: 4.5rem;
       border-radius: .625rem;
       background: url() no-repeat;
       background-size: 4.5rem;
   }
   ```

   

### 六、块级元素和行内元素

- 块级元素

  1. 块级元素独占一行

  2. 可以设置宽、高，边距

  3. 宽度默认是父元素宽度的100%

  4. 是一个容器的盒子，里面可以放行内或者块级元素

     注意：文字类的元素里面不能放置块级元素，比如<p><div></div></p>

     转换成行内元素：display:inline

- 行内元素

  1. 高宽的设置是无效的

  2. 相邻的行内元素在同一行上

  3. 默认的宽度就是本身内容的宽度

  4. 行内元素只能容纳文本或其他行内元素

     转换块级或者行内块元素：display:inline-block;

### 七、CSS的三大特性

- 层叠性（覆盖），

- 继承性（text-,font-,line-,color）  line-height:1.5  (当前文字大小的1.5倍)

- 优先级

  ！important > style="" （1000）> id选择器 （100）> 类，伪类选择器 （10）> 元素选择器（1） > 继承/ 通配符*（0）

### 八、属性选择器

```css

input[type]{

}
/*选择type=text的input*/
input[type="text"]{

}
/*选择div中class属性为icon开头的*/
div[class^="icon"]{/*权重是11*/
}
```

注意：类选择器，伪类选择器，属性选择器的权重都是10

### 九、移动端flex布局

- 布局原理

  1. “弹性布局”，任何一个容器都可以指定为flex布局。
  2. 当我们的父盒子设置为flex布局后，子元素的**float,clear,vertical-align**属性将失效。
  3. flex => flex item

  总结：通过给父盒子添加flex属性，来控制子盒子的位置和排列方式。

- flex布局父项常见属性

  ![image-20210312235734406](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210312235734406.png)

  - flex-direction主轴（默认）：x轴，水平向右             侧轴：y轴，水平向下

  <img src="C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210313000439972.png" alt="image-20210313000439972" style="zoom: 80%;" />

  - justify-content

![image-20210313000844930](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210313000844930.png)

- flex-wrap

  flex布局中，默认的子元素是不换行的，如果装不下，会缩小子元素的宽度，放到父元素里面。

  默认：flex-wrap：no-wrap 不换行

  ​		   flex-wrap：wrap  换行

- align-items(用stretch的时候，不要给子元素高度)

  **它默认是按照侧轴来排列的，注意那个是主轴，侧轴**

![image-20210313002316248](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210313002316248.png)

- align-content

  ![image-20210315001452634](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210315001452634.png)

- flex-flow 复合属性  flex-flow:column wrap

**子元素flex属性：flex(份数) flex是一个符合属性包含flex-grow,flex-shrink,flx-basis，align-self(子元素自己的排列方式)，order(排列顺序，值越小越前面)**

### 十、多倍图

1. 物理像素比
   - pc端1px就是1像素，移动端 1px 开发像素 = 2个物理像素
   - 原因：移动端的视网膜技术，将物理像素进行一个挤压，使得单位内有更多的物理像素，显示更清晰。
2. 二倍图
   - 我们准备一个50x50像素(css像素)的图片，直接放在iphone8会放大2倍，100x100，就会模糊。
   - 解决：我们采取的是，放一个100x100的图片，缩小50x50,再放到移动端，就和原来的大小一致，就能清晰显示。
3. background-size  规定**背景**图像的尺寸
   - background-size：宽度 高度；
   - px,如果只写了一个参数（宽度），高度会等比例缩放
   - %,相对于父盒子的大小
   - content  图片的宽度或者高度等比例拉伸，当他们其中一个覆盖了父元素就不在拉伸，可能会有空白区域
   - cover  等比例拉伸，直到覆盖整个父元素

### 十一、BFC

1. 定义：块格式化上下文（Block Format Context）
2. 作用：BFC是一个独立的布局环境，其中的元素布局是不受外界影响的，并且在一个BFC中，块盒和行盒（行盒由一行中所有的内联元素组成）都会垂直的沿着父元素的边框排列。
3. 触发条件（任意）：
   - float的值不为none
   - position:absolue或fixed
   - display:flex、table-cell、inline-flex、inline-block、table-caption
   - overflow的值不是visible

### 十二、传统网页布局的三种方式

- 标准流（普通流）：按默认的方式排列

- 浮动：让元素脱离标准流（完成标准里不能完成的事情）

  1. 典型应用：让多个块级元素一行显示。

  2. 本质：先看左浮还是右浮，直到左边框或者右边框碰到另外一个浮动元素的边缘。

  3. 特性：

     1. **脱离标准流**，可以到任意的位置，**不保留原来的位置**
     2. 具有行内块的特性 （行内元素设置了float属性，就可以直接设置宽高）

  4. 注意：

     1. 经常和标准流父级元素搭配使用
     2. 浮动的元素只会对后面的标准流有影响（后面的标准流会占据浮动元素之前的位置），不会对前面的标准流有影响。

  5. 清除浮动：

     1. 为什么要清除浮动？

        因为有时候父级元素通常是标准流元素，但是我们不方便给他设置高度，而里面的子元素又需要浮动，所以由于子元素的脱标，父元素又没有设置高度，所以会导致父元素的高度不是我们想要的结果。

     2. 清除浮动的方式

        1. 给父元素添加高度，宽度
        2. 在浮动的元素后面添加一个div,设置clear:both
        3. 通过给父元素设置伪元素::hover{content:'',display:block,clear:both}
        4. overflow:hidden, overflow:auto

  

- 定位：

  1. 静止定位（static），相对定位(relative)，绝对定位(absolute)，粘性定位(sticky)，固定定位(fixed)，继承（inherit）
  2. 详述：
     1. 静止定位：标准流中的元素，分为块级元素和行内元素，块级元素独占一行，行内元素一行内显示。
     2. 相对定位：相对于元素原来的位置（正常位置）进行的定位。
     3. 绝对定位：脱离了标准流，相对于非static方式定位的第一个父元素进行定位。
     4. 固定定位：绝对定位的一种，不过是相对于浏览器窗口进行的定位。
     5. 粘性定位：一般用于滚动条，通过设置top,当距离顶部多少时，就固定住。
     6. 继承定位：继承父元素的定位方式。

###  十三、css动画

-  animation(动画)

- ![image-20210713174332046](D:\typoraPic\image-20210713174332046.png)

- ![image-20210713180057601](D:\typoraPic\image-20210713180057601.png)

  ```shell
  用于设置动画属性，它是一个简写的属性，包含六个属性
  ```

- transition（过渡）

  ```shell
  （1）概念
  	用于设置元素的样式过渡，和animation有着类似的效果，但是细节上有很大的不同。
  	transition只有开始和结束状态 animation精确到每一秒都可以有不同的动画，过程
  	transition需要触发条件 而animation不用
  （2）触发条件
  	:hover, :focus, :checked,媒体查询或JavaScript
   (3)demo
   #box {
        height:100px;
        width:100px;
        background: green;
        transition:transform 1s, ease-in 1s;
      }
      #box:hover{
        transform:rotate(180deg) scale(.5,.5)
      }
  ```

  ![image-20210625102636006](D:\typoraPic\image-20210625102636006.png)

- transform（变形）

  ```shell
  用于设置元素进行旋转，缩放，移动，倾斜，和设置样式的动画并没有什么关系。只是用来设置元素的外表
  ```

- translate（移动）

  ```shell
  translate是transform的一个属性，即移动。
  ```


### 十四、响应式布局

1. 相关单位

   ```shell
   vh,vw,em,rem,百分比
   ```

2. 相关布局

   ```shell
   flex 布局，grid布局
   ```

3. 相关技术

   ```shell
   媒体查询（@media screen and (max-width:600px)），响应式文字，图片(srcset ,sizes)	
   ```

   

### 十五、CSS3新特性

- 总结

  ```shell
  1.flex布局，Grid布局，媒体查询
  2.transition,animation
  3.选择器
  4.文字超出省略号
  （1）单行
      overflow:hidden
      white-space:nowrap
      text-overflow:ellipsis
  (2)多行
  	overflow:hidden
       white-space:nowrap
       text-overflow:ellipsis
  	-webkit-line-clamp: 2;
  
  ```

### 十六、html5新特性

```shell
拖拽释放(Drag and drop) API；
语义化更好的内容标签（header, nav, footer, aside, article, section）;
音频、视频API(audio, video);
画布(Canvas) API;
地理(Geolocation) API;
本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
sessionStorage 的数据在浏览器关闭后自动删除;
表单控件:calendar、date、time、email、url、search ;
新的技术webworker, websocket, Geolocation等；
```

### 十七、性能优化

1. 重绘和重排

   ```
   （1）什么是重绘和重排（回流）？
   
   	重绘：就是当页面中某些元素的样式发生变化的时候，但是不影响其在文档流中的正确位置，例如改变了color,浏览器会对元素进行重新的绘制，这个过程就是重绘。
   	
   	重排：当页面中某些元素的大小，所处文档流中的位置发生变化时，浏览器会重新渲染部分或者全部文档的过程，这个过程就是重排。
   	触发条件：页面的首次渲染，浏览器窗口大小的调节，元素的尺寸、位置、内容发生变化，激活css伪类
   	
   （2）两者的关系？
   	重排一定重绘，重绘不一定重排。
   	
   （3）如何避免重绘和重排
   	1.减少DOM操作，尽量在低层级的DOM结点进行操作。
   	2.不要使用table布局，一个小的改动会让整个table重新布局。
   	3.可以使用absolute,fixed,使元素脱离文档流，这样他们的变化就不会影响到其他的元素。
   	4.避免频繁地区操作dom,我们可以创建一个文档片段documentFragment,在它上面应用所有的DOM操作，再把它加入到文档中。
   	5.将多个DOM的读写操作放在一起，不要读写操作穿插，让浏览器一次重新渲染完，则得益于浏览器的渲染队列机制（浏览器会将所有的重绘重排操作放在一个队列中，当队列中的操作到达了一定的数量或者一定的时间间隔，浏览器会对队列进行批处理，这样就让多次的重绘重排变成一次重绘重排）
   	
   （4）补充：DocumentFragment是什么？
   	他是一个文档碎片，可以被作为轻量级的Document来使用，它和document最大的区别是，它不是DOM树的一部分，它的变化不会触发DOM树的重新渲染，我们将DocumentFragment插入文档中时，插入的不是它本身而是它的子结点。
   ```

2. 如何优化动画？

   ```shell
   （1）动画需要频繁地去操作DOM,我们可以将动画的position属性设置为absolute或fixed,将动画脱离文档流，不影响其他的元素。
   （2）requestAnimation,使我们的动画都在每一帧的开始执行，防止我们的动画掉帧
   ```

3. 图片懒（预）加载及文件打包压缩（页面渲染）

   1. 图片的懒加载和预加载

      ```
      (1)图片的懒加载
      	图片的懒加载也叫延迟加载，是我们需要用到的时候再进行加载。先将可视区域的图片加载下来，可视区域外的图片先不加载。一次性先不请求那么多的数据。
         原理：
         	先将可视区域外的图片的src值赋值为‘’，把真实的图片路径存放在data-origin中，等到图片滚动到可是区域的时候再将data-oringin的值赋值给src
      
      (2)图片的预加载
      	图片的预加载是将资源先一次性的加载到本地，后面在网页加载的时候直接从缓存中去取。
      ```
      
   2. SSR
   
   3. CSS放在头部，JS放在底部
   
      ```
        所有放在head标签里面的CSS和JS文件都会阻塞渲染（CSS不会阻塞dom解析）。CSS放在头部不会阻塞dom解析，也就是说html和css的解析同时的，但是得等到他们都准备好了以后，才可以渲染出我们最终的页面。（css tree + dom tree）
        但是js会阻塞dom的解析，如果将js放在头部，js的加载和解析时间过长，会导致页面长时间空白，带来不好的用户体验。（也可以将js放在头部，加上defer,async属性即可）
        defer和async的区别：
        （1）defer和async都是异步加载，即解析页面的同时，加载js文件。但是async加载完js文件后会马上执行，而defer会等到dom解析完只有才去执行js代码。
        （2）defer会按照script引入的顺序加载js,而async不会按照顺序。
      ```
   
   4. webpack打包压缩文件(gzip)
   
      ```
      ```
   
   5. 使用icon图标，精灵图，webp图片
   
      ```
      webp又是体现在更优的图像数据、压缩算法，能带来更小的图片的体积。
      ```
   
      
   
4. HTTP

   ```
   （1）我们提倡将多个小文件合并成一个大文件，然后再去下载这个大文件。因为下载多个文件会增加等待时间
   （2）使用HTTP2
       （1）解析速度快
       （2）多路复用，多个请求可以共用一个TCP连接，
            同一个请求和响应用一个流来表示，并有唯一的流ID标识。可以乱序发送，到达目的地之后再通过流ID重组。
       （3）首部压缩
       	将相同的首部弄成一个映射，（key:value）,我们只需要发送key和不相同的首部信息，到达服务器后，就去找key对应的映射，减少了首部的长度
       （4）优先级
       （5）流量控制
       （6）服务器推送
    
    （3）利用浏览器缓存
    	利用expires和cache-control的max-age字段来控制是强缓存还是协商缓存。
   ```

5. 使用CDN

   ```
   CDN，内容分发网络，是一组分布在不同地理位置的Web服务器，我们都知道当服务器离我们越远的时候，延迟越高。CDN就是为了解决这个问题的，在多个位置部署服务器，让用户离服务器更近，从而缩短请求的时间。
   
   没有CDN的情况下：（纯DNS域名解析）
     （1）本地DNS向根域名服务器、顶级域名服务器、权限服务器发出请求，拿到目标网站的IP地址,本地DNS将IP地址返回给浏览器。
     （2）浏览器向网站的IP地址发起请求并得到资源
     
   有CDN的情况下：
     （1）本地DNS向根域名服务器、顶级域名服务器、权限服务器发出请求，得到全局负载均衡系统（GSLB）的IP地址。
     （2）本地DNS再向GSLB发出请求，GSLB根据本地DNS的IP地址判断用户的位置，筛选出离用户比较近的本地负载均衡系统（SLB）,并且将该SLB的IP地址返回给本地DNS
     （3）本地的DNS将SLB的IP地址返回给浏览器
     （4）浏览器向SLB发出请求，SLB根据浏览器请求的资源和地址，选出最优的缓存服务器返回给浏览器。
     （5）浏览器再去访问该服务器，看看有没有所需的资源。
     （6）如果有，缓存服务器就将资源返回给浏览器，如果没有，缓存服务器就去源服务器请求资源 ，将资源缓存在本地并且发送给浏览器。
   ```

   


### 十八、文字超出省略

```css
(1)单行
.single-ellipsis{
	white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
(2)多行
.multiline-ellipsis{
    display:-webkit-box;
    white-space:nowrap;
    overflow:hidden;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
```

### 十九、可继承的属性

