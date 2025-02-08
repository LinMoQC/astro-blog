---
title: BiliBili·二面
published: 2025-02-09
description: ''
image: ''
tags: ['BiliBili']
category: '面经'
draft: false 
lang: ''
---

1. **浏览器从输入到显示页面的全过程**
   - **DNS 解析**：浏览器通过 DNS 解析域名，获得服务器的 IP 地址。
   - **TCP 连接**：浏览器与服务器建立 TCP 连接（三次握手）。
   - **发送 HTTP 请求**：浏览器向服务器发送 HTTP 请求。
   - **服务器处理请求并返回响应**：服务器返回 HTML、CSS、JS 等文件。
   - **浏览器解析并渲染**：浏览器根据 HTML、CSS、JS 渲染页面，执行 JS 脚本，展示最终页面。

2. **TCP 三次握手过程**
   - **第一次握手**：客户端发送 SYN 包到服务器，表示客户端请求建立连接。
   - **第二次握手**：服务器收到 SYN 包后，返回一个 SYN-ACK 包，表示同意建立连接。
   - **第三次握手**：客户端收到 SYN-ACK 包后，再发送一个 ACK 包，连接建立成功。

3. **为什么要 TCP 四次挥手**
   - 在数据传输完成后，双方需要各自确认关闭连接，确保数据完整传输。四次挥手可以避免未完全传输的数据丢失。
   - 第一次和第二次挥手是主动关闭方请求关闭连接，第三次和第四次是被动关闭方确认关闭。

4. **浏览器缓存策略**
   - **强缓存**：`Cache-Control`、`Expires` 等控制缓存是否直接使用本地缓存。
   - **协商缓存**：`Last-Modified`、`ETag` 等用于比较本地缓存和服务器资源的有效性。
   - **缓存控制方法**：如 `max-age`、`no-cache`、`private`、`public`。

5. **讲一下 HOC（高阶组件）**
   - HOC 是一个函数，它接受一个组件并返回一个新的组件。可以用来复用组件逻辑，比如权限控制、状态管理等。
   - 例子：`withAuth` 高阶组件可以在组件加载时检查用户是否登录。

6. **登录权限判断逻辑**
   - **前端路由控制**：根据用户登录状态判断是否可以访问某些页面，未登录则跳转到登录页面。
   - **Token 验证**：通过 LocalStorage 或 Cookie 存储登录凭证，在每次请求时通过 Header 发送 Token，后端验证 Token。

7. **Token 为什么要存在 LocalStorage 而不是 Cookie**
   - **LocalStorage**：更易于使用，存储容量较大，不会随请求自动发送，减少 CSRF 攻击。
   - **Cookie**：每次请求都会自动带上，容易受到 XSS 攻击，存储大小有限。

8. **React 动态路由怎么实现的**
   - 使用 React Router 的 `Route` 和 `Switch` 配合状态管理动态添加路由。
   - 根据不同的状态或权限条件，通过 `useEffect` 或路由守卫判断动态加载页面。

9. **Suspense 的实现原理**
   - Suspense 让 React 组件在等待数据时可以挂起渲染，直到数据加载完成后再显示内容。
   - 通过 `React.lazy` 实现动态加载，使用 Suspense 组件包裹懒加载的组件。

10. **首屏加载优化做了哪些**
    - **代码拆分**：使用 Webpack 或 React 的动态导入，实现首屏只加载必要的代码。
    - **图片懒加载**：非首屏的图片使用懒加载技术。
    - **CSS 和 JS 异步加载**：确保不影响页面渲染。

---

### 手撕题

1. **事件总线（eventBus）**
   - 创建一个事件管理中心，允许不同的模块或组件进行通信。
   - 实现：使用一个对象存储所有事件的回调函数，提供 `on`、`emit` 和 `off` 方法来注册、触发和注销事件。

```javascript
   class EventBus {
     constructor() {
       this.events = {};
     }

     on(event, callback) {
       if (!this.events[event]) {
         this.events[event] = [];
       }
       this.events[event].push(callback);
     }

     emit(event, data) {
       if (this.events[event]) {
         this.events[event].forEach(callback => callback(data));
       }
     }

     off(event, callback) {
       if (this.events[event]) {
         this.events[event] = this.events[event].filter(cb => cb !== callback);
       }
     }
   }
```

2. **版本号排序**
    - 版本号通常由主版本号、次版本号和修订号组成。比较时逐个比较这些数字。
```javascript
function compareVersion(version1, version2) {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = parseInt(v1[i] || '0');
    const num2 = parseInt(v2[i] || '0');
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
}
```

1. **版本号排序 plus（预发布版本）**
```javascript
function compareVersionWithPreRelease(version1, version2) {
  const v1 = version1.split('-');
  const v2 = version2.split('-');
  
  // 比较主版本号、次版本号和修订号
  let result = compareVersion(v1[0], v2[0]);
  if (result !== 0) return result;

  // 比较预发布版本
  const preRelease1 = v1[1] || '';
  const preRelease2 = v2[1] || '';
  if (preRelease1 === preRelease2) return 0;
  return preRelease1 < preRelease2 ? -1 : 1;
}

```