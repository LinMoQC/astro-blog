import { h } from 'hastscript'
import { visit } from 'unist-util-visit'
import { FriendLinkComponent } from './rehype-component-friend-card.mjs'

export function remarkFriendLink() {
  console.log('[remarkFriendLink] Plugin loaded') // 插件加载时打印日志

  return tree => {
    console.log('[remarkFriendLink] Processing Markdown AST') // 处理 AST 时打印日志

    visit(tree, 'containerDirective', node => {
      console.log('[remarkFriendLink] Found containerDirective:', node.name) // 遍历时打印

      if (node.name !== 'friendlink') return

      const { name, url, description } = node.attributes || {}
      if (!name || !url) {
        console.warn(
          '[remarkFriendLink] Invalid directive. Missing name or url.',
        ) // 记录错误

        node.data = {
          hName: 'div',
          hProperties: { class: 'hidden' },
          hChildren: [
            'Invalid directive. Use ::friendlink{name="xxx", url="xxx"}',
          ],
        }
        return
      }

      console.log(
        `[remarkFriendLink] Creating FriendLinkComponent for ${name} (${url})`,
      )

      node.data = {
        hName: 'div',
        hChildren: [FriendLinkComponent({ name, url, description })],
      }
    })
  }
}
