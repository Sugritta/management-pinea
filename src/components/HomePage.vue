<script setup>
import { menuStore } from "../stores/Counter";
import { useCartStore } from "../stores/Counter";
import { computed } from "vue";
import { ref } from "vue";

const Cart = ref(0);

const menu = menuStore();
const shop_food = menu.menu;

const cartStore = useCartStore();
const Store = cartStore.cartList;

// สร้างคำนวณราคาสินค้าทั้งหมด
const totalPrice = computed(() => {
 
  return cartStore.cartList.reduce((total, item) => total + item.price, 0);
});

function addCart(name, img, price) {
  Cart.value++;

  // ตรวจสอบว่าสินค้ามีอยู่ในตระกร้าแล้วหรือไม่
  const existingItem = cartStore.cartList.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.price += price;
  } else {
    // InCart.value.push({ name, img, price, quantity: 1 });
    cartStore.addToCart({ name, img, price, quantity: 1 });
  }
}
function removeFromCart(item) {
  Cart.value -= item.quantity; //ทำการ ลบตัวเลขสินค้าจากตระกร้า
  totalPrice.value -= item.price; //ทำการลบ ราคารวม กับ ราคาสินค้าที่กดลบไป

  const itemIndex = Store.findIndex((cartItem) => cartItem.name === item.name); //หาชื่อสินค้าที่มันซ้ำกัน
  if (itemIndex !== -1) {
    const removedItem = Store.splice(itemIndex, 1)[0]; //ใช้ splice เพื่อลบออกจากอาร์เรย์ Store
    cartStore.removeFromCart(removedItem);
  }
}
function addOrderListz() {
  cartStore.addOrderList();
  Cart.value = 0;
}

</script>

<template>
  
  <div>
    <!-- Navbar Bootstrap -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> BLUE DOOR CAFE</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <h7
        class="cart mx-2  text-uppercase"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Cart 🛒[{{ Cart }}]
      </h7>
      <h7
        class="cart mx-2"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Order
      </h7>
    </li>
  </ul>
  <form class="d-flex ml-auto" role="search">
    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
       </div>
      </div>
    </nav>
  </div>
  

  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-10">
    <div class="col" v-for="(item, index) in shop_food" :key="index">
      <div class="card mb-2" style="width: 18rem;">
        <img :src="item.img" class="card-img-top" alt="Menu Image" style="width: 287px; height: 200px;" />
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">Price {{ item.price }} ฿</p>
          </div>
          <button class="btn btn-success" @click="addCart(item.name, item.img, item.price)">Add to cart</button>

        </div>
      </div>
    </div>
  </div>


  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog w-50">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Products {{ Cart }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body w-75"
          v-for="(item, index) in cartStore.cartList"
          :key="index"
        >
          <div class="card mb-3" style="max-width: 540px">
            <div class="row-text g-0 m-2">
              <div class="col-md-4">
                <img
                  :src="item.img"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">Quantity {{ item.quantity }}</p>
                  <p class="card-text">
                    <small class="text-body-secondary">{{ item.price }}</small>
                  </p>
                </div>
              </div>
            </div>
            <button @click="removeFromCart(item)" class="btn btn-danger">Delete</button>

          </div>
        </div>

    
        <div class="row g-0 m-2">
          <div class="col-md-12">
            <div class="card-body">
              <h5 class="card-title">All Price</h5>
              <p class="card-text">{{ totalPrice }} ฿</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addOrderListz()"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Order List</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
  

      <div class="row">
        <div
          class="col-sm-6 mb-3 mb-sm-0"
          v-for="(chosenItem, index) in cartStore.orderList"
          :key="index"
        >
          <div class="card">
            <img :src="chosenItem.img" alt="" srcset="" />
            <div class="card-body">
              <h5 class="card-title">{{ chosenItem.name }}</h5>
              <p class="card-text">Price {{ chosenItem.price }}</p>
              <p class="card-text">Quantity {{ chosenItem.quantity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>



.cart {
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;
  text-decoration: underline;
}

.cart:hover {
  color: #261b1a;
  text-decoration: none;
}



.modal-content {
  max-height: 500px; 
  overflow-y: auto;
}
.cart {
  cursor: pointer;
}
.container {
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-weight: bold;
}
</style>
