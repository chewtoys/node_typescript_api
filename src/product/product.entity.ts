import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Category } from './../category/category.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string
    
    @Column()
    imageUrl: string

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    category: string

    @ManyToOne(type => Category, category => category.id)
    
    @JoinColumn()
    category?: Category
}