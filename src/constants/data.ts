import { NavItem } from '@/types'

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'home',
    component: 'dashboard',
    layout: 'dashboard',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: 'package',
    component: 'project',
    layout: 'dashboard',
  },
  {
    title: 'Tasks',
    href: '/projects/:project/tasks',
    icon: 'listChecks',
    component: 'task',
    layout: 'dashboard',
    hideInMenu: true,
  },
  {
    title: 'Tutorials',
    href: '/tutorials',
    icon: 'tutorial',
    component: 'tutorials',
    layout: 'dashboard',
    hideInMenu: false,
  },
  {
    title: 'MyTasks',
    href: '/mytasks',
    icon: 'listChecks',
    component: 'mytask',
    layout: 'dashboard',
  },
  {
    title: 'Login',
    href: '/login',
    component: 'login',
    description: 'Authentication forms built using the components.',
    hideInMenu: true,
  },
  {
    title: 'callback',
    href: '/auth/github/callback',
    component: 'callback',
    description: 'Redirect route.',
    hideInMenu: true,
  },
  {
    title: 'Tutorial',
    href: '/tutorial/:githubId',
    icon: 'tutorial',
    component: 'tutorial',
    description: 'tutorial.',
    layout: 'dashboard',
    hideInMenu: true,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: 'profile',
    component: 'profile',
    description: 'My Profile.',
    layout: 'dashboard',
  },
  {
    title: 'TaskDetail',
    href: '/task/:githubId',
    component: 'taskDetail',
    description: 'task detail.',
    layout: 'dashboard',
    hideInMenu: true,
  },
]

export const DEFAULT_PAGINATION_LIMIT = 4
