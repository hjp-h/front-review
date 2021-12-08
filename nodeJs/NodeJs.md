## NodeJs重点

第7集没看

### 1. 邂逅NodeJs

#### 1.1 浏览器的内核

![image-20210510155256877](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210510155256877.png)

#### 1.2浏览器是怎么渲染出页面的

![image-20210510155407575](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210510155407575.png)

#### 1.3 JS的运行机制

### 2.nvm-windows版本

#### 	2.1什么是nvm

​		nvm是node version manager,node 版本管理工具，可以管理你电脑上多个不同版本的node,可以随意切换

#### 	2.2下载及安装

1. github搜索node-windows,找到[Download the latest installer](https://github.com/coreybutler/nvm/releases)下载相应的安装包（setup.zip）。

2. 注意！！！安装过程中选择node的路径是你之前下载node的文件路径

3. 设置镜像，加快下载速度

   将下面的两个复制到settings.txt中

   node_mirror: https://npm.taobao.org/mirrors/node/
   npm_mirror: https://npm.taobao.org/mirrors/npm/

4. 使用

   ```shell
   1.查看里面有哪些node版本
     nvm list
   2.使用其中的一个版本
     nvm use 版本号
   3.下载node
     nvm install 版本号
   4.卸载其中一个版本的node
     nvm uninstall 版本号
   ```

   

### 3.事件循环

- 什么是事件循环？

  ```shell
  我们编写的JS和浏览器或者Node之间的一个桥梁
  ```

- JS代码执行过程

  ```shell
  1.JS代码执行的过程实际上就是将代码放入函数的一个调用栈，栈就是先入先出的，当轮到一个函数执行的时候，就把他压入栈，执行完就弹出栈。
  ```

- 浏览器的事件循环

  ```shell
  1.当出现了类似于settimeout的异步函数，里面包含了回调函数，当执行到settimeout的时候，它会马上压入栈执行，然后弹出栈，并不会阻塞后面的线程（为什么？）。
  
  2.因为浏览器的事件循环，settimeout调用了web api，使得回调函数被浏览器保存起来（红黑树），等到合适的时机，浏览器将回调函数放入事件队列里面，然后事件循环机制从队列中依次取出回调函数，放入函数栈中执行
  ```

- 宏任务和微任务(两个队列)

  ```shell
  1. 每一个回调函数就是一个任务
  2. 宏任务放在宏任务队列(ajax,settimeout)
  3. 微任务放在微任务队列（promise.then）
  4. 浏览器优先执行微任务队列，执行完微任务队列才去执行宏任务队列，执行宏任务的过程中，还回去看微任务队列里面是否还有东西。
  ```

- Node架构分析

  ![image-20210601102312036](D:\typoraPic\image-20210601102312036.png)

  ```shell
  1.当我们的应用程序（例如一个js文件）编写了一些代码去操作系统中的一些东西的时候，比如说是文件系统，看似是JS直接帮我们完成的，实际上不是的。
  
  2.JS是基于Node的，当我们编写了一大堆的js代码，通过V8引擎进行翻译，再交给我们的libuv(一个专注于异步IO的库)，它将对操作系统进行一个系统调用（例如调用文件系统），最终达到我们的目的。
  
  3.libuv中有一个工作线程，它会将回调函数通过事件循环放入事件队列，等到一定的时间，再把回调函数传给JS的函数栈中执行。
  ```

  

- Node中的事件循环

  ```shell
  1.阶段
  （1）定时器（Timers）:本阶段执行已经被setTimeout()和setInterval()调度的回调函数
  
  （2）待定回调（Pending Callback）:对某些系统操作（如TCP错误类型）执行回调
  
  （3）idle,prepare:仅系统内部使用
  
  （4）轮询（poll）:检索新的I/O事件，执行与I/O相关的回调。
  
  （5）检测：setImmediate()回调函数在这里执行
  
  （6）关闭回调函数
  ```

- Node的宏任务和微任务

  ```shell
  （1）我们会发现从一次事件循环的Tick来说，Node的事件循环更复杂，它也分为微任务和宏任务：
   	宏任务（macrotask）：setTimeout、setInterval、IO事件、setImmediate、close事件；
   	微任务（microtask）：Promise的then回调、process.nextTick、queueMicrotask；
   	
  （2）但是，Node中的事件循环不只是 微任务队列和 宏任务队列：
   微任务队列：
  	next tick queue：process.nextTick；（nextTick队列的东西最先执行）
  	other queue：Promise的then回调、queueMicrotask；
   宏任务队列：
  	timer queue：setTimeout、setInterval；
  	poll queue：IO事件；
  	check queue：setImmediate；
   close queue：close事件；
   
   （3）setImmediate 和 settimeout(()=>{},0)执行顺序的问题
   	有时setImmediate先，有时settimeout快，这主要取决于settimeout的回调函数放入队列的时间长还是事件循环初始化的时间长，如果事件循环的初始化时间长，则settimeout执行快，否则，会进入check阶段，直接执行setImmediet的回调函数
  
  ```

### 4.Express

```shell
(1)  express()到底创建的是什么？
	导入的express其实是一个函数，createApplication,而这个函数返回的也是一个函数app

(2)为什么可以调用app.listen()的方法，启动服务器？
	从源码上看，app似乎没有listen这个属性，但是仔细看的话，有一句mixin(app,proto,false)的代码，也就是将proto的所有属性都加在了app上，使得app有了listen的属性，而app.listen()实际上是基于http的。
	listen实际上是http.createServer().listen(),而app就是一个回调函数作为参数传入给createServer()
	
(4)app.use()一个中间件的时候，发生了什么？
我们会发现无论是app.use还是app.methods都会注册一个主路由；
我们会发现app本质上会将所有的函数，交给这个主路由去处理的；

```

### 5.Koa

```shell
(1)为什么ctx.response.body = '' 和 ctx.body=''是一样的？
因为前者是后者的一个代理，当写成后者的形式时，会去实行前者

（2）为什么多个ctx.body = '' 不会报错？
这和express不一样，express中多个res.end()会报write after end,而koa不会，因为它源码中用了promise,只有最后一次res.body才有效。
```

### 6.项目目录结构

![image-20210610235045706](D:\typoraPic\image-20210610235045706.png)

### 7.登录

- 为什么需要token？

  ```shell
  1.因为http是个无状态的协议，即使你登录成功之后，要去访问服务器的资源，服务器端也会把你的这次请求当成一个独立的请求，与上次的登录成功的请求没有关系。服务器仍然会“不认识你”。因此需要一个登录凭证，来让服务器认识你。
  ```

- 什么是cookie

  ```shell
  1.类型：文本文件
  2.存储位置：用户本地终端
  3.作用：识别用户身份
  4.分类：内存cookie (没有设置过期时间，浏览器维护，随着浏览器的关闭而销毁，)
  	   硬盘cookie（设置了过期时间，保存在硬盘中，由用户手动删除，或者定期销毁）
  5.设置过期时间
  （1）expires: 设置的是Date.toUTCString()  固定的时间
   (2) max-age: 设置过期的秒钟  多久后cookie消失
   
  6.作用域：允许cookie发送到哪些url
    Domain 不设置的话(origin)，只能用于当前cookie的路径 （当前的主机名）
           例如：设置为path = Mozilla.org，就会包括子域名 a.Mozilla.org
           
    Path   例如：Path = /api/ 则/api/aaa bbb等等都会发送cookie
  ```

- 什么是session

  ```shell
  session是基于cookie的，但是cookie可能会被恶意篡改，session可以通过签名来防止恶意篡改，也是一种服务器与客户端之间的一种通信凭证
  ```

- cookie和session的缺点（对比token，为什么token好 ）

  ```shell
  1.cookie会被附加到每个http请求，这无形会增加了流量（事实上很多请求是不需要的）
  
  2.cookie是明文传输的，所以存在安全性的问题，容易被篡改
  
  3.cookie的大小被限制为4kb,面对一些复杂的需求是远远不够的
  
  4.对于浏览器除外的其他客户端，需要手动去设置cookie和session
  
  5.对于分布式系统和服务器集群中如何正确的解析session是个比较麻烦的问题
  
  --分布式系统（例如淘宝的用户管理系统，商品信息系统，订单管理系统等等，不同的系统间往往需要信息传递，那么如何正确解析不同系统间传送的session是个问题）
  
  --服务器集群（只有一个服务器的时候，难以承受客户端请求的压力，往往需要多个服务器来处理请求，用NGINX反向代理来判断当前那个服务器是处于空闲的状态，当处理 session的服务器不是颁发session的服务器时，那么如何正确解析不同服务器间传送的session是个问题）
  ```

- token

  ```shell
  1.token叫令牌，一种身份验证的凭证
  2.	JWT(JSON WEB TOKEN)
  ```

- 说说localStorage,session,cookie

  ```she
  共同点：
  1.他们本质上都是用来存储一些数据信息的，其中session，cookie都是用来作为服务器端和浏览器端的之间的通信凭证的，维护着服务器和客户端之间的一个状态（这个状态用于告知服务器，请求是否来自于同一个客户），localStorage仅仅只是将数据存储的本地
  
  不同点：
  1.存储的位置不同：
  （1）cookie将数据存储在客户端（浏览器），而session是将数据存储在服务器端，localStorage存储在本地。
  2.存储的数据类型不同：
  （1）cookie只能存储字符串类型，而session，localStorage可以存储任意类型的字符串。
  3.存储的大小不同
  （1）cookie大小限制在4kb,而session,localStorage则5M,或者更多
  4.有效期不同
  Cookie可以设置为长时间有效，而session在会话关闭时销毁。localStorage则长期存储在本地，除非自己手动清除。
  5.安全性
  cookie是明文传输的，不安全，容易被篡改，而session可以被加密后再传输
  联系：
  （1）session是用户登录之后创建的，服务器会给客户端返回sessionId,并且将它存储在客户端的cookie中，当用户下次发送请求时，会判断此域名下有没有cookie,有的话会自动将cookie发送给客户端，服务器端再根据这个sessionId来判断用户身份
  ```

  

### 8.koa-multer的大坑

1. 自定义上传文件的路径和文件名

   ```shell
   const storage = Multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, AVATAR_PATH)
     },
     filename: (req, file, cb) => {
       cb(null, nanoid.nanoid() + "_" + file.originalname + path.extname(file.originalname))
     }
   })
   
   const pictureUpload = Multer({
     storage
   });
   
   const storage1 = Multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, PICTURE_PATH)
     },
     filename: (req, file, cb) => {
       cb(null, nanoid.nanoid() + '_' + file.originalname + path.extname(file.originalname))
     }
   })
   const avatarUpload = Multer({
     storage1
   })
   const pictureHandler = pictureUpload.array('picture', 9)
   const avatarHandler = avatarUpload.single('avatar');
   
   module.exports = {
     avatarHandler,
     pictureHandler
   }
   
   !!!这段代码会导致avataMulter出现一些问题，会让ctx.req.file的filename为undefined，目前认为 Multer.diskStorage只能使用一次，以第一次为准。
   
   下面的写法可以使用很多次但是无法自定义
   const avatarUpload = Multer({
     dest:''
   })
   ```

2.解决

```shell
分到两个文件里面写
```

### 9.云服务器自动化部署

## 面试题

### 1.事件循环

1. 说说什么是事件循环

   ```
   JS中的任务分为同步任务和异步任务。
   同步任务是在主线程上的执行栈中进行的。
   在主线程外，有一个事件触发线程维护着任务队列，当异步任务有运行结果的时候会把事件回调放入任务队列之中，当主线程上的同步任务执行完之后，js就会把任务队列中的回调函数调入执行栈中执行。
   
   JS引擎线程只会执行执行栈中的事件，执行栈中的代码执行完毕，就会读取事件队列中的事件并添加到执行栈中继续执行，这样反反复复就是我们所谓的事件循环(Event Loop)
   
   异步任务又可以再一次分为宏任务和微任务，宏任务和微任务在不同的两个队列之中，宏任务在宏任务队列，微任务在微任务队列，在执行完同步任务之后，接着执行微任务队列中的任务，再去执行宏任务中的任务。
   
   微任务在DOM渲染前触发，宏任务在DOM渲染后触发。
   
   宏任务有setTimeout,setInterval,ajax,dom事件
   微任务有Promise,async/await
   ```
   
   

