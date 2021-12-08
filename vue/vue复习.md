##  VUE常见面试知识梳理

### 1.  runTimeOnly和  runTimeCompiler的区别

1. runtimeCompiler

   ```vue
   new Vue({
   	el:"#app",
   	components:{App},
   	template:'<App/>'
   })
   ```

   ```
   我们将App传进template中，就会在vm.options中保存，然后被解析为AST,再被编译为render函数，再生成vDom,然后生成UI。
   
   template -> ast -> render -> vdom -> UI
   ```

   

2. runtimeOnly

   ```vue
   new Vue({
   	el:"#app",
   	render: h => h(App);
   })
   h:createElement("标签",{属性：值},[标签内容,createElement("嵌套")])
   ```

   ```
   render -> vdom -> UI
   问题：这个过程没有了template解析，但是我们的App里面仍然有template,那他是怎么被解析的呢？
   回答：是通过vue-template-complier解析，它在webpack配置中，打印出app发现会有一个render函数。
   ```

3. 区别

   ```
   （1）runtimeOnly解析编译的步骤少，性能高。
   （2）runtime代码量少，更轻，轻6kb.
   ```

### 2.vue的响应式原理

<img src="https://user-gold-cdn.xitu.io/2018/4/24/162f71d7977c8a3f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom:50%;" />

![image-20210725151526635](D:\typoraPic\image-20210725151526635.png)

```
vue的响应式原理：
（1）首先observer对data中的数据进行一个劫持，通过Object.defineProperty（get(),set()）来监听属性值的变化，data中的每一个属性都有一个dep（收集依赖）,这里涉及到了发布者和订阅者的模式，然后每一个用到data属性的地方都有一个订阅者（watcher）,这些watcher都会放到dep的数组中（收集依赖），当属性值改变的时候（在set方法中监听），dep会调用notify方法让每一个订阅者都进行数据和视图上的更新。

注意:这里有一个关系： 1个data的数据 -> 1个dep（发布者） -> 1..*个watcher（订阅者）

(2)complie对模板进行一个解析，生成ast,接着render函数，vdom,UI,watcher收到了更新的通知也会触发页面的重新渲染。
```



### 3.v-if和v-show的区别

1. 本质上都是用来控制元素的隐藏和显示。

2. 但是控制的方式不同：

   当条件为true的时候，v-if所控制的结点会出现在dom中，而条件为false的时候，它所控制的结点会在dom中进行一个删除，不适用于频繁的切换显示与隐藏，因为不断从文档中删除和添加结点是一件比较耗性能的事情，适用于一次的条件渲染。

   当条件为true或者false的时候，v-show所控制的结点都会出现在dom中，只是通过display:none来控制显示与隐藏，并不会把结点从文档中删了去，

3. 性能上：频繁操作切换和隐藏，v-if会频繁的操作dom，v-show首次渲染消耗性能多（条件为真为假都会去编译）。

4. 补充：

   ```
   display:none和visibil:hidden的区别：从视觉上，都是隐藏，但是display:none会连所占的空间都隐藏，而后者不会，display:none会导致重绘重排，而后者只会导致重绘。display:none的元素会在dom树但是不会在render树上，因此可以通过js获取结点。
   ```

### 4.computed和watch的区别

```
（1）computed 计算属性，它是根据data中的数据进行计算一个新的属性，并且将该属性挂载到vm上，而watch是监听一个已经挂载到vm上的数据，所以watch可以监听（computed,data,props）。
（2）computed是有缓存的，只有当依赖变化的时候才会计算新的值，否则走缓存，watch是当数据变化的时候调用执行函数。
（3）watch允许做一些异步操作，耗性能的操作
```

### 5.vue的单向数据流

```
（1）props是单项绑定的，当父组件的属性改变时，将传递给子组件，但是不能反过来（子组件不能改变父组件传递过来的属性），防止子组件无意修改了父组件的状态。
（2）当父组件更新时，子组件的所有prop都会更新为最新值
```

