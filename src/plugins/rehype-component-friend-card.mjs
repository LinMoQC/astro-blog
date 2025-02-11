/// <reference types="mdast" />
import { h } from 'hastscript'

export function FriendLinkComponent(properties) {
  if (!properties.url) {
    return h('div', { class: 'hidden' }, ['Invalid directive: Missing URL.'])
  }

  const { name, url, description = '' } = properties
  const cardUuid = `FL${Math.random().toString(36).slice(-6)}`
  const displayName = name || new URL(url).hostname

  // 获取网页截图（使用 WordPress mShots API）
  const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=300&h=200`

  return h('div', { class: 'flex flex-col flex-1 min-w-0 overflow-hidden' }, [
    h(
      'h3',
      { id: `${cardUuid}-title`, class: 'text-sm font-semibold truncate' },
      [
        h(
          'a',
          {
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'text-sm font-semibold truncate',
          },
          displayName,
        ),
      ],
    ),
    h('img', {
      src: screenshotUrl,
      alt: displayName,
      class: 'w-full max-w-[400px] rounded flex-shrink-0 object-cover',
    }),
  ])
}
