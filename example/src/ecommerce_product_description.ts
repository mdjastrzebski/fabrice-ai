import { visionTool } from '@fabrice-ai/tools/vision'
import { agent } from 'fabrice-ai/agent'
import { teamwork } from 'fabrice-ai/teamwork'
import { logger } from 'fabrice-ai/telemetry'
import { solution, workflow } from 'fabrice-ai/workflow'

const techExpert = agent({
  role: 'Technical expert',
  description: `
    You are skilled at extracting and describing most detailed
    technical information about the product from the photo.
  `,
  tools: {
    visionTool,
  },
})

const marketingManager = agent({
  role: 'Marketing content writer',
  description: `
    You are skilled at writing catchy product descriptions
    making customers to instantly fall in love with the product. 
    Use the technical information provided by the technical expert to create a compelling product description. 
  `,
})

const productDescriptionWorkflow = workflow({
  members: [techExpert, marketingManager],
  description: `
    Based on the picture './example/assets/example-sneakers.jpg' make the eCommerce product to 
    list this product on the website.

    Focus:
      - find all technical features of the product
      - color, size, material, brand if possible, etc.
      - write a compelling product description
      - why they should buy this product?
      - how it will make their life better?
      - emotions?
  `,
  output: `
    Catchy, yet detailed product description that will make customers to instantly fall in love with the product.
    Should contain all the product features + marketing description.
  `,
  snapshot: logger,
})

const result = await teamwork(productDescriptionWorkflow)

console.log(solution(result))