### 6.vue中组件间传递值的方式

```
（1）父传子：props
（2）子传父：通过事件传值$emit,通过ref(this.$refs.)，作用域插槽（v-slot:default="{user}"）
（3）任何组件间：（父子，兄弟，子孙）this.$Bus.$emit,this.$Bus.on,this.$Bus.off
（4）子孙组件：provide,inject
（5）vuex
```

### 7.vue的生命周期

```
(1)beforeCreate:数据、方法、dom都还没有
(2)create:有数据、方法
(3)beforeMounted：render函数已经被调用，生成html但是还没有挂载上。
(4)mounted：把编译好的html元素挂载到el上
(5)beforeUpdated：数据更新之前调用
(6)updated：数据更新完之后调用
(7)beforeDestroyed：在实例销毁前调用
(8)destroyed：做一些收尾性的工作，例如移除事件的监听。
```



### 8.Vue-router

1. vue路由的创建

   ```
   import VueRouter from "vue-router";
   import Vue from "vue";
   // 在vue中安装使用
   Vue.use(VueRouter);
    // 懒加载
   const Home = () => import('../components/Home');
   const About = () => import('../components/About');
   // 定制路由
   const routes = [
   {
   	path:"",
   	redirect:'/Home'
   },
   {
   	// 动态路由
   	path:'/Home/:id',
       component:Home,
       meta:{
       	title:"首页"
       },
       children:[
       {
       	path:"news",
       	compoent:News
       }
       ]
   }
   ];
   const router = new VueRouter({
   	routes,
   	// history模式
   	mode:'history'
   })；
   
   // 路由的全局导航守卫
   // 路由跳转前的钩子
   router.beforeEach((to,from,next) => {
   	// 在路由跳转前 可以做一些拦截动作，比如只有登录了才可以跳转
   });
   // 路由跳转后的钩子
   router.afterEach((to,from) => {
   
   })
   ```

2. 路由全局注册

   ```
   //main.js中
   import Vue from 'vue'
   import App from './App'
   import router from './router/index'
   
   Vue.config.productionTip = false
   //runtime compiler
   new Vue({
     el: '#app',
     router,
     render:h => h(App);
   })
   ```

3. 跳转视图的展示和参数传递与接收

   ```
   // App.vue中
   // keep-alive是保证路由切换时
   不被频繁地销毁与创建保存组件的状态 exclude某个组件除外
   （1）视图的展示
   <keep-alive exclude="Profile">
         <router-view></router-view>
   </keep-alive>
   
   （2）路由的跳转并携带参数
   // 链接跳转
   // params方式携带参数（刷新参数会丢失）
    <router-link :to="'/user/'+userId" tag="button" replace>用户</router-link> (地址栏也有参数)
    <router-link :to="{name:'/profile',params:{name:'HJP',height:175}}" tag="button" replace>档案</router-link> (地址栏无参数)
    
   // query方式携带参数（刷新参数不会丢失） 
    <router-link :to="{path:'/profile',query:{name:'HJP',height:175}}" tag="button" replace>档案</router-link>
    
   // 编程式跳转
   this.$router.push（可回退）  /   this.$router.replace（不可回退）
   
   //params
   this.$router.push("/user/"+id); (地址栏有参数)
   
   this.$router.push({
   	name:'Home',
   	params:{id:1}
   })
   
   // query
   this.$router.push({
   	path:'/Home',
   	query:{id:1}
   })
   ```

4. 参数的接收

   ```
   (1)query方式 ：this.$route.query.参数名
   (2)params方式：this.$route.params.参数名
   ```

