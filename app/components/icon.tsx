import {
  Blocks,
  Boxes,
  Braces,
  Component,
  Database,
  FolderGit2,
  Gauge,
  GitBranch,
  GitCommit,
  Globe,
  Hammer,
  KeyRound,
  Layers,
  LayoutTemplate,
  Lock,
  MessagesSquare,
  Network,
  PenTool,
  RefreshCw,
  Route,
  ScrollText,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  Video,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

/** String-name → lucide component map, so data modules can stay JSX-free. */
const ICONS: Record<string, LucideIcon> = {
  Blocks,
  Boxes,
  Braces,
  Component,
  Database,
  FolderGit2,
  Gauge,
  GitBranch,
  GitCommit,
  Globe,
  Hammer,
  KeyRound,
  Layers,
  LayoutTemplate,
  Lock,
  MessagesSquare,
  Network,
  PenTool,
  RefreshCw,
  Route,
  ScrollText,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  Video,
  Waypoints,
};

export function resolveIcon(name: string): LucideIcon {
  return ICONS[name] ?? Boxes;
}

export function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Cmp = resolveIcon(name);
  return <Cmp size={size} className={className} style={style} aria-hidden />;
}
