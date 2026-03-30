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
        btnVisible: 0
    },
    mounted: function() {
        this.getProduct();
        this.checkInCart(); 
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
        addToCart: function(id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join(','));
                this.btnVisible = 1; 
            }
        },
        checkInCart: function() {
            if (this.product && this.product.id && window.localStorage.getItem('cart')) {
                var cart = window.localStorage.getItem('cart').split(',');
                if (cart.indexOf(String(this.product.id)) != -1) {
                    this.btnVisible = 1;
                }
            }
        }
    }
});