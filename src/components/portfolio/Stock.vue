<template>
  <div class="col-sm-6 col-md-6 mb-4">
    <div class="card">
      <h4 class="card-header">
        {{ stock.name }}
        <small>(Price: {{ stock.price }} | Quantity: {{stock.quantity}})</small>
      </h4>
      <div class="card-body">
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model="quantity"
            :class="{danger:insufficientQuantity}"
          />
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              @click="sellStock"
              :disabled="insufficientQuantity || +quantity <= 0 || !Number.isInteger(+quantity)"
            >{{insufficientQuantity ? 'Not enough stocks' : 'Sell'}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.danger {
  border: 1px solid red;
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions({
      placeSellOrder: 'sellStock'
    }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.placeSellOrder(order);
      this.quantity = 0;
    }
  }
};
</script>
