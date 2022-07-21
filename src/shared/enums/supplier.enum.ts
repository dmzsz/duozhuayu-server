import { registerEnumType } from "@nestjs/graphql";

export enum SupplierType {
    /**
     * 厂商
     */
    FACTORY = 1,
    /**
     * 代理商
     */
    AGENT,
    /**
     * 个人
     */
    INDIVIDUAL
}


export enum SupplierStatus {
    /**
     * 可用
     */
    AVAILABLE = 1,
    /**
     * 不可用
     */
    UNAVAILABLE,
    /**
     * 临时
     */
    TEMPORARILY
}



registerEnumType(SupplierType, {
    name: 'SupplierType'
})

registerEnumType(SupplierStatus, {
    name: 'SupplierStatus'
})