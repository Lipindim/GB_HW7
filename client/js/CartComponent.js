Vue.component('cart', {
    data(){
        return {
            cartUrl: `/api/cart`,
            showCart: false,
            cartItems: [],
            imgCart: `https://placehold.it/50x100`
        }
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find.quantity <= 1){
                this.$parent.delJson(`/api/cart/${find.id_product}`)
                    .then(data => {
                        if(data.result){
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            } else {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            find.quantity--;
                        }
                    })
            }
        },
        clear(){
            this.$parent.postJson(`/api/cart/clear`)
                .then(data => {
                    if(data.result){
                        this.cartItems = [];
                    }
                })
        }
    },
    computed: {
        totalCost(){
            return this.cartItems.reduce((accum, item) => accum += item.price * item.quantity, 0);
        }
    },
    mounted(){
        this.$parent.getJson(this.cartUrl)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el)
                }
            });
    },
    template: `<div class="cart">
                    <button class="btn-cart" type="button" @click='showCart = !showCart'>Корзина</button>
                    <div class="div-cart" v-show="showCart">
                    <p v-if="!cartItems.length" class="no-goods">Корзина пуста</p>
                    <div v-else="">
                        <cart-item 
                        v-for="item of cartItems" 
                        :key="item.id_product"
                        :cart-item="item"
                        :img="imgCart"
                        @remove="remove"></cart-item>
                        <span class="cart-total">Итого:{{totalCost}}</span>
                        <button class="btn-cart btn-clear" @click="clear()">Очистить</button>
                    </div>
            </div>
</div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    methods:{
        add(item){
            this.$parent.addProduct(item);
        }
    },
    template: `<div class="cart-item">
                        <div class="cart-item-title">{{cartItem.product_name}}</div>
                        <div class="cart-item-count">
                            <button class="btn-change-count" @click="$emit('remove', cartItem)">-</button>
                            <span class="cart-item-count-span">{{cartItem.quantity}}</span>
                            <button class="btn-change-count" @click="add(cartItem)">+</button>
                        </div>
                        <div class="cart-item-cost">{{cartItem.quantity * cartItem.price}}</div>
                    </div>`
        });