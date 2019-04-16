import { Product } from "../../product/product.entity"
import { OrderedProduct } from "../../order/order.entity"

export function calculatePriceTotal(products: Array<{ id: number, name: string, quantity: number }> ) {
  const reducer = (accumulator: number, product: OrderedProduct): number => { 
    return accumulator + product.price * product.quantity
  }
  return products.reduce(reducer, 0)
}