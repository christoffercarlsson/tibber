import getConsumption, {
  ConsumptionNode,
  EnergyResolution
} from './get-consumption'
import {
  EnergyPrice,
  EnergyPriceList,
  getCurrentEnergyPrice,
  getEnergyPrices,
  getEnergyPricesToday,
  getEnergyPricesTomorrow
} from './get-energy-prices'
import getProduction, { ProductionNode } from './get-production'
import query from './query'

export {
  ConsumptionNode,
  EnergyPrice,
  EnergyPriceList,
  EnergyResolution,
  ProductionNode,
  getConsumption,
  getCurrentEnergyPrice,
  getEnergyPrices,
  getEnergyPricesToday,
  getEnergyPricesTomorrow,
  getProduction
}

export default query
