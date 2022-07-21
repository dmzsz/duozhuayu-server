import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Department,
    EmployeeEEGroup,
    GoodsItem,
    Organisation,
    Position,
    ProcurementOrder,
} from './'

/**
 * 员工
 */
@Entity({
    name: 'employees',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Employee extends IBase<Employee> {

    @Expose()
    @Type(() => Organisation)
    @Index("IDX_employee_organisation_id")
    @ManyToOne(() => Organisation, organisation => organisation.employees,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'organisation_id' })
    organisation?: Organisation;

    @Expose()
    @Type(() => Department)
    @Index("IDX_employee_dept_id")
    @ManyToOne(() => Department, department => department.employees,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'dept_id' })
    department: Department

    @Expose()
    @Type(() => Position)
    @Index("IDX_employee_postion_id")
    @ManyToOne(() => Position, position => position.employees,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'position_id' })
    position: Position;

    @Expose()
    @Type(() => EmployeeEEGroup)
    @OneToMany(type => EmployeeEEGroup, employeeEEGroup => employeeEEGroup.employee,
        { createForeignKeyConstraints: false, nullable: true })
    employeeEEGroup?: EmployeeEEGroup[]

    // /**
    //  * 审核过的商品
    //  */
    // @Expose()
    // @Type(() => GoodsItem)
    // @OneToMany(type => GoodsItem, goodsItem => goodsItem.censor,
    //     { createForeignKeyConstraints: false, nullable: true })
    // censoredProducts: GoodsItem;

    /**
     * 创建的采购订单
     */
    @Expose()
    @Type(() => ProcurementOrder)
    @OneToMany(type => ProcurementOrder, procurementOrder => procurementOrder.buyer,
        { createForeignKeyConstraints: false, nullable: true })
    procurementOrders: ProcurementOrder[]

    constructor(employee?: Partial<Employee>) {
        super(employee)

        if (employee) {
            Object.assign(
                this,
                plainToInstance(Employee, employee, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}