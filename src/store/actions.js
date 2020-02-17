// import Vue from 'vue';
import axios from 'axios';

export const loadData = ({ commit }) => {
  axios
    .get('/data.json')
    .then(function(response) {
      const data = response.data;
      const allEntries = [];
      if (data) {
        for (let key in data) {
          const latestData = data[key];
          latestData.id = key;
          allEntries.push(latestData);
        }
      }
      const stocks = allEntries[allEntries.length - 1].data.stocks;
      const funds = allEntries[allEntries.length - 1].data.funds;
      const stockPortfolio = allEntries[allEntries.length - 1].data.stockPortfolio;

      const portfolio = {
        stockPortfolio,
        funds
      };
      commit('SET_STOCKS', stocks);
      commit('SET_PORTFOLIO', portfolio);
      // console.log(stocks);
      // console.log(funds);
      // console.log(stockPortfolio);
    })
    .catch(function(error) {
      console.log(error);
    });
};
