
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Gender {
    UNKNOWN = "UNKNOWN",
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum NodeCategory {
    COMPANY = "COMPANY",
    DEPARTMENT = "DEPARTMENT",
    CITY = "CITY",
    STORE = "STORE",
    POSITION = "POSITION",
    JOB = "JOB"
}

export enum RecordType {
    User = "User",
    File = "File"
}

export enum Type {
    VERIFY_EMAIL = "VERIFY_EMAIL",
    FORGOT_PASSWORD = "FORGOT_PASSWORD"
}

export enum CustomerType {
    BASIC = "BASIC",
    PREMIUM = "PREMIUM"
}

export class CreateCityInput {
    name: string;
}

export class CreateCompanyInput {
    name: string;
    manager: string;
}

export class CreateDepartmentInput {
    name: string;
}

export class CreateEmailInput {
    userId: string;
    type: Type;
}

export class CreateFormInput {
    content: string;
}

export class CreateMessageInput {
    text: string;
    roomId: string;
}

export class CreateNodeInput {
    parentId?: string;
    name: string;
    category: NodeCategory;
}

export class CreatePositionInput {
    name: string;
}

export class CreateRoleInput {
    code: string;
    description?: string;
    nodeId: string;
    permissions: string[];
}

export class CreateRoomInput {
    title: string;
    customerIds: string[];
}

export class CreateStoreInput {
    name: string;
}

export class CreateCustomerInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: Gender;
}

export class CreateCustomerRoleInput {
    customerId: string;
    roleId: string;
}

export class FileInput {
    filename?: string;
}

export class LoginCustomerInput {
    email: string;
    password: string;
}

export class PermissionInput {
    code: string;
    description: string;
}

export class RecordInput {
    Customer?: CustomerInput;
    File?: FileInput;
}

export class SearchInput {
    select?: string[];
    where?: RecordInput;
    start?: number;
    end?: number;
    order?: JSONObject;
    skip?: number;
    take?: number;
}

export class SearchNodeInput {
    parentId?: string;
    name?: string;
    category?: NodeCategory;
}

export class UpdateNodeInput {
    parentId: string;
    name?: string;
    category?: NodeCategory;
}

export class UpdateCustomerInput {
    firstName: string;
    lastName: string;
    password: string;
    gender: Gender;
}

export class CustomerInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    gender?: Gender;
}

export class City {
    _id: string;
    name?: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
}

export class Company {
    _id: string;
    name?: string;
    manager: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
}

export class Department {
    _id: string;
    name?: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
}

export class Email {
    _id: string;
    customerId: string;
    type: Type;
    isOpened: boolean;
    createdAt: number;
    updatedAt: number;
}

export class Facebook {
    _id?: number;
    token?: string;
    name?: string;
    email?: string;
}

export class File {
    _id: string;
    filename: string;
    path: string;
    createdAt: number;
    updatedAt: number;
}

export class Form {
    _id: string;
    content?: string;
    state: number;
    createdAt: number;
    updatedAt: number;
}

export class Google {
    _id?: number;
    token?: string;
    name?: string;
    email?: string;
}

export class Job {
    name?: string;
}

export class KPI {
    _id?: number;
    month?: number;
    belongTo?: string;
    spentTotal?: number;
    isActive?: boolean;
    createdAt?: number;
    createdBy?: string;
    updatedAt?: number;
    updatedBy?: string;
}

export class Link {
    customerStory?: string;
    wireframe?: string;
    dbDiagram?: string;
    gitlab?: string;
}

export class Local {
    email?: string;
    password?: string;
}

export class LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export class Message {
    _id: string;
    text?: string;
    roomId: string;
    createdBy?: Customer;
    createdAt: number;
    updatedAt: number;
}

export abstract class IMutation {
    abstract createCity(input: CreateCityInput): City | Promise<City>;

    abstract createCompany(input: CreateCompanyInput): Company | Promise<Company>;

    abstract createDepartment(input: CreateDepartmentInput): Department | Promise<Department>;

    abstract createEmail(input: CreateEmailInput): Email | Promise<Email>;

    abstract openEmail(_id: string): boolean | Promise<boolean>;

