import { Entity, ChildEntity,TableInheritance, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public user: string

    @Column(type => OrderedProduct)
    public products: OrderedProduct[]
}

export class OrderedProduct extends Order {
    @Column()
    public name: string
 
    @Column()
    public price: number

    @Column()
    public quantity: number
 }