5. 相关问题

   ```
   (1)keep-alive
   	当组件在keep-alive中时，组件的状态会被保存，不会频繁地销毁和创建。会有activated和deactivated这两个生命周期，前者表示当前路径是组件的路径时，后者表示路由离开当前组件路径时调用。
   
   (2)守卫
   	全局导航守卫：在定义路由时使用：router.beforeEach((to,from,next) => {}),router.afterEach((to,from) => {});
      	路由独享守卫：在定义路由路径时使用：beforeEnter:(from,next,to) => {},beforeLeave:(from,next) => {}
       
   (3)spa（不利于seo）
   	单页面富应用，整个网站只有一个页面。比如你输入一个a.com那么它就会去静态资源服务器把一套html+css+js（一整个网页）请求下来，返回给浏览器，浏览器渲染页面，执行js(主要是调用api接口，将请求到的数据渲染到页面中)，那么这个过程就是前端渲染的过程。
      
   (4)前端路由
   	在spa的条件下，我们的这一个大页面，里面有许多的小页面（home,about...）,其实也就是我们vue中的一个一个的组件，需要我们前端来维护url与页面之间的映射关系，也就是哪一个url对应哪一个页面，这就是前端路由。
   	核心：改变url,但是页面不进行整体的刷新（也就是不会向服务器重新发送请求）
   	
   (5)history模式和hash模式 （这两种方式都不会导致页面的刷新 location.hash,history.push）
   	hash模式就是在url后面携带的#号及后面的字符。由于 hash 值的变化不会导致浏览器向服务器发送请求，而且 hash 的改变会触发 hashchange 事件，浏览器的前进后退也能对其进行控制，所以在 H5 的 history 模式出现之前，基本都是使用 hash 模式来实现前端路由。	
   	history模式是html5中出现的，主要有histor.pushState,history.replaceState这两种方法，前者有历史记录（栈结构），后者没有历史记录
   	区别：hash模式的兼容性更好，但是就是比较丑陋，相同的hash值hash模式不会触发动作到历史栈中。
   ```

   

### 9.父子组件创建和销毁的过程

```
// 加载渲染过程
(1)父组件beforeCreate
(2)父组件created
(3)父组件beforeMounted
(4)子组件beforeCreated
(5)子组件created
(5)子组件beforeMounted
(6)子组件mounted
(8)父组件mounted

// 更新过程
(1)父 beforeUpdate
(2)子 beforeUpdate
(3)子 updated
(4)父 updated

// 销毁过程
(1)父 beforeDestroy
(2)子 beforeDestroy
(3)子 destroyed
(4)父 destroyed
```



### 10.vue中的data有时候是函数有时候是对象

```
(1)组件中的data是函数，函数返回的是一个对象，这样的目的是防止组件在被复用时会相互影响，因为如果是对象的话，对象是引用类型，每一次组件在被复用的时候，指向的data都是同一个内存地址。
(2)new Vue实例中data是个对象，是因为她不会被多次复用。
```



### 11.v-model 的原理

```
v-model是主要是用来在表单中进行数据双向绑定的，v-model的本质上就是一个语法糖，是@input（text和textarea是input,其他是个change） 和 :value 的一个语法糖，
```



### 12.vuex的使用

1. 导入vuex并且在vue中使用

   ```
   import Vue from 'vue'
   import Vuex from 'vuex'
   //1.使用vuex 底层会安装vuex
   Vue.use(Vuex);
   ```

2. 创建vuex对象

   ```
   const store = new Vuex.Store({});
   ```

   