    abstract uploadFile(file: Upload): File | Promise<File>;

    abstract uploadFileLocal(file: Upload): File | Promise<File>;

    abstract createForm(input: CreateFormInput): Form | Promise<Form>;

    abstract acceptForm1st(_id: string): Form | Promise<Form>;

    abstract acceptForm2nd(_id: string): Form | Promise<Form>;

    abstract sendMessage(input: CreateMessageInput): Message | Promise<Message>;

    abstract createNode(input: CreateNodeInput): Node | Promise<Node>;

    abstract updateNode(_id: string, input: UpdateNodeInput): Node | Promise<Node>;

    abstract deleteNode(_id: string): boolean | Promise<boolean>;

    abstract pushNotification(customerIds: string[], label: string): Notification | Promise<Notification>;

    abstract oauthGooglePlus(accessToken: string): LoginResponse | Promise<LoginResponse>;

    abstract oauthFacebook(accessToken: string): LoginResponse | Promise<LoginResponse>;

    abstract oauthGoogle(accessToken: string): LoginResponse | Promise<LoginResponse>;

    abstract createPermission(input: PermissionInput): boolean | Promise<boolean>;

    abstract updatePermission(id: string, input: PermissionInput): boolean | Promise<boolean>;

    abstract deletePermission(id: string): boolean | Promise<boolean>;

    abstract createPosition(input: CreatePositionInput): Position | Promise<Position>;

    abstract createRole(input: CreateRoleInput): Role | Promise<Role>;

    abstract createRoom(input: CreateRoomInput): Room | Promise<Room>;

    abstract joinRoom(_id: string): boolean | Promise<boolean>;

    abstract leaveRoom(_id: string): boolean | Promise<boolean>;

    abstract createStore(input: CreateStoreInput): Store | Promise<Store>;

    abstract translate(text: string, code: string): string | Promise<string>;

    abstract createTree(input?: JSON): string | Promise<string>;

    abstract updateTree(input?: JSON, _id?: number): boolean | Promise<boolean>;

    abstract createCustomer(input: CreateCustomerInput): Customer | Promise<Customer>;

    abstract updateCustomer(_id: string, input: UpdateCustomerInput): boolean | Promise<boolean>;

    abstract updateAvatar(_id: string, file: Upload): boolean | Promise<boolean>;

    abstract deleteCustomer(_id: string): boolean | Promise<boolean>;

    abstract deleteCustomers(): boolean | Promise<boolean>;

    abstract verifyEmail(emailToken: string): boolean | Promise<boolean>;

    abstract login(input: LoginCustomerInput): LoginResponse | Promise<LoginResponse>;

    abstract refreshToken(refreshToken: string): RefreshTokenResponse | Promise<RefreshTokenResponse>;

    abstract lockAndUnlockCustomer(_id: string, reason: string): boolean | Promise<boolean>;

    abstract changePassword(_id: string, currentPassword: string, password: string): boolean | Promise<boolean>;

    abstract forgotPassword(email: string): boolean | Promise<boolean>;

    abstract resetPassword(resetPasswordToken: string, password: string): boolean | Promise<boolean>;

    abstract createSubscription(source: string, ccLast4: string): Customer | Promise<Customer>;

    abstract changeCreditCard(source: string, ccLast4: string): Customer | Promise<Customer>;

    abstract validateCustomer(text: string, input: CreateCustomerInput): boolean | Promise<boolean>;

    abstract createCustomerRole(input: CreateCustomerRoleInput): CustomerRole | Promise<CustomerRole>;
}

export class Node {
    _id: string;
    parentId?: number;
    name?: string;
    category?: NodeCategory;
    company?: Company;
    city?: City;
    store?: Store;
    department?: Department;
    position?: Position;
    createdAt: number;
    updatedAt: number;
}

export class Notification {
    _id: string;
    label: string;
    createdAt: number;
    updatedAt: number;
}

export class Permission {
    _id: string;
    code: string;
    description: string;
    isActive?: boolean;
    createdAt: number;
    updatedAt: number;
}

export class Position {
    _id: string;
    nodeId: string;
    name?: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
}

