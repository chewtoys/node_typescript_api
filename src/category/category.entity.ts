import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from './../product/product.entity'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    
    @OneToMany(type => Product, product => product.category)
    products?: Product[]
}