3. vuex由5部分组成

   ```
   const store = new Vuex.Store({
   	state,
   	mutations,
   	actions,
   	getters,
   	modules:{
           a:moduleA  //a会自动加入到state中
       }
   });
   // 导出
   export default store;
   ```

   

   1. state:存放公共的变量

      ```
      state:{
              counter:0,
              students:[
                  {id: 1,name:'hjp',age:22},
                  {id: 2,name:'lqh',age:21},
                  {id: 3,name:'curry',age:12},
                  {id: 4,name:'kobe',age:24}
          
              ],
              info:{
                  name:'curry',
                  age:30
              }
      }
      ```

   2. mutations:直接修改state的数据,(接收两个参数，state和payload)

      ```
      mutations:{//用于修改状态
              incrementCount(state,payload){
                  console.log(payload);
                  state.counter += payload.count;
              },
              updateInfo(state){
                  state.info.name='HJP';
                  //注意！这样做不是响应式的     state.info[address] = '洛杉矶'
                  //将它加入响应式系统
                  Vue.set(state.info,'address','洛杉矶');
          
                  //同样这样也不是响应式的
                  //delete state.info.age;
                  //Vue.delete(state.info,'age');
                  
                  //以上是同步操作，接下来模仿异步操作
                  //我们发现mutations异步操作,浏览器无法跟踪
                  /*setTimeout(() =>{
                      state.info.name='HJP';
                  },1000);*/
              }
          }
      ```

   3. actions:进行一些异步操作，通过commit提交修改 参数(context，payload) 其中context包含state,commit

      ```
      actions:{
              aUpdateInfo(context,payload){//参数为一个上下文  在这里就是store
                  //这里容易直接修改info的值，context.state.info.name='HJP',这样实不可取的，绕过了mutations
                 return new Promise((resolve,reject) => {
                  setTimeout(() =>{
                      context.commit('updateInfo');//像在组件中一样，通过提交的方式来修改
                      console.log(payload);
                      resolve('1111')
                  },1000);
                 });
              }
          }
      ```

   4. getters:对state中的数据进行一些变换时使用

      ```
      getters:{//需要对状态进行变换后才使用
              powerCounter(state){
                  return state.counter*state.counter;
              },
              findAdult(state){
                  return state.students.filter((item,index,array) =>
                  item.age>10
              )}
          }
      ```

   5. modules：当vuex中存储的变量较多时，可以分模块存储

      ```
      const moduleA = {
          state:{
              name:'zhangsan'
          },
          mutations:{
              updateName(state,payload){
                  state.name = payload
              }
          },
          actions:{
              //将context进行解构
              aUpdatedName({state,commit,rootState}){
                  //context 中可以找到根的state,mutations
                  return new Promise((resolve,reject) => {
                      setTimeout(() => {
                          commit('updateName','wanwu');
                          resolve('修改名字完成');
                      },1000);
                  });
              }
          },
          getters:{
              fullName(state){
                  return state.name+'-HappyNewYear'
              },
          }
      }
      
      
      // 使用modules中的内容
      <h3>------modules中的内容------</h3>
      // 使用模块中的state时就要加上模块名，模块中的其他部分正常使用即可。
      <p>{{$store.state.a.name}}</p>
      <p>{{$store.getters.fullName}}</p>
      ```

4. 全局中注册

   ```
   // main.js中
   import Vue from 'vue'
   import App from './App'
   import store from './store'
   Vue.config.productionTip = false
   
   /* eslint-disable no-new */
   new Vue({
     el: '#app',
     store,
     render: h => h(App)
   })
   
   ```

5. 在组件中获取vuex的相关用法

   - 在组件中调用vuex中的方法

     ```
         //我们想让vuex中的getters直接在这里能用，我们就得引用mapGetters
         //两种语法
         //1.名字必须和getters中相同  此时传入的是一个数组
         ...mapGetters(['cartLength'])
         //2.名字自定义 此时传入的就是一个对象
         // ...mapGetters({
         //     cl:'cartLength'
         // })
         
         类似的有mapState,mapActions
     ```

### 13.MVVM

<img src="https://user-gold-cdn.xitu.io/2019/8/19/16ca75871ec53fba?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="1.png" style="zoom: 80%;" />

