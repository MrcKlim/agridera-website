var app = new Vue({
    el: '#app',
    data: {
        products: [
            {id: 1, title: 'White Cabbage', short_text: 'Fresh and crispy white cabbage', image: 'cab1.png', desc: 'Full description of white cabbage...'},
            {id: 2, title: 'Red Cabbage', short_text: 'Vibrant red cabbage, rich in vitamins', image: 'cab2.png', desc: 'Full description of red cabbage...'},
            {id: 3, title: 'Savoy Cabbage', short_text: 'Textured savoy cabbage leaves', image: 'cab3.png', desc: 'Full description of savoy cabbage...'},
            {id: 4, title: 'Napa Cabbage', short_text: 'Sweet Chinese cabbage', image: 'cab4.png', desc: 'Full description of napa cabbage...'},
            {id: 5, title: 'Brussels Sprouts', short_text: 'Nutritious miniature cabbages', image: 'cab5.png', desc: 'Full description of brussels sprouts...'}
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