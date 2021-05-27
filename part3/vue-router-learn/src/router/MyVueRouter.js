let _Vue = null

class MyVueRouter {
	static install(Vue) {
		// 1. 判断当前插件是否已经被加载
		if (MyVueRouter.install.installed) {
			return
		}
		MyVueRouter.install.installed = true

		// 2. 把Vue构造函数记录到全局变量
		_Vue = Vue

		// 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
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
		this.routeMap = {}
		this.data = _Vue.observable({
			current: '/'
		})
	}

	init() {
		this.createRouteMap()
		this.initComponents(_Vue)
		this.initEvent()
	}

	createRouteMap() {
		// 解析所有的路 由规则，把所有的路由规则解析成键值对的形式，存储到routeMap中
		if (this.options.routes && this.options.routes.length) {
			this.options.routes.forEach((item) => {
				this.routeMap[item.path] = item.component
			})
		}
	}

	initComponents(Vue) {
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
							click: this.clickHandler
						}
					},
					[this.$slots.default]
				)
			},
			methods: {
				clickHandler(e) {
					history.pushState({}, '', this.to)
					this.$router.data.current = this.to
					e.preventDefault()
				}
			}
			// template: `<a :href="to">
			//               <slot></slot>
			//             </a>`
		})

		const self = this
		Vue.component('router-view', {
			render(h) {
				const component = self.routeMap[self.data.current]
				return h(component)
			}
		})
	}

	initEvent() {
		window.addEventListener('popstate', () => {
			this.data.current = window.location.pathname
		})
	}
}

export default MyVueRouter
