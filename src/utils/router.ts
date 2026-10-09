export type RouteView =
  | 'editorial-chronicle'
  | 'problems-index'
  | 'workspace-lab'
  | 'code-terminal'
  | 'mentor-review'
  | 'visualize-matrix'
  | 'think-schematic'
  | 'contest-arena'
  | 'progress-ledger'
  | 'dashboard'
  | 'profile'
  | 'settings'
  | 'founder-blueprint';

export interface ParsedRoute {
  view: RouteView;
  problemId?: string;
  isAuthOpen: boolean;
  authMode: 'login' | 'signup' | 'forgot';
  isReflectionOpen: boolean;
  reflectionProblemId?: string;
  isUnknownRoute: boolean;
}

export function getPathForView(view: RouteView | string, problemId?: string): string {
  switch (view) {
    case 'editorial-chronicle':
      return '/';
    case 'problems-index':
      return '/problems';
    case 'workspace-lab':
      return problemId ? `/workspace/${problemId}` : '/workspace';
    case 'code-terminal':
      return '/code-terminal';
    case 'mentor-review':
      return '/mentor-review';
    case 'visualize-matrix':
      return '/visualize-matrix';
    case 'think-schematic':
      return '/think-schematic';
    case 'contest-arena':
      return '/contest-arena';
    case 'progress-ledger':
      return '/progress-ledger';
    case 'dashboard':
      return '/dashboard';
    case 'profile':
      return '/profile';
    case 'settings':
      return '/settings';
    case 'founder-blueprint':
      return '/founder-blueprint';
    default:
      return '/';
  }
}

export function parseRoute(pathname: string, search: string = ''): ParsedRoute {
  // Normalize path by removing trailing slash if not root
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const searchParams = new URLSearchParams(search);

  const authParam = searchParams.get('auth');
  const isAuthParam = authParam === 'login' || authParam === 'signup' || authParam === 'forgot';

  // 1. Root / Home
  if (cleanPath === '/' || cleanPath === '/home' || cleanPath === '/chronicle') {
    return {
      view: 'editorial-chronicle',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 2. Auth direct routes
  if (cleanPath === '/login') {
    return {
      view: 'editorial-chronicle',
      isAuthOpen: true,
      authMode: 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }
  if (cleanPath === '/signup') {
    return {
      view: 'editorial-chronicle',
      isAuthOpen: true,
      authMode: 'signup',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 3. Dashboard
  if (cleanPath === '/dashboard') {
    return {
      view: 'dashboard',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 4. Problems Index
  if (cleanPath === '/problems' || cleanPath === '/problems-index') {
    return {
      view: 'problems-index',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 5. Problems /:id -> redirects to workspace for that problem
  const problemsMatch = cleanPath.match(/^\/problems\/([^/]+)$/);
  if (problemsMatch) {
    return {
      view: 'workspace-lab',
      problemId: decodeURIComponent(problemsMatch[1]),
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 6. Workspace /:id or /workspace
  if (cleanPath === '/workspace') {
    return {
      view: 'workspace-lab',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }
  const workspaceMatch = cleanPath.match(/^\/workspace\/([^/]+)$/);
  if (workspaceMatch) {
    return {
      view: 'workspace-lab',
      problemId: decodeURIComponent(workspaceMatch[1]),
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 7. Sub-workspace modules (Code, Mentor, Visualize)
  if (cleanPath === '/code' || cleanPath === '/code-terminal') {
    return {
      view: 'code-terminal',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }
  if (cleanPath === '/mentor' || cleanPath === '/mentor-review') {
    return {
      view: 'mentor-review',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }
  if (cleanPath === '/visualize' || cleanPath === '/visualize-matrix') {
    return {
      view: 'visualize-matrix',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 8. Think Schematic
  if (cleanPath === '/think' || cleanPath === '/think-schematic' || cleanPath === '/think-lab') {
    return {
      view: 'think-schematic',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 9. Contest Arena
  if (cleanPath === '/contest' || cleanPath === '/contest-arena') {
    return {
      view: 'contest-arena',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 10. Progress Ledger
  if (cleanPath === '/progress' || cleanPath === '/progress-ledger') {
    return {
      view: 'progress-ledger',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 11. Profile
  if (cleanPath === '/profile') {
    return {
      view: 'profile',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 12. Settings
  if (cleanPath === '/settings') {
    return {
      view: 'settings',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 13. Founder Blueprint
  if (cleanPath === '/blueprint' || cleanPath === '/founder-blueprint') {
    return {
      view: 'founder-blueprint',
      isAuthOpen: isAuthParam,
      authMode: (authParam as any) || 'login',
      isReflectionOpen: false,
      isUnknownRoute: false,
    };
  }

  // 14. Reflection
  if (cleanPath === '/reflection') {
    return {
      view: 'editorial-chronicle',
      isAuthOpen: false,
      authMode: 'login',
      isReflectionOpen: true,
      isUnknownRoute: false,
    };
  }
  const reflectionMatch = cleanPath.match(/^\/reflection\/([^/]+)$/);
  if (reflectionMatch) {
    return {
      view: 'workspace-lab',
      problemId: decodeURIComponent(reflectionMatch[1]),
      isAuthOpen: false,
      authMode: 'login',
      isReflectionOpen: true,
      reflectionProblemId: decodeURIComponent(reflectionMatch[1]),
      isUnknownRoute: false,
    };
  }

  // Wildcard / Unrecognized route
  return {
    view: 'editorial-chronicle',
    isAuthOpen: false,
    authMode: 'login',
    isReflectionOpen: false,
    isUnknownRoute: true,
  };
}

export function navigateTo(
  url: string,
  options: { replace?: boolean } = {}
) {
  if (typeof window === 'undefined') return;
  if (options.replace) {
    window.history.replaceState(null, '', url);
  } else {
    window.history.pushState(null, '', url);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
}
