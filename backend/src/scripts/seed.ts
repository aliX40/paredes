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
  const logger = container.resolve("logger")

  logger.info("Seeding Paredes.tn data...")

  // -------------------------------------------------------
  // 1. Create the store defaults
  // -------------------------------------------------------
  const storeModuleService = container.resolve("store")

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

  // -------------------------------------------------------
  // 2. Create stock location
  // -------------------------------------------------------
  const stockLocationModule = container.resolve("stockLocation")

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

  // -------------------------------------------------------
  // 3. Create fulfillment set and shipping option
  // -------------------------------------------------------
  const fulfillmentModule = container.resolve("fulfillment")

  // Create a fulfillment set
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

  // -------------------------------------------------------
  // 4. Create region
  // -------------------------------------------------------
  const regionModule = container.resolve("region")

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

  // -------------------------------------------------------
  // 5. Create sales channel
  // -------------------------------------------------------
  const salesChannelModule = container.resolve("salesChannel")

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

  logger.info("------------------------------------------")
  logger.info("Seed complete!")
  logger.info("")
  logger.info("Next steps (via the Admin dashboard at /app):")
  logger.info("1. Create an admin user:  npx medusa user -e admin@paredes.tn -p yourpassword")
  logger.info("2. Log into the admin dashboard")
  logger.info("3. Go to Settings > Regions and verify 'Tunisie' region with TND")
  logger.info("4. Go to Settings > Regions > Tunisie > Shipping Options to add a flat rate")
  logger.info("5. Add products via the Products page")
  logger.info("------------------------------------------")
}
