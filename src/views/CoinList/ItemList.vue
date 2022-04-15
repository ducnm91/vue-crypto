<template>
  <tr>
    <td>
      <router-link :to="`/coins/${id}`">
        <img :src="image" width="25" height="25" alt="" />
        {{ symbol }} - {{ name }}
      </router-link>
    </td>
    <td>
      {{
        numeral(current_price).format(`$0,0[.]${getZeroDecimal(current_price)}`)
      }}
    </td>
    <td>{{ numeral(ath).format(`$0,0[.]${getZeroDecimal(ath)}`) }}</td>
    <td>
      {{ numeral(ath_change_percentage).divide(100).format("0.00%") }}
    </td>
    <td>
      <span
        :class="
          price_change_percentage_1h_in_currency > 0
            ? 'text-success'
            : 'text-danger'
        "
        v-if="!!price_change_percentage_1h_in_currency"
      >
        {{
          numeral(price_change_percentage_1h_in_currency)
            .divide(100)
            .format("0.00%")
        }}
      </span>
    </td>
    <td>
      <span
        :class="
          price_change_percentage_24h_in_currency > 0
            ? 'text-success'
            : 'text-danger'
        "
        v-if="!!price_change_percentage_24h_in_currency"
      >
        {{
          numeral(price_change_percentage_24h_in_currency)
            .divide(100)
            .format("0.00%")
        }}
      </span>
    </td>
    <td>
      <span
        :class="
          price_change_percentage_7d_in_currency > 0
            ? 'text-success'
            : 'text-danger'
        "
        v-if="!!price_change_percentage_7d_in_currency"
      >
        {{
          numeral(price_change_percentage_7d_in_currency)
            .divide(100)
            .format("0.00%")
        }}
      </span>
    </td>
    <td>{{ numeral(total_volume).format("$0,0[.]00 a") }}</td>
    <td>
      {{ minedSupply ? numeral(minedSupply).format("0.00%") : "infinite" }}
    </td>
    <td>
      {{ isSupportLoan ? "Yes" : "No" }}
    </td>
    <td>{{ numeral(market_cap_rank).format("0o") }}</td>
  </tr>
</template>
<script lang="ts">
import numeral from "numeral";
import { getZeroDecimal } from "@/utils/formatNumber";
export default {
  props: [
    "image",
    "symbol",
    "name",
    "current_price",
    "ath",
    "ath_change_percentage",
    "price_change_percentage_1h_in_currency",
    "price_change_percentage_24h_in_currency",
    "price_change_percentage_7d_in_currency",
    "total_volume",
    "minedSupply",
    "market_cap_rank",
    "isSupportLoan"
  ],
  methods: {
    numeral(val: any) {
      return numeral(val)
    },
    getZeroDecimal(val: any) {
      return getZeroDecimal(val)
    }
  }
};
</script>
