
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get() {
     return {
         body: [
            { name: 'Pietje' },
            { name: 'Victor' },
            { name: 'Dexter' },
            { name: 'Owkay' },
        ]
     }
}