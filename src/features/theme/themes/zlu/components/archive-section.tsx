"use client";

import { Archive } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ArchivePost } from "@/features/theme/contract/pages";

// 从标签名称生成一致的颜色
function getTagColor(tagName: string): string {
  const colors = [
    "blue",
    "red",
    "green",
    "purple",
    "orange",
    "teal",
    "pink",
    "yellow",
    "indigo",
  ];

  // 使用标签名称的 hash 值选择颜色
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = (hash << 5) - hash + tagName.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }

  return colors[Math.abs(hash) % colors.length];
}

// 格式化日期为 MM.DD-YY
function formatDate(date: Date | string): string {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${month}.${day}-${year}`;
}

// 获取日期的列索引（同一天发布的博客在同一列）
function getColumnKey(date: Date | string): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

interface ArchiveSectionProps {
  posts: Array<ArchivePost>;
}

interface NodePosition {
  id: number;
  slug: string;
  title: string;
  x: number;
  y: number;
  column: number;
  date: Date | string;
  tags: Array<{ id: number; name: string }>;
}

export function ArchiveSection({ posts }: ArchiveSectionProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="zlu-archive-section">
        <div className="zlu-archive-empty">
          <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>暂无归档文章</p>
        </div>
      </section>
    );
  }

  // 按发布日期分组
  const columnMap = new Map<string, Array<ArchivePost>>();

  // 按发布时间排序（新的在前）
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  // 将同一天的文章分到同一列
  sortedPosts.forEach((post) => {
    const columnKey = getColumnKey(post.publishedAt);
    const existing = columnMap.get(columnKey) || [];
    existing.push(post);
    columnMap.set(columnKey, existing);
  });

  // 转换为列数组
  const columns = Array.from(columnMap.entries()).map(([dateKey, posts]) => ({
    dateKey,
    posts,
  }));

  // 计算节点位置和连线
  const nodeWidth = 36;
  const nodeHeight = 36;
  const columnGap = 60;
  const baseY = 20;

  // 存储所有节点位置用于计算连线
  const nodePositions: NodePosition[] = [];
  const connections: Array<{
    from: NodePosition;
    to: NodePosition;
    color: string;
    isDashed: boolean;
  }> = [];

  // 计算每个节点的位置
  columns.forEach((column, columnIndex) => {
    const x = columnIndex * columnGap + nodeWidth / 2;

    column.posts.forEach((post, postIndex) => {
      // 添加随机垂直偏移
      const randomOffset = Math.sin(columnIndex * post.id) * 8;
      const y = baseY + postIndex * (nodeHeight + 8) + randomOffset;

      const nodePos: NodePosition = {
        id: post.id,
        slug: post.slug,
        title: post.title,
        x,
        y,
        column: columnIndex,
        date: post.publishedAt,
        tags: post.tags,
      };

      nodePositions.push(nodePos);
    });
  });

  // 计算连线 - 只在相同颜色的标签之间连线
  for (let i = 0; i < nodePositions.length - 1; i++) {
    const current = nodePositions[i];
    const next = nodePositions[i + 1];

    // 只在相邻列之间连线
    if (Math.abs(current.column - next.column) === 1) {
      const currentColor = current.tags.length > 0
        ? getTagColor(current.tags[0].name)
        : "gray";
      const nextColor = next.tags.length > 0
        ? getTagColor(next.tags[0].name)
        : "gray";

      // 只有颜色相同才连线
      if (currentColor === nextColor) {
        connections.push({
          from: current,
          to: next,
          color: currentColor,
          isDashed: currentColor === "gray",
        });
      }
    }
  }

  // 计算画布大小
  const canvasWidth = columns.length * columnGap + 40;
  const canvasHeight = Math.max(
    ...nodePositions.map((n) => n.y),
    100
  ) + 40;

  return (
    <section className="zlu-archive-section">
      <h2 className="zlu-archive-header">
        <Archive className="w-5 h-5" />
        文章归档
      </h2>

      <div className="zlu-archive-canvas" style={{ minWidth: `${canvasWidth}px` }}>
        {/* SVG 连线层 */}
        <svg className="zlu-archive-connections" width={canvasWidth} height={canvasHeight}>
          {connections.map((conn, index) => (
            <path
              key={`conn-${index}`}
              className="zlu-archive-connection-line"
              data-color={conn.color}
              d={`M ${conn.from.x + nodeWidth / 2} ${conn.from.y + nodeHeight / 2}
                  L ${conn.to.x + nodeWidth / 2} ${conn.to.y + nodeHeight / 2}`}
            />
          ))}
        </svg>

        {/* 节点层 */}
        {columns.map((column, columnIndex) => (
          <div key={column.dateKey} className="zlu-archive-column">
            {column.posts.map((post) => {
              const nodePos = nodePositions.find((n) => n.id === post.id);
              const tagColor = post.tags.length > 0
                ? getTagColor(post.tags[0].name)
                : "gray";

              return (
                <div key={post.id}>
                  <Link
                    to="/post/$slug"
                    params={{ slug: post.slug }}
                    className="zlu-archive-node"
                    data-tag-color={tagColor}
                    title={post.title}
                  >
                    <span className="zlu-archive-node-link" />
                  </Link>
                  <div className="zlu-archive-date">
                    {formatDate(post.publishedAt)}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
