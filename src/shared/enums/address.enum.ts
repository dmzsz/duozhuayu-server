import { registerEnumType } from '@nestjs/graphql';

/**
 * 所在地区 
 */
export enum Area {
    /**
     * 中国内地(大陆)
     */
    CHINA_MAINLAND = 0,
    /**
     * 港澳台地区及海外
     */
    OTHER
}

export enum AddressType {
    /**
     * 退货地址
     */
    RETURN_ADDRESS,
    /**
     * 收货地址
     */
    RECEIVING_ADDRESS,
    /**
     * 收票地址
     */
    TICKET_ADDRESS,

}
registerEnumType(Area, {
    name: 'Area'
})