```
（1）mvvm是一个软件架构的设计模式，它的出现大大促进了前端开发和后端业务逻辑的分离。
（2）它由view,view-model,model组成。
	view是视图层，就是用户界面
	viewModel层,这一层是这个架构模式的核心，由前端人员生成和维护的视图数据层，它类似于一个中转站，将从后端请求来的数据进行处理，让数据变得更好的维护和使用，该层向上与视图层进行数据的双向绑定，向下与model层进行数据交互，起着一个承上启下的作用。它是前后端分离的关键。
	model层，，数据模型层，泛指后端的业务逻辑和数据处理，对于前端来说就是api接口
（3）总结：
	view -> template ; viewModel : vue实例(export default); model:发请求的代码 axios.get axios.post  
```



### 14.vue $nextTick

```
(1)首先我们得先来了解js的运行机制，js执行是单线程的，也是基于事件循环的。
(2)	所有的同步任务在主线程上执行，形成一个执行栈。
	主线程外有一个任务队列，只要异步任务有了结果，就在任务队列中放置事件的回调。
	当执行栈中的同步任务执行完之后，就会读取任务队列中异步任务的回调，进入执行栈中执行。
	主线程会不断的重复第三步。（事件循环）
(3)这里主线程的执行过程就是一个tick,而所有的异步结果都是通过任务队列来调度，完成后都会进入到下一个tick,并且在两个tick之间进行UI渲染。
(4)由于vue dom更新是异步的，即修改数据她不会立即的更新，而是缓存在同一事件循环中，等同一事件循环中所有数据都更新完成之后，再统一进行视图和数据的更新，而要拿到最新的数据和视图，vue设置了nextTick方法。

------------------------------------------------------------------------------------------------------------------

  Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
  也就是说我们在设置this.msg = 'some thing'的时候，Vue并没有马上去更新DOM数据，而是将这个操作放进一个队列中；如果我们重复执行的话，队列还会进行去重操作；等待同一事件循环中的所有数据变化完成之后，会将队列中的事件拿出来处理。
  这样做主要是为了提升性能，因为如果在主线程中更新DOM，循环100次就要更新100次DOM；但是如果等事件循环完成之后更新DOM，只需要更新1次。
```

### 15.虚拟DOM及Diff算法

1. 虚拟DOM

   ```
   从本质上来说，虚拟dom就是用js对象的方式来表示dom结构，配合不同渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次dom的修改结果一次性的更新到页面上，减少了页面渲染的次数，以及重绘重排的次数，提高性能。
   ```

2. 为什么需要虚拟dom

   ```
   在vue和react中封装了diff算法，在视图更新前，它会将新的vdom和之前缓存的vdom进行一个对比，渲染时只渲染修改的部分，没修改的部分任然用之前的数据进行渲染
   
   总结：跨平台渲染，减少重绘重排的次数，必要的dom更新。
   ```

3. Diff算法

   ```
   在vue / react中，diff算法是非常重要的，key属性是虚拟DOM对象的标识，新旧虚拟DOM对比的时候，按照下面的规则进行比较：
   （1）旧的虚拟DOM找到和新的虚拟DOM相同的key,如果新的虚拟DOM中的内容没变，那么就复用旧的虚拟DOM,如果变了，生成新的真实DOM,随后替换掉页面之前的真实DOM。
   （2）旧虚拟DOM中未找到与新虚拟DOM相同的key，根据数据创建新的真实DOM，随后渲染到到页面
   
   为什么遍历列表时，key最好不要用index?
   （1）当不存在对数据的逆序添加，逆序删除等破坏顺序的操作，仅仅用于列表的展示是没问题的。
   （2）但是当出现了一些逆序的操作，在性能上会导致大量的新旧虚拟DOM替换。（即使之前的dom可以复用，因为逆序操作，使得所有的key都不一样了）。  --- 性能上的问题
   （3）当逆序操作的列表中，包含了一些输入的DOM，会导致输入DOM内容的错乱。最外层的li的index相同，不做替换，但是里面的<input type="text"/>是有value属性的，输入的内容也不会清除。
   
   ```

   

### 16.keep-alive原理

### 17.如何在vue绑定一些全局的方法

### 18. Vue.use原理



