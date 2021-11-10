import fs from 'fs/promises'
import yaml from 'js-yaml'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
    const members = yaml.load(await fs.readFile('data/members.yml', { encoding: 'utf-8' }))
    return {
        body: members
    }
}
