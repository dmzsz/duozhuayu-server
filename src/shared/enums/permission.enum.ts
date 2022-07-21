import { registerEnumType } from '@nestjs/graphql';

/**
 * 权限Action
 */
export enum PermissionAction {

  /**
   * 
   */
  INVISIBLE = 1,
  /**
   * 读取
   */
  READ,
  /**
   * 删除
   */
  UPDATE,
  /**
   * 删除
   */
  REMOVE,
  /**
   * 
   */
  ALL,
}

registerEnumType(PermissionAction, {
  name: 'PermissionAction',
})