export class Project {
    _id?: number;
    name?: string;
    idProjectType?: string;
    description?: string;
    idTrello?: string;
    members?: string[];
    isActive?: boolean;
    createdAt?: number;
    createdBy?: string;
    updatedAt?: number;
    updatedBy?: string;
}

export class ProjectType {
    _id?: number;
    name?: string;
    description?: string;
    ratio?: number;
    idTrello?: string;
    isActive?: string;
    createdAt?: number;
    createdBy?: string;
    updatedAt?: number;
    updatedBy?: string;
}

export abstract class IQuery {
    abstract cities(): City[] | Promise<City[]>;

    abstract companies(): Company[] | Promise<Company[]>;

    abstract departments(): Department[] | Promise<Department[]>;

    abstract emails(): Email[] | Promise<Email[]>;

    abstract files(): File[] | Promise<File[]>;

    abstract forms(): Form[] | Promise<Form[]>;

    abstract messages(roomId: string): Message[] | Promise<Message[]>;

    abstract nodes(): Node[] | Promise<Node[]>;

    abstract nodesById(_id: string): Node[] | Promise<Node[]>;

    abstract notifications(): Notification[] | Promise<Notification[]>;

    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract positions(): Position[] | Promise<Position[]>;

    abstract roles(): Role[] | Promise<Role[]>;

    abstract rooms(): Room[] | Promise<Room[]>;

    abstract room(_id: string): Room | Promise<Room>;

    abstract stores(): Store[] | Promise<Store[]>;

    abstract tree(): Tree | Promise<Tree>;

    abstract hello(): string | Promise<string>;

    abstract me(): Customer | Promise<Customer>;

    abstract customers(offset?: number, limit?: number): Customer[] | Promise<Customer[]>;

    abstract customer(_id: string): Customer | Promise<Customer>;

    abstract search(conditions: SearchInput): Result[] | Promise<Result[]>;

    abstract searchCustomer(customerIds?: string[]): CustomerResult | Promise<CustomerResult>;

    abstract today(): Date | Promise<Date>;

    abstract customerRoles(): CustomerRole[] | Promise<CustomerRole[]>;
}

export class RefreshTokenResponse {
    accessToken: string;
}

export class Role {
    _id: string;
    code?: string;
    description?: string;
    nodeId: string;
    permissions: string[];
    createdAt: number;
    updatedAt: number;
}

export class Room {
    _id: string;
    title: string;
    customers: Customer[];
    messages?: Message[];
    createdAt: number;
    updatedAt: number;
}

export class Store {
    _id: string;
    name?: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
}

export abstract class ISubscription {
    abstract newMessages(roomId: string): Room | Promise<Room>;

    abstract newNotification(): Notification | Promise<Notification>;

    abstract newCustomer(): Customer | Promise<Customer>;
}

export class Task {
    _id?: number;
    name?: string;
    dueDate?: number;
    rulePenalty?: string;
    description?: string;
    idProject?: string;
    link?: Link;
    idTrello?: string;
    spentSum?: number;
    assignTo?: string;
    done?: boolean;
    isActive?: boolean;
    createdAt?: number;
    createdBy?: string;
    updatedAt?: number;
    updatedBy?: string;
}

export class TaskItem {
    _id?: number;
    comment?: string;
    idTask?: string;
    startAt?: number;
    endAt?: number;
    spent?: number;
}

export class Tree {
    _id?: number;
    treeData?: JSON;
}

export class Customer {
    _id: string;
    local?: Local;
    google?: Google;
    facebook?: Facebook;
    firstName: string;
    lastName: string;
    avatar?: string;
    gender: Gender;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    fullName?: string;
    isVerified: boolean;
    isActivated?: boolean;
    isOnline: boolean;
    isLocked: boolean;
    reason: string;
    isActive: boolean;
    stripeId?: string;
    type: CustomerType;
    ccLast4?: string;
    createdAt: number;
    updatedAt: number;
}

export class CustomerRole {
    _id: string;
    customerId: string;
    roleId: string;
    createdAt: number;
    updatedAt: number;
}

export class Customers {
    customers?: Customer[];
}

export type JSON = any;
export type JSONObject = any;
export type Upload = any;
export type Result = Customer | File;
export type CustomerResult = Customer | Customers;
