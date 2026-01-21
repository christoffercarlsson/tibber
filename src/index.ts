import getAddress, { Address } from './get-address'
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
import { Home, getHome, getHomes } from './get-homes'
import getMeteringPointData, {
  MeteringPointData
} from './get-metering-point-data'
import getOwner, { Owner } from './get-owner'
import getProduction, { ProductionNode } from './get-production'
import query from './query'
import sendPushNotification, { AppScreen } from './send-push-notification'
import { setToken } from './token'

export type {
  Address,
  AppScreen,
  ConsumptionNode,
  EnergyPrice,
  EnergyPriceList,
  EnergyResolution,
  Home,
  MeteringPointData,
  Owner,
  ProductionNode
}

export {
  getAddress,
  getConsumption,
  getCurrentEnergyPrice,
  getEnergyPrices,
  getEnergyPricesToday,
  getEnergyPricesTomorrow,
  getHome,
  getHomes,
  getMeteringPointData,
  getOwner,
  getProduction,
  query,
  sendPushNotification,
  setToken
}
