import { defineStore } from 'pinia'

export const useCartsStore = defineStore("carts", () => {
    const cart = ref(null)
    const count = computed(() => cart.value ? cart.value.totalQuantity : 0)

    function updateCount(newCount) {
        cart.value.totalQuantity = newCount
    }

    async function createCart() {
        const response = await GqlCreateCart()
        if (response.userError) {
            console.log(response.userError)
        } else {
            cart.value = response.cartCreate.cart
        }
    }

    async function addToCart(productId, quantity) {
        const lines = {
            merchandiseId: productId,
            quantity: quantity,
        }
        
        if (cart.value == null) await createCart()

        const response = await GqlAddToCart({ cartID: cart.value.id, lines: lines })

        cart.value = response.cartLinesAdd.cart
    }

    function clearCart() {
        cart.value = null
    }

    async function getCart() {
        if (cart.value == null) await createCart()

        const response = await GqlGetCart({ cartId: cart.value.id })

        return response
    }

    function isInCart(id) {
        if (!cart.value) return false
        for (let node of cart.value.lines.nodes) {
            if (node.merchandise.id == id) return true
        }
        return false
    }

    return { cart, count, updateCount, createCart, addToCart, clearCart, getCart, isInCart }

},
{
    persist: true,
}
)