import {html} from "lit"
import '../components/CottonBaby/product-card.mjs'

export default {
    title: 'App/Product/Card'
}

const Template = () => html`
    <product-card src="https://cottonbaby.ru/images/pictures/i5.jpg"></product-card>`

export const Default = Template.bind({})
