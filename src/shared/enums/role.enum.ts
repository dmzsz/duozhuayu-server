import { registerEnumType } from '@nestjs/graphql';

/**
 * 角色选项
 */
export enum RoleOptions {
  ADMIN = 'admin',
  /**
   * 普通用户
   */
  USER = 'customer',
  /**
   * vip用户
   */
  VIP_USER = 'vip_customer',
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


/**
 * 角色选项
 */
export enum RoleGroupType {
  /**
   * 不考虑 职位 部门 组织 约束
   */
  general = 0,
  /**
   * 权限低于 职位 部门 组织
   */
  grade
}

registerEnumType(RoleOptions, {
  name: 'RoleOptions',
})
registerEnumType(RoleGroupType, {
  name: 'RoleGroupType',
})