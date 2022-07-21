import { registerEnumType } from '@nestjs/graphql'

/**
 * 性别
 */
export enum OrganisationType {
  /**
   * 总公司
   */
   HeadOffice = 1,
   /**
    * 分公司
    */
   BranchOffice, 
   /**
    * 子公司
    */
    SubsidiaryCompany,

}


registerEnumType(OrganisationType, {
  name: 'OrganisationType',
})