import fs from 'fs/promises'
import yaml from 'js-yaml'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
    const products = yaml.load(await fs.readFile('data/products.yml', { encoding: 'utf-8' }))
    return {
        body: products
    }
}