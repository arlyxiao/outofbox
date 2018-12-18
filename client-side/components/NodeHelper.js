import Link from 'next/link'

const site = require('../site')();
const menus = site['menus'];


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
                {node.title}
            </a>
        </Link>
    )
}

