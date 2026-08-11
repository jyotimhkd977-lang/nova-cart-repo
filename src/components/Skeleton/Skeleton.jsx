import './Skeleton.css';

export function SkeletonBlock({ height = 20, width = '100%', radius = 10, style }) {
  return <div className="nc-skeleton" style={{ height, width, borderRadius: radius, ...style }} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="nc-skeleton-card neo-raised">
      <SkeletonBlock height={180} radius={16} />
      <div style={{ padding: '14px 4px 4px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SkeletonBlock height={12} width="60%" />
        <SkeletonBlock height={16} width="90%" />
        <SkeletonBlock height={14} width="40%" />
        <SkeletonBlock height={32} width="100%" radius={20} />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="nc-skeleton-grid">
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}
