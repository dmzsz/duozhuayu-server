import { registerEnumType } from '@nestjs/graphql';

/**
 * 角色选项
 */
export enum RoleOptions {
  ADMIN = 'admin',
  /**
   * 普通用户
   */
  USER = 'user',
  /**
   * vip用户
   */
  VIP_USER = 'vip_user',
  /**
  * 普通职员
  */
  STAFF = 'staff',
  /**
   * 验货员
   */
  INSPECTOR = 'inspector',
  /**
   * 会计
   */
  ACCOUNTING = 'accounting',
  /**
   * 会计主管
   */
  ACCOUNTING_SUPERVISOR = 'accounting_supervisor',
}


registerEnumType(RoleOptions, {
  name: 'RoleOptions',
})