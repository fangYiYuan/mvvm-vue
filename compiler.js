import Watcher from './watch'

export default class Compiler {
  constructor (context) {
    this.$el = context.$el
    this.context = context
    if (this.$el) {
      this.$fragment = this.nodeToFragment(this.$el)
      // 模版编译
      this.compiler(this.$fragment)
    }
  }

  // 将所有元素转成文档片段
  nodeToFragment (node) {
    let fragment = document.createDocumentFragment()
    console.log('=>node', node)
    console.log('=>node', node.childNodes)
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {
        if (!this.ignorable(child)) {
          console.log('=>fragment-child', child)
          fragment.appendChild(child)
        }
      })
    }
    return fragment
  }
  // 忽略哪些节点不添加到文档片段 比如：换行，注释
  ignorable (child) {
    console.log('=>child', child)
    const reg = /^[\n\t\r]+/
    return (
      child.nodeType === 8 || (child.nodeType === 3 && reg.test(child.textContent))
    )
  }

  // 模版编译
  compiler (node) {
    console.log('=>nodenode', node)
    if (node.childNodes && node.childNodes.length) {
      console.log('=>ggggg', node.childNodes)
      node.childNodes.forEach(child => {
        if (child.nodeType === 1) {
          // 当nodeType为1时，说明是元素节点
          console.log('=>111', child)
          this.compilerElementNode(child)
        } else if (child.nodeType === 3) {
          // 当nodeType为3时，说明是文本节点
          console.log('=>333', child)
          this.compilerTextNode(child)
        }
      })
    }
  }
  compilerElementNode (node) {
    console.log('=>node', node)
    console.log('=>node', node.attributes)
    let attrs = [...node.attributes]
    console.log('=>arr', attrs)
    if (attrs.length) {
      attrs.forEach(attr => {
        let {name: attrName, value: attrValue} = attr
        if (attrName.startsWith('v-')) {
          // console.log('=>attrName', attrName, attrValue)
          let dirName = attrName.slice(2)
          switch (dirName) {
            case 'model':
              console.log('=>model', attrName)
              new Watcher(attrValue, this.context, newValue => {
                console.log('=>newValue', newValue)
                node.value = newValue
              })
              node.addEventListener('input', e => {
                console.log('=>this', this)
                this.context[attrValue] = e.target.value
              })
              break
            case 'text':
              new Watcher(attrValue, this.context, newValue => {
                console.log('=>newValue', newValue)
                node.textContent = newValue
              })
              break
          }
        }
      })
      this.compiler(node)// 递归
    }
  }
  compilerTextNode (node) {
    console.log('=>ddddd', node)
  }
}