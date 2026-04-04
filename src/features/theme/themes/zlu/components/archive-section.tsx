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
  const nodeWidth = 40;
  const nodeHeight = 40;
  const columnGap = 80;
  const nodeGap = 50; // 同一列节点之间的垂直间距
  const baseY = 60;
  const baseX = 60; // 左边距
  const canvasPadding = 16; // canvas 的 padding

  // 存储所有节点位置用于计算连线
  const nodePositions: NodePosition[] = [];

  // 计算每个节点的位置
  columns.forEach((column, columnIndex) => {
    const x = baseX + columnIndex * columnGap;

    column.posts.forEach((post, nodeIndex) => {
      // 添加随机垂直偏移
      const randomOffset = Math.sin(columnIndex * 2.3 + nodeIndex * 1.7) * 12;
      const y = baseY + nodeIndex * nodeGap + randomOffset;

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

  // 计算连线 - 只在相同颜色的相邻列之间连线
  const connections: Array<{
    from: NodePosition;
    to: NodePosition;
    color: string;
    isDashed: boolean;
  }> = [];

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
  const canvasWidth = baseX * 2 + (columns.length - 1) * columnGap + nodeWidth;
  const canvasHeight = Math.max(
    ...nodePositions.map((n) => n.y + nodeHeight / 2 + 40), // +40 为日期文本和间距预留空间
    150
  ) + canvasPadding + 40;

  return (
    <section className="zlu-archive-section">
      <h2 className="zlu-archive-header">
        <Archive className="w-5 h-5" />
        文章归档
      </h2>

      <div
        className="zlu-archive-canvas"
        style={{
          minWidth: `${canvasWidth}px`,
          minHeight: `${canvasHeight}px`
        }}
      >
        {/* SVG 连线层 - 放在最底层 */}
        <svg
          className="zlu-archive-connections-svg"
          width={canvasWidth}
          height={canvasHeight}
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
        >
          {connections.map((conn, index) => {
            // 计算连线的角度和边缘点
            const dx = conn.to.x - conn.from.x;
            const dy = conn.to.y - conn.from.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = nodeWidth / 2; // 圆圈半径

            // 计算从圆心到边缘的偏移
            const offsetX = (dx / distance) * radius;
            const offsetY = (dy / distance) * radius;

            // 起点：from 圆心 + 半径偏移（圆心在节点中心）
            const startX = conn.from.x + offsetX;
            const startY = conn.from.y + offsetY;

            // 终点：to 圆心 - 半径偏移
            const endX = conn.to.x - offsetX;
            const endY = conn.to.y - offsetY;

            return (
              <path
                key={`conn-${index}`}
                className="zlu-archive-connection-line"
                data-color={conn.color}
                d={`M ${startX} ${startY} L ${endX} ${endY}`}
              />
            );
          })}
        </svg>

        {/* 节点层 - 放在 SVG 上面 */}
        <div
          className="zlu-archive-nodes-layer"
          style={{
            position: 'relative',
            zIndex: 1,
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            paddingTop: `${canvasPadding}px`
          }}
        >
          {columns.map((column, colIndex) => (
            <div
              key={column.dateKey}
              className="zlu-archive-column"
              style={{
                position: 'absolute',
                left: `${baseX + colIndex * columnGap}px`,
                top: 0,
                width: `${nodeWidth}px`
              }}
            >
              {column.posts.map((post, idx) => {
                const tagColor = post.tags.length > 0
                  ? getTagColor(post.tags[0].name)
                  : "gray";

                const randomOffset = Math.sin(colIndex * 2.3 + idx * 1.7) * 12;
                const y = baseY + idx * nodeGap + randomOffset;

                return (
                  <div
                    key={`node-wrapper-${post.id}`}
                    style={{
                      position: 'absolute',
                      left: '0px',
                      marginLeft: `${-nodeWidth / 2}px`,
                      top: `${y}px`,
                      marginTop: `${-nodeHeight / 2}px`,
                      width: `${nodeWidth}px`
                    }}
                  >
                    <Link
                      to="/post/$slug"
                      params={{ slug: post.slug }}
                      className="zlu-archive-node"
                      data-tag-color={tagColor}
                      title={post.title}
                      style={{
                        position: 'static',
                        marginBottom: '8px'
                      }}
                    >
                      <span className="zlu-archive-node-inner" />
                    </Link>
                    <div
                      className="zlu-archive-date"
                      style={{
                        width: `${nodeWidth * 3}px`,
                        marginLeft: `${-nodeWidth}px`,
                        textAlign: 'center',
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: '800'
                      }}
                    >
                      {formatDate(post.publishedAt)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
