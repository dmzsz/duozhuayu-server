import { registerEnumType } from "@nestjs/graphql";

/**
 * 采购订单类型
 */
export enum ProcurementOrderType {
    /**
     * 草稿
     */
    DRAFT = 0,
    /**
     * 采购订单
     */
    GENERAL,
    /**
     * 退回订单
     */
    RETURNED,
}

/**
 * 采购订单状态
 */
export enum ProcurementOrderStatus {
    /**
     * 未结订单
     */
    OPEN = 0,
    /**
     * 已接收 - 已收到部分数量货物，但它们尚未开票
     */
    RECEIVED,
    /**
     * 已开票 - 订单上的整个数量已开票。 
     * 注意︰ 如果订单 已经部分开票，已接收状态 不应为已开票状态。 
     * 因此，订单仍为 未结订单。
     */
    INVOICED,
    /**
     * 已取消 
     */
    CANCELED,
}


/**
 * 采购审核状态
 */
export enum ProcurementAuditStatus {
    /**
     * 草稿 - 只有当审批工作流用于采购订单时，才使用这些状态
     */
    DRAFT = 0,
    /**
     * 正在审核 - 只有当审批工作流用于采购订单时，才使用这些状态
     */
    IN_REVIEW,
    /**
     * 已拒绝 - 只有当审批工作流用于采购订单时，才使用这些状态
     */
    REJECTED,
    /**
     * 已审核
     */
    REVIEWED,
    /**
     * 正在进行外部审查 - 此状态用于采购查询被发送到供应商，以使供应商可以确认采购订单条款的情况
     */
    EXTERNAL_REVIEWING,
    /**
     * 已确认
     */
    CONFIRMED,
}

/**
 * 文档状态
 */
export enum ProcurementDocStatus {
    /**
     * 无 – 尚未为订单处理任何文档。
     */
    NONE = 0,
    /**
     * 采购查询 – 已生成采购查询，订单正在等待来自供应商的反馈。查询供应商中
     */
    INQUIRING,
    /**
     * 采购订单 – 已处理订单的确认。 购买中
     */
    PURCHASING,
    /**
     * 产品收据 – 已处理订单的产品收据。 
     */
    ARCHIVED_RECEIPTS,
    /**
     * 发票 – 已计算订单的发票
     */
    INVOICE_CALCULATION_COMPLETED
}

registerEnumType(ProcurementOrderType, {
    name: 'ProcurementOrderType'
})
registerEnumType(ProcurementOrderStatus, {
    name: 'ProcurementOrderStatus'
})
registerEnumType(ProcurementAuditStatus, {
    name: 'ProcurementAuditStatus'
})
registerEnumType(ProcurementDocStatus, {
    name: 'ProcurementDocStatus'
})