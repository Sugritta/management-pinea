import { ref } from 'vue';
import { defineStore } from 'pinia'

export const menuStore = defineStore('menu', () => {
  
  

  const menu = ref([
    { name: 'Berry Cheesecake', img: '/Coffee_shop/berry ini cheesecakee.jpg', price: 75 },
    { name: 'Black Forest', img: '/Coffee_shop/black forest.jpg', price: 75 },
    { name: 'Lavender Cheesecake', img: '/Coffee_shop/lavender cheesecake.jpg', price: 75 },
    { name: 'Rose Sugar Cookie', img: '/Coffee_shop/rose sugar cookie.jpg', price: 55 },
    { name: 'Charmomile Tea', img: '/Coffee_shop/chaemomile tea.jpg', price: 60 },
    { name: 'Dalgona Matcha', img: '/Coffee_shop/dalgona matcha.jpg', price: 70 },
    { name: 'Rose Tea Latte', img: '/Coffee_shop/rose tea latte.jpg', price: 90 },
    { name: 'Coffee Latte', img: '/Coffee_shop/coffee latte.jpg', price: 90 },
    { name: 'Earl Grey Tea', img: '/Coffee_shop/earl grey.jpg', price: 110 },
    { name: 'Matcha Green Tea', img: '/Coffee_shop/matcha green tea.jpg', price: 80 },
    { name: 'Lemon Blueberry Trifle', img: '/Coffee_shop/Lemon bb trifle.jpg', price: 85 },
    { name: 'Lavender Fog Latte', img: '/Coffee_shop/Lavender fog latte.jpg', price: 85 },



  ]);
  
  
  return { menu}
})
export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cartList: [], 
    orderList:[],
  }),
  actions: {
    addToCart(item) {
      this.cartList.push(item);
    },
    addOrderList() {
      this.orderList.push(...this.cartList);
    
     this.cartList = [];
    },

  },
});
