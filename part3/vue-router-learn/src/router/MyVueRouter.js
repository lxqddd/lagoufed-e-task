let _Vue = null

class MyVueRouter {
	static install(Vue) {
		// 判断当前插件是否已经被安装
		if (MyVueRouter.install.installed) {
			return
		}
		MyVueRouter.install.installed = true

		// 把Vue的构造函数记录到全局变量
		_Vue = Vue

		// 把创建Vue实例时传入的router对象注入到Vue实例上
		_Vue.mixin({
			beforeCreate() {
				if (this.$options.router) {
					_Vue.prototype.$router = this.$options.router
					this.$options.router.init()
				}
			}
		})
	}

	constructor(options) {
		this.options = options
		this.routerMap = {}
		this.curRouter = _Vue.observable({
			current: '/'
		})
	}

	init() {
		this.createRouterMap()
		this.createComponent(_Vue)
		this.initEvent()
	}

	createRouterMap() {
		// 遍历所有的路由规则，转换成键值对的形式，存储在routerMap中
		if (!this.options.routes) {
			return
		}
		this.options.routes.forEach((route) => {
			this.routerMap[route.path] = route.component
		})
	}

	createComponent(Vue) {
		Vue.component('router-link', {
			props: {
				to: {
					type: String,
					default: '/'
				}
			},
			render(h) {
				return h(
					'a',
					{
						attrs: {
							href: this.to
						},
						on: {
							click: this.handleClick
						}
					},
					[this.$slots.default]
				)
			},
			methods: {
				handleClick(e) {
					history.pushState({}, '', this.to)
					this.$router.curRouter.current = this.to
					e.preventDefault()
				}
			}
		})

		const self = this
		Vue.component('router-view', {
			render(h) {
				const component = self.routerMap[self.curRouter.current]
				return h(component)
			}
		})
	}

	initEvent() {
		// 当浏览器url发生变化的时候触发
		window.addEventListener('popstate', () => {
			this.curRouter.current = window.location.pathname
		})
	}
}

export default MyVueRouter
