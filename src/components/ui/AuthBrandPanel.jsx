import { Badge, Title, Text } from '@mantine/core';
import NetworkDiagramPreview from './NetworkDiagramPreview';

export default function AuthBrandPanel({ headline, subtext }) {
  return (
    <div className="auth-brand-panel">
      <div className="grain-overlay"></div>
      <div className="brand-content">
        <div className="brand-top">
          <div className="brand-logo">
            <div className="brand-logo-mark">S</div>
            <span>Shardize</span>
          </div>
        </div>

        <div className="brand-hero">
          <Badge className="brand-pill">Private storage network</Badge>
          <Title order={1} className="brand-headline">
            {headline}
          </Title>
          <Text className="brand-sub">
            {subtext}
          </Text>

          <NetworkDiagramPreview />
        </div>
      </div>
    </div>
  );
}
