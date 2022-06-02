import {html} from "lit"
import '../components/CottonBaby/hero-slider.mjs'
import '../components/CottonBaby/product-hero.mjs'

export default {
    title: 'App/Hero/Slider'
}

const Template = () => html`
    <hero-slider>
        <app-hero></app-hero>
        <product-hero
                title="Слип шапочка Капучино"
                description="Описание продукта с упоминанием его качеств и уникальных технологий производства"
                src="https://cloudflare-ipfs.com/ipfs/bafybeihgc47txsvnuzo2dl34t3aibkichnc7crsyq7sjlsijtxvslsrrdm/IMG_4895-2.jpg"
        ></product-hero>
    </hero-slider>`

export const Default = Template.bind({})
