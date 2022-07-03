import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/discover',
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('@/views/Discover'),
    meta: { btmPlayShow: true, recommendClassShow: true},
  },
  {
    path: '/discover/toplist',
    name: 'TopList',
    component: () => import('@/views/TopList'),
    meta: { btmPlayShow: true, topListClassShow: true},
  },
  {
    path: '/discover/playlist',
    name: 'AllPlayList',
    component: () => import('@/views/AllPlayList'),
    meta: { btmPlayShow: true, playListClassShow: true},
  },
  {
    path: '/discover/artist',
    component: () => import('@/views/AllArtist'),
    children: [
      {
        path: '',
        name: 'HotArtist',
        component: () => import('@/views/AllArtist/Content/HotArtist'),
        meta: { btmPlayShow: true, artistClassShow: true},
      },
      {
        path: 'cat',
        name: 'OtherArtist',
        component: () => import('@/views/AllArtist/Content/OtherArtist'),
        meta: { btmPlayShow: true, artistClassShow: true },
      },
    ]
  },
  {
    path: '/discover/album/:m?',
    name: 'AllAlbum',
    component: () => import('@/views/AllAlbum'),
    meta: { btmPlayShow: true, albumClassShow: true },
  },
  {
    path: '/discover/recommend/taste',
    name: 'Taste',
    component: () => import('@/views/Taste'),
    meta: { btmPlayShow: true, albumClassShow: false },
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('@/views/PlayList'),
    meta: { btmPlayShow: true, recommendClassShow: false }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import('@/views/Album'),
    meta: { btmPlayShow: true, recommendClassShow: false }
  },
  {
    path: '/song',
    name: 'Song',
    component: () => import('@/views/Song'),
    meta: { btmPlayShow: true, recommendClassShow: false }
  },
  {
    path: '/artist',
    component: () => import('@/views/Artist'),
    meta: { btmPlayShow: true, recommendClassShow: false },
    children: [
      {
        path: '',
        name: 'Artist',
        component: () => import('@/views/Artist/Content/ArtistSong/ArtistSong.vue'),
        meta: { btmPlayShow: true, recommendClassShow: false, selected: 0 },
      },
      {
        path: 'album',
        component: () => import('@/views/Artist/Content/ArtistAlbum/ArtistAlbum.vue'),
        meta: { btmPlayShow: true, recommendClassShow: false, selected: 1 },
      },
      {
        path: 'mv',
        component: () => import('@/views/Artist/Content/ArtistMv/ArtistMv.vue'),
        meta: { btmPlayShow: true, recommendClassShow: false, selected: 2 },
      },
      {
        path: 'desc',
        component: () => import('@/views/Artist/Content/ArtistDesc/ArtistDesc.vue'),
        meta: { btmPlayShow: true, recommendClassShow: false, selected: 3 },
      },
    ]
  },
  {
    path: '/mv',
    name: 'MV',
    component: () => import('@/views/MV'),
    meta: { btmPlayShow: false, recommendClassShow: false }
  }
]

let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 期望滚动到哪个的位置
    return { y: 0 }
  }
})

// 前置路由守卫
// router.beforeEach((to, from, next) => {

// })

// 后置守卫一般可以写进度条和title
// router.afterEach((to, from) => {
//   document.title = to.meta.title
// })
export default router