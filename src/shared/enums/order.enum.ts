import { registerEnumType } from "@nestjs/graphql";

/**
 * 物流状态
 */
export enum LogisticsStatus {
    /**
     * 等待卖家发货
     */
    WAITING_SELLER = 'waiting_seller',
    /**
     * 卖家发货
     */
    SELLER = 'platform_receipt',
    /**
     * 平台收到卖家商品
     */
    PLATFORM_RECEIVES_SELLER = 'platform_receives_seller',
    /**
     * 退货给卖家
     */
    RETURN_TO_SELLER = 'return_to_seller',
    /**
     * 卖家签收
     */
    SELLER_SIGNATURE = 'seller_signature',
    /**
     * 发货给买家
     */
    SHIP_TO_BUYER = 'ship_to_buyer',
    /**
     * 买家签收
     */
    BUYER_SIGNED = 'buyer_signed',
    /**
     * 买家退货
     */
    BUYER_RETURNS = 'buyer_returns',
    /**
     * 平台收到买家退货
     */
    PLATFORM_RECEIVES_BUYER = 'platform_receives_buyer',
}

/**
 * 订单类型
 */
export enum OrderType {
    SOLD_BOOKS = "sold_books",
    PURCHASED_BOOKS = "purchased_books"
}

/**
 * 支付状态
 * 
 * BUYER_PAYS 买家付款 
 * BUYER_CONFIRMS_PAYMENT 买家确认付款
 * PAY_TO_SELLER 支付给卖家
 * REFUND_TO_BUYER 退款给买家
 */
export enum PaymentStatus {
    /**
     * 等待买家付款
     */
    BUYER_PENDING_PAYMENT = 'buyer_pending_payment',
    /**
    * 买家确认付款
    */
    BUYER_CONFIRMS_PAYMENT = 'buyer_confirms_payment',
    /**
     * 支付给卖家
     */
    PAY_TO_SELLER = 'pay_to_seller',
    /**
     * 退款给买家
     */
    REFUND_TO_BUYER = 'refund_to_buyer',
}
export enum PaymentType {
    /**
     * 借记卡
     */
    DEBIT_CARD_PAY = 1,
    /**
     * 信用卡
     */
    CREDIT_CARD_PAY,
    /**
     * 微信
     */
    WECHAT_PAY,
    /**
     * 支付宝
     */
    ALIPAY,
    /**
     * 现金
     */
    CASH_PAY
}

registerEnumType(LogisticsStatus, {
    name: 'LogisticsStatus'
})
registerEnumType(OrderType, {
    name: 'OrderType'
})
registerEnumType(PaymentStatus, {
    name: 'PaymentStatus'
})