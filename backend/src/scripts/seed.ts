/**
 * Seed script for Paredes.tn
 *
 * Creates:
 * - Tunisia region with TND currency
 * - Flat rate shipping option
 * - System (manual) payment provider for cash on delivery
 *
 * Run with: npx medusa exec src/scripts/seed.ts
 */

import {
  ExecArgs,
} from "@medusajs/framework/types"

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve("logger") as any
  const storeModuleService = container.resolve("store") as any
  const stockLocationModule = container.resolve("stockLocation") as any
  const fulfillmentModule = container.resolve("fulfillment") as any
  const regionModule = container.resolve("region") as any
  const salesChannelModule = container.resolve("salesChannel") as any

  logger.info("Seeding Paredes.tn data...")

  // 1. Update store
  const [store] = await storeModuleService.listStores()
  if (store) {
    await storeModuleService.updateStores(store.id, {
      name: "Paredes Tunisie",
      supported_currencies: [
        { currency_code: "tnd", is_default: true },
      ],
    })
    logger.info("Store updated: Paredes Tunisie (TND)")
  }

  // 2. Create stock location
  let stockLocation
  const [existingLocation] = await stockLocationModule.listStockLocations({
    name: "Entrepot Tunisie",
  })

  if (existingLocation) {
    stockLocation = existingLocation
  } else {
    stockLocation = await stockLocationModule.createStockLocations({
      name: "Entrepot Tunisie",
      address: {
        country_code: "tn",
        city: "Tunis",
      },
    })
  }
  logger.info(`Stock location: ${stockLocation.id}`)

  // 3. Create fulfillment set and shipping option
  const fulfillmentSet = await fulfillmentModule.createFulfillmentSets({
    name: "Livraison Tunisie",
    type: "shipping",
    service_zones: [
      {
        name: "Tunisie",
        geo_zones: [
          {
            type: "country",
            country_code: "tn",
          },
        ],
      },
    ],
  })
  logger.info(`Fulfillment set created: ${fulfillmentSet.id}`)

  // 4. Create region
  const [existingRegion] = await regionModule.listRegions({
    name: "Tunisie",
  })

  let region
  if (existingRegion) {
    region = existingRegion
    logger.info(`Region already exists: ${region.id}`)
  } else {
    region = await regionModule.createRegions({
      name: "Tunisie",
      currency_code: "tnd",
      countries: ["tn"],
      payment_providers: ["pp_system_default"],
    })
    logger.info(`Region created: ${region.id}`)
  }

  // 5. Create sales channel
  const [existingChannel] = await salesChannelModule.listSalesChannels({
    name: "Boutique en ligne",
  })

  let salesChannel
  if (existingChannel) {
    salesChannel = existingChannel
  } else {
    salesChannel = await salesChannelModule.createSalesChannels({
      name: "Boutique en ligne",
      description: "Boutique paredes.tn",
      is_disabled: false,
    })
  }
  logger.info(`Sales channel: ${salesChannel.id}`)

  logger.info("Seed complete!")
  logger.info("Next: npx medusa user -e admin@paredes.tn -p yourpassword")
}
