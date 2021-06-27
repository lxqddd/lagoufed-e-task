import { h } from 'snabbdom/build/h.js'
import { init } from 'snabbdom/build/init.js'
import { classModule } from 'snabbdom/build/modules/class'
import { propsModule } from 'snabbdom/build/modules/props'
import { styleModule } from 'snabbdom/build/modules/style'
import { eventListenersModule } from 'snabbdom/build/modules/eventlisteners'
import data from './data'

const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const margin = 10
let totalHeight = 0
let sortBy = 'rank'
let vnode

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container')
  vnode = patch(container, view(data))
  render()
})

function movieLine(movie) {
  return h(
    'div.row',
    {
      key: movie.rank,
      style: {
        opacity: '0',
        transform: 'translate(0px)',
        delayed: { transform: `translateY(80px)`, opacity: '1' },
        remove: {
          opacity: '0',
          transform: `translateY(0px)`
        }
      },
      hook: {
        insert: vnode => {
          movie.elmHeight = vnode.elm.offsetHeight
        }
      }
    },
    [
      h('div', { style: { fontWeight: 'bold' } }, movie.rank),
      h('div', movie.title),
      h('div', movie.desc),
      h(
        'div.btn.rm-btn',
        {
          on: {
            click: () => {
              remove(movie)
            }
          }
        },
        'x'
      )
    ]
  )
}

function view(data) {
  return h('div.wrapper', [
    h('h1', 'Top 10 movies'),
    h('div', [
      h(
        'a.btn.add',
        {
          on: {
            click: () => {
              add()
            }
          }
        },
        'Add'
      ),
      'Sort by:',
      h('span.btn-group', [
        h(
          'a.btn.rank',
          {
            class: { active: sortBy === 'rank' },
            on: {
              click: () => {
                changeSort('rank')
              }
            }
          },
          'Rank'
        ),
        h(
          'a.btn.title',
          {
            class: { active: sortBy === 'title' },
            on: {
              click: () => {
                changeSort('title')
              }
            }
          },
          'Title'
        ),
        h(
          'a.btn.desc',
          {
            class: { active: sortBy === 'desc' },
            on: {
              click: () => {
                changeSort('desc')
              }
            }
          },
          'Description'
        )
      ])
    ]),
    h('div.list', { style: { height: totalHeight + 'px' } }, data.map(movieLine))
  ])
}

function render() {
  const len = data.length

  totalHeight = len === 0 ? 0 : len * (data[0].elmHeight + margin) - margin

  vnode = patch(vnode, view(data))
}

function remove(movie) {
  const i = data.indexOf(movie)

  data.splice(i, 1)
  // console.log(data)

  render()
}

function changeSort(type) {
  sortBy = type
  data.sort((a, b) => {
    if (a[type] > b[type]) {
      return 1
    }
    if (a[type] < b[type]) {
      return -1
    }
    return 0
  })

  render()
}

function add() {
  const random = Math.floor(Math.random() * Math.floor(data.length - 1))
  const newMovie = Object.assign({}, data[random])
  newMovie.rank = data.length + 1
  data.unshift(newMovie)
  render()
}
