
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get() {
    return {
        body: [
           { name: 'Bier', price: 125 },
           { name: 'Speciaal', price: 250 },
           { name: 'Cola', price: 120 },
           { name: 'Wodka', price: 180 },
       ]
    }
}