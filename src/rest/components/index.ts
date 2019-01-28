import { Router } from 'express'

// Auth routes
import { AuthRoutes } from './auth/routes'

// Config routes
import { ConfigRoutes } from './config/routes'

// User routes
import { UserInvitationRoutes } from './user/invitation/routes'
import { UserRoleRoutes } from './user/role/routes'
import { UserRoutes } from './user/routes'

// Task routes
import { SearchRoutes } from './search/routes'
import { TaskPriorityRoutes } from './task/priority/routes'
import { TaskRoutes } from './task/routes'
import { TaskStatusRoutes } from './task/status/routes'

/**
 * Init Express component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function initComponentRoutes(router: Router, prefix: string = ''): void {
  // Auth
  router.use(`${prefix}/auth`, new AuthRoutes().router)

  // Config
  router.use(`${prefix}/config`, new ConfigRoutes().router)

  // User
  router.use(`${prefix}/user`, new UserRoutes().router)
  router.use(`${prefix}/userInvitation`, new UserInvitationRoutes().router)
  router.use(`${prefix}/userRole`, new UserRoleRoutes().router)

  // Task
  router.use(`${prefix}/task`, new TaskRoutes().router)
  router.use(`${prefix}/taskPriority`, new TaskPriorityRoutes().router)
  router.use(`${prefix}/taskStatus`, new TaskStatusRoutes().router)

  // Search
  router.use(`${prefix}/search`, new SearchRoutes().router)
}