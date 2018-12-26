import Link from 'next/link'

const site = require('../site')();
const menus = site['menus'];


export function headerMeta(node) {
    if (node) {
        return {
            title: node.title,
            intro: node.intro ? node.intro : node.title
        }
    }

    return null;
}

export function tagBadge(node) {
    const tag = node.tags[0];
    return (
        tag &&
        <Link as={`/${node.channel_name}/tag/${tag['id']}`}
              href={`/taxon?id=${node.parent_id}&tag=${tag['id']}`}>
            <a className="node-title">
                <span className="badge badge-info">
                    {tag['name']}
                </span>
            </a>
        </Link>
    )
}

export function timeLabel(node) {
    return (
        <span className="time text-muted">{node.created_at.substring(0, 10)}</span>
    )
}

export function channelBadge(node) {
    return (
        <Link as={`/${node.channel_name}`}
              href={`/taxon?id=${node.parent_id}`}>
            <a className="node-title">
                <span className="badge badge-secondary">
                    {menus[node.channel_name]['label']}
                </span>
            </a>
        </Link>
    )
}

export function titleLink(node) {
    return (
        <Link as={`/${node.channel_name}-${node.id}`}
              href={`/show?id=${node.id}`}>
            <a className="node-title">
                {node.type == 'shared-video' &&
                <span className="node-type-badge badge badge-primary">视频</span>
                }
                {node.title}
            </a>
        </Link>
    )
}

