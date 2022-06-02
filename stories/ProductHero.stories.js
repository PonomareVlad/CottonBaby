import {html} from "lit"
import '../components/CottonBaby/product-hero.mjs'

export default {
    title: 'App/Product/Hero'
}

const Template = () => html`
    <product-hero
            title="Слип шапочка Капучино"
            description="Описание продукта с упоминанием его качеств и уникальных технологий производства"
            src="https://cloudflare-ipfs.com/ipfs/bafybeihgc47txsvnuzo2dl34t3aibkichnc7crsyq7sjlsijtxvslsrrdm/IMG_4895-2.jpg"
    ></product-hero>`

export const Default = Template.bind({})
