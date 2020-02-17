<template>
  <div class="col-sm-6 col-md-6 mb-4">
    <div class="card">
      <h4 class="card-header">
        {{ stock.name }}
        <small>(Price: {{ stock.price }})</small>
      </h4>
      <div class="card-body">
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model="quantity"
            :class="{danger: insufficientFunds}"
          />
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              @click="buyStock"
              :disabled="insufficientFunds || +quantity <= 0 || !Number.isInteger(+quantity)"
            >{{insufficientFunds ? 'Insufficient Funds' : 'Buy'}}</button>
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
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: +this.quantity
      };
      this.$store.dispatch('buyStock', order);
      this.quantity = 0;
    }
  }
};
</script>
