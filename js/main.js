if (document.getElementById('app')) {
    var app = new Vue({
        el: '#app',
        data: {
            products: [
                {id: 1, title: 'White Cabbage', short_text: 'Fresh and crispy white cabbage', image: 'cab1.png', desc: 'Full description of white cabbage...'},
                {id: 2, title: 'Green Cabbage', short_text: 'Classic green cabbage, rich in vitamins', image: 'cab2.png', desc: 'Full description of green cabbage...'},
                {id: 3, title: 'Cauliflower', short_text: 'Tender cauliflower with mild flavor', image: 'cab3.png', desc: 'Full description of cauliflower...'},
                {id: 4, title: 'Broccoli', short_text: 'Fresh green broccoli rich in nutrients', image: 'cab4.png', desc: 'Full description of broccoli...'},
                {id: 5, title: 'Napa Cabbage', short_text: 'Sweet Chinese cabbage with tender leaves', image: 'cab5.png', desc: 'Full description of napa cabbage...'}
            ],
            product: {},
            cart: [],
            btnVisible: 0,
            contactFields: {},
            orderData: null
        },
        mounted: function() {
            this.getProduct();
            this.checkInCart();
            this.getCart();
        },
        methods: {
            getProduct: function() {
                if (window.location.hash) {
                    var id = window.location.hash.replace('#', '');
                    for (var i in this.products) {
                        if (this.products[i].id == id) {
                            this.product = this.products[i];
                        }
                    }
                }
            },
            getCart: function() {
                this.cart = [];
                if (!window.localStorage.getItem('cart')) {
                    return;
                }

                var cartIds = window.localStorage.getItem('cart').split(',');
                for (var i = 0; i < cartIds.length; i++) {
                    for (var j = 0; j < this.products.length; j++) {
                        if (String(this.products[j].id) === cartIds[i]) {
                            this.cart.push(this.products[j]);
                            break;
                        }
                    }
                }
            },
            addToCart: function(id) {
                var cartIds = [];
                if (window.localStorage.getItem('cart')) {
                    cartIds = window.localStorage.getItem('cart').split(',');
                }
                if (cartIds.indexOf(String(id)) === -1) {
                    cartIds.push(String(id));
                    window.localStorage.setItem('cart', cartIds.join(','));
                    this.btnVisible = 1;
                    this.getCart();
                }
            },
            removeFromCart: function(id) {
                this.cart = this.cart.filter(function(item) {
                    return item.id !== id;
                });

                var cartIds = this.cart.map(function(item) {
                    return String(item.id);
                });

                if (cartIds.length) {
                    window.localStorage.setItem('cart', cartIds.join(','));
                } else {
                    window.localStorage.removeItem('cart');
                }

                if (this.product && this.product.id === id) {
                    this.btnVisible = 0;
                }
            },
            checkInCart: function() {
                if (this.product && this.product.id && window.localStorage.getItem('cart')) {
                    var cartIds = window.localStorage.getItem('cart').split(',');
                    if (cartIds.indexOf(String(this.product.id)) !== -1) {
                        this.btnVisible = 1;
                    }
                }
            },
            makeOrder: function() {
                this.orderData = {
                    name: this.contactFields.name || '',
                    company: this.contactFields.company || '',
                    position: this.contactFields.position || '',
                    city: this.contactFields.city || '',
                    country: this.contactFields.country || '',
                    telephone: this.contactFields.telephone || '',
                    email: this.contactFields.email || '',
                    role: this.contactFields.role || '',
                    other: this.contactFields.other || '',
                    interested: this.contactFields.interested || '',
                    code: this.contactFields.code || ''
                };

                this.cart = [];
                window.localStorage.removeItem('cart');
            }
        }
    